<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\TestsRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Exports\ExportTests;
use App\Imports\ImportTests;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Storage;


use App\Models\Tests;
use App\Models\QuestionsAdmin;
use App\Models\QuestionUser;
use App\Models\QuestionTypes;
use App\Models\Topics;
use App\Models\Levels;
use App\Models\Tags;

class TestsController extends Controller
{
    public function importTests(Request $re)
    {
        if($re->hasFile('importTests_file')){
            $testsFile = $re->file('importTests_file');
            $testsExtension = strtolower($testsFile->getClientOriginalExtension());
            if ($testsExtension == 'xlsx') {
                try {
                    Excel::import(new ImportTests, $testsFile);
                    return redirect()->back()->with(['success' => true, 'alert' => "Import successful"]);
                } catch (\Exception $e) {
                    if (isset($e->errorInfo) && $e->errorInfo[1] == 1062) { // Error code for duplicate entry in MySQL
                        return redirect()->back()->with(['success' => false, 'alert' => "Import failed! File contains duplicate entries which violates constraints."]);
                    } else{
                        return redirect()->back()->with(['success' => false, 'alert' => "Import failed! Please check if your files are correct.".$e->getMessage()]);
                    }
                }
            } else {
                return redirect()->back()->with(['success' => false, 'alert' => "Invalid file format. Please upload .xlsx files."]);
            }
        }
        return redirect()->back()->with(['success' => false, 'alert' => "Missing files!"]);
    }
    public function exportTests() 
    {
        return Excel::download(new ExportTests, 'tests.xlsx');
    }
    public function index(Request $request){
        $topic_data = $request->input('topic_data',[]);
        $tag_data = $request->input('tag_data',[]);
        $searchInput = $request->input('searchInput');
        $active = $request->input('active');
        $show = $request->input('show', 10);
        $show_allowed_values = [10, 20, 50, 100];
        if (!in_array($show, $show_allowed_values)) {
            $show = 10;
        }
        if (!empty($topic_data) || !empty($tag_data) || $searchInput || $active ) {
            return $this->search($request);
        }
        $listTests = Tests::withTrashed()->paginate($show);
        $listTags = Tags::all();
        $listTopics = Topics::all();
        return view('/test/index',compact('listTests','listTags','listTopics', 'topic_data', 'tag_data'));
    }
    public function search(Request $request)
    {
        $topic_data = $request->input('topic_data',[]);
        $tag_data = $request->input('tag_data',[]);
        $searchInput = $request->input('searchInput');
        $active = $request->input('active');
        $show = $request->input('show', 10);
        $show_allowed_values = [10, 20, 50, 100];
        if (!in_array($show, $show_allowed_values)) {
            $show = 10;
        }
        $listTags = Tags::all();
        $listTopics = Topics::all();
        $listTests = Tests::withTrashed()
        ->where(function ($query) use ($searchInput) {
            $query->where('name', 'like', "%$searchInput%")
                ->orWhereHas('user', function ($userQuery) use ($searchInput) {
                    $userQuery->where('displayname', 'like', "%$searchInput%");
                });
        })
        ->when(!empty($topic_data), function ($query) use ($topic_data) {
            foreach ($topic_data as $id) {
                $query->whereJsonContains('topic_data', $id);
            }
            return $query;
        })
        ->when(!empty($tag_data), function ($query) use ($tag_data) {
            foreach ($tag_data as $id) {
                $query->whereJsonContains('tag_data', $id);
            }
            return $query;
        })
        ->when($active !== null, function ($query) use ($active) {
            if ($active) {
                $query->whereNull('deleted_at');
            } else {
                $query->whereNotNull('deleted_at');
            }
        })
        ->paginate($show);
        return view('/test/index', compact('listTests','listTags','listTopics', 'topic_data', 'tag_data'));
    }
    public function edit(Request $request,$id){
        if(!$request->tag_data)
            return redirect()->route('test.index')->withError("Tags can't be empty");
        if(!$request->name)
            return redirect()->route('test.index')->withError("Name can't be empty");
        $test = Tests::withTrashed()->find($id);
        if ($request->hasFile('test_img')) {
            if (!empty($test->test_img) && Storage::exists($test->test_img)) {
                Storage::delete($test->test_img);
            }
            $file = $request->file('test_img');
            $fileName = now()->format('YmdHis')  . '_' . $file->getClientOriginalName();
            $path = $request->file('test_img')->storeAs('img/exams', $fileName);
            $test->test_img = $path;
        }
        $test->tag_data = json_encode(array_unique($request->tag_data));
        $test->name = $request->name;
        $test->save();
        return redirect()->route('test.index')->with(['success' => true, 'alert' => 'Successfully edited']);
    }
    public function getTags($id){
        $test = Tests::withTrashed()->find($id);
        $tag_data = $test->tag_data;
        $name = $test->name;
        $test_img = $test->test_img;
        return response()->json(['tag_data' => $tag_data,'name' => $name,'test_img' => $test_img]);
    }
    public function detail($id){
    $test = Tests::withTrashed()->find($id);

    $question_admin_ids = json_decode($test->question_admin) ?: [];
    $listQuestionsAdmin = QuestionsAdmin::whereIn('id', $question_admin_ids)
                                        ->orderBy('topic_id')
                                        ->orderBy('level_id')
                                        ->get();

    $question_user_ids = json_decode($test->question_user) ?: [];
    $listQuestionsUser = QuestionUser::whereIn('id', $question_user_ids)
                                      ->orderBy('topic_id')
                                      ->orderBy('level_id')
                                      ->get();
    $listQuestions = $listQuestionsAdmin->merge($listQuestionsUser);
        return view('/test/details',compact('listQuestions'));
    }
    public function create(){
        $listLevels = Levels::all();
        $listTopics = Topics::all();
        $listTags = Tags::all();
        $listTypes = QuestionTypes::all();
        return view('/test/create', compact('listTopics','listLevels','listTypes','listTags'));
    }
    public function getQuestion(Request $request)
    {
        $topic_ids = $request->input('topic_id', []);
        $level_ids = $request->input('level_id', []);
        $amount_questions = $request->input('amount_question', []);
        $selected_questions = $request->input('selected_questions', []);
        foreach ($amount_questions as $amount) {
            if ($amount == 0) {
                return back()->with(['success' => false, 'alert' => 'Amount of questions cannot be zero.']);
            }
        }
        $listQuestions = collect();
        $message = '';
        if(!empty($topic_ids) && !empty($level_ids)){
            foreach ($topic_ids as $index => $topic_id) {
                $level_id = $level_ids[$index];
                $amount_question = $amount_questions[$index];
                $newQuestions = QuestionsAdmin::when($topic_id != 0, function ($query) use ($topic_id) {
                    return $query->where('topic_id', $topic_id)->orderBy('level_id');
                })
                ->when($level_id != 0, function ($query) use ($level_id) {
                    return $query->where('level_id', $level_id)->orderBy('topic_id');
                })
                ->when($topic_id == 0 && $level_id == 0, function ($query) {
                    return $query;
                })
                ->when(!empty($selected_questions), function ($query) use ($selected_questions) {
                    return $query->whereNotIn('id', $selected_questions);
                })
                ->inRandomOrder()
                ->take($amount_question)
                ->get();
                $listQuestions = $listQuestions->concat($newQuestions);
            }
            if ($listQuestions->count() < array_sum($amount_questions)) {
                if($listQuestions->count() == 0)
                    $message = 'No more questions available to be added. ';
                else
                $message = 'Not enough questions available. Added ' . $listQuestions->count() . ' new questions. ';
            }else{
                $message = 'Added ' . $listQuestions->count() . ' new questions. ';
            }
            if(!empty($selected_questions)){
            $selectedQuestions = QuestionsAdmin::whereIn('id', $selected_questions)->get();
            $listQuestions = $listQuestions->concat($selectedQuestions);
            }
        }else{
            // dd($selected_questions);
            $listQuestions = QuestionsAdmin::whereIn('id', $selected_questions)->get();
        }
        $listQuestions = $listQuestions->unique('id')->sortBy(function ($item) {
            return [ $item->topic_id, $item->level_id];
        });
        $message = $message . ' Currently has ' . $listQuestions->count() . ' questions.';
        return view('/test/create_results', compact('listQuestions'))->with('message', $message);
    }
    public function createHandle(TestsRequest $request){
        $test = new Tests();
        $test->name = $request->name;
        if ($request->hasFile('test_img')) {
            $file = $request->file('test_img');
            $fileName = now()->format('YmdHis')  . '_' . $file->getClientOriginalName();
            $path = $request->file('test_img')->storeAs('img/exams', $fileName);
            $test->test_img = $path;
        }
        $test->question_admin = json_encode(array_unique($request->question_admin));
        $topic_data = QuestionsAdmin::whereIn('id', $request->question_admin)
        ->distinct('topic_id')
        ->pluck('topic_id')
        ->toArray();
        $topic_data = array_map('strval', $topic_data);
        $test->topic_data = json_encode(array_unique($topic_data));
        $test->tag_data = json_encode(array_unique($request->tag_data));
        $test->done_count = 0;
        $test->privacy = 0;
        $test->user_id = Auth::id();
        $test->save();
        return redirect()->route('test.index')->with(['success' => true, 'alert' => 'Successfully created']);
    }
    public function deleteHandle($id){
        $test = Tests::withTrashed()->find($id);
        if (!$test) {
            return redirect()->route('test.index')->with('error','test not found');
        }
        if($test->trashed()){
            //Check and unset soft deleted tags
            $tagDataArray = [];
            $tagDataArray = json_decode($test->tag_data);
            foreach ($tagDataArray as $key => $tagId) {
                $tag = Tags::withTrashed()->find($tagId);
                if ($tag && $tag->trashed()) {
                    unset($tagDataArray[$key]);
                }
            }
            $topicDataArray = [];
            $questionDataArray = json_decode($test->question_admin);
            foreach ($questionDataArray as $key => $questionId) {
                $question = QuestionsAdmin::withTrashed()->find($questionId);
                if(!$question){
                    return redirect()->route('test.index')->with(['success' => false, 'alert' => 'Error finding questions!']);
                }
                if ($question->trashed()) {
                    return redirect()->route('test.index')->with(['success' => false, 'alert' => 'Question in test has been deleted. Please create another test instead!']);
                }
            }
            $test->tag_data = json_encode(array_values(array_unique($tagDataArray)));
            $test->restore();
            return redirect()->route('test.index')->with(['success' => true, 'alert' => 'Successfully restored']);
        }
        else{
            $test->delete();
            return redirect()->route('test.index')->with(['success' => true, 'alert' =>'Successfully deleted']);
        }
    }
}
