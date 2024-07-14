<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\TagsRequest;
use Illuminate\Http\Request;
use App\Exports\ExportTags;
use App\Imports\ImportTags;
use Maatwebsite\Excel\Facades\Excel;

use App\Models\Tags;
use App\Models\Tests;

class TagsController extends Controller
{
    public function importTags(Request $re)
    {
        if($re->hasFile('importTags_file')){
            $tagsFile = $re->file('importTags_file');
            $tagsExtension = strtolower($tagsFile->getClientOriginalExtension());
            if ($tagsExtension == 'xlsx') {
                try {
                    Excel::import(new ImportTags, $tagsFile);
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
    public function exportTags() 
    {
        return Excel::download(new ExportTags, 'tags.xlsx');
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
        $listTags = Tags::withTrashed()->paginate($show);
        return view('/tag/index',compact('listTags'));
    }
    public function search(Request $request)
    {
        $searchInput = $request->input('searchInput');
        $active = $request->input('active');
        $show = $request->input('show', 10);
        $show_allowed_values = [10, 20, 50, 100];
        if (!in_array($show, $show_allowed_values)) {
            $show = 10;
        }
        $listTags = Tags::withTrashed()->where('name', 'like', "%$searchInput%")
        ->when($active !== null, function ($query) use ($active) {
            if ($active) {
                $query->whereNull('deleted_at');
            } else {
                $query->whereNotNull('deleted_at');
            }
        })
        ->paginate($show);
        return view('tag/index', compact('listTags'));
    }
    public function createHandle(TagsRequest $request){
        $tag = new Tags();
        $tag->name = $request->name;
        $tag->save();
        return back()->with(['success' => true, 'alert' => 'Successfully created']);
    }
    public function editHandle(TagsRequest $request, $id){
        $tag = Tags::find($id);
        $tag->name = $request->name;
        $tag->save();
        return back()->with(['success' => true, 'alert' => 'Successfully edited']);
    }
    public function deleteHandle($id){
        $tag = Tags::withTrashed()->find($id);
        if (!$tag) {
            return back()->with(['success' => false, 'alert' => 'Tag not found']);
        }
        if($tag->trashed()){
            $tag->restore();
            return back()->with(['success' => true, 'alert' => 'Successfully restored']);
        }
        else{
            if(Tests::isTagUsedInTests($id)){
                return back()->with(['success' => false, 'alert' => 'Tag is already in use!']);
            }
            $tag->delete();
            return back()->with(['success' => true, 'alert' => 'Successfully deleted']);
        }
    }
}
