<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\TopicsRequest;
use Illuminate\Http\Request;
use App\Exports\ExportTopics;
use App\Imports\ImportTopics;
use Maatwebsite\Excel\Facades\Excel;

use App\Models\Topics;
use App\Models\QuestionsAdmin;

class TopicsController extends Controller
{
    public function importTopics(Request $re)
    {
        if($re->hasFile('importTopics_file')){
            $topicsFile = $re->file('importTopics_file');
            $topicsExtension = strtolower($topicsFile->getClientOriginalExtension());
            if ($topicsExtension == 'xlsx') {
                try {
                    Excel::import(new ImportTopics, $topicsFile);
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
    public function exportTopics() 
    {
        return Excel::download(new ExportTopics, 'topics.xlsx');
    }
    public function index(Request $request){
        $searchInput = $request->input('searchInput');
        $active = $request->input('active');
        $show = $request->input('show', 10);
        $show_allowed_values = [10, 20, 50, 100];
        if (!in_array($show, $show_allowed_values)) {
            $show = 10;
        }
        if ($searchInput != null || $active != null) {
            return $this->search($request);
        }
        $listTopics = Topics::withTrashed()->paginate($show);
        return view('/topic/index',compact('listTopics'));
    }
    public function search(Request $request)
    {
        $searchInput = $request->input('searchInput');
        $active = $request->input('active');
        $show = $request->input('show', 10);
        $show = $request->input('show', 10);
        $show_allowed_values = [10, 20, 50, 100];
        if (!in_array($show, $show_allowed_values)) {
            $show = 10;
        }
        $listTopics = Topics::withTrashed()->where('name', 'like', "%$searchInput%")
        ->when($active !== null, function ($query) use ($active) {
            if ($active) {
                $query->whereNull('deleted_at');
            } else {
                $query->whereNotNull('deleted_at');
            }
        })
        ->paginate($show);
        return view('topic/index', compact('listTopics'));
    }
    public function createHandle(TopicsRequest $request){
        $topic = new Topics();
        $topic->name = $request->name;
        $topic->save();
        return back()->with(['success' => true, 'alert' => 'Successfully created']);
    }
    public function editHandle(TopicsRequest $request, $id){
        $topic = Topics::find($id);
        $topic->name = $request->name;
        $topic->save();
        return back()->with(['success' => true, 'alert' => 'Successfully edited']);
    }
    public function deleteHandle($id){
        $topic = Topics::withTrashed()->find($id);
        if (!$topic) {
            return back()->with(['success' => false, 'alert' => 'Topic not found']);
        }
        if($topic->trashed()){
            $topic->restore();
            return back()->with(['success' => true, 'alert' => 'Successfully restored']);
        }
        else{
            if(QuestionsAdmin::isTopicUsedInQuestionAdmins($id)){
                return back()->with(['success' => false, 'alert' => 'Topic is already in use!']);
            }
            $topic->delete();
            return back()->with(['success' => false, 'alert' => 'Successfully deleted']);
        }
    }
}
