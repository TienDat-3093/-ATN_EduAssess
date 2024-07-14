<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\UsersRequest;
use App\Models\Users;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use App\Exports\ExportUsers;
use App\Imports\ImportUsers;
use Maatwebsite\Excel\Facades\Excel;

class UsersController extends Controller
{
    public function importUsers(Request $re)
    {
        if($re->hasFile('importUsers_file')){
            $usersFile = $re->file('importUsers_file');
            $usersExtension = strtolower($usersFile->getClientOriginalExtension());
            if ($usersExtension == 'xlsx') {
                try {
                    Excel::import(new ImportUsers, $usersFile);
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
    public function exportUsers() 
    {
        return Excel::download(new ExportUsers, 'users.xlsx');
    }
    //Authentication
    public function dashboard()
    {
        return view('dashboard');
    }
    public function userDetail(){
        return view('user_detail');
    }
    public function login()
    {
        return view('login');
    }
    public function loginHandle(Request $request)
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password, 'status' => 1 ])){
            $user = Auth::user();
            if($user->admin_role == 0){
                Auth::logout();
                return redirect()->route('login')->with(['success' => false, 'alert' => 'No admin permission!']);
            }
            if ($user) {
                    return redirect()->route('dashboard.index');
                }
            }
        return redirect()->route('login')->with(['success' => false, 'alert' => 'Access denied!']);
    }
    public function logout()
    {
        Auth::logout();
        return redirect()->route('login');
    }
    public function editProfile(Request $request, $id)
    {
        if(Auth::user()->id != $id)
            return back()->with(['success' => false, 'alert' => 'Incorrect user id!']);
        $user = Users::find($id);
        if($request->filled(['password', 'password_confirmation', 'old_password'])){
            if (!Hash::check($request->old_password, $user->password)) {
                return back()->with(['success' => false, 'alert' => 'Incorrect password!']);
            }
            if ($request->password != $request->password_confirmation) {
                return back()->with(['success' => false, 'alert' => 'Password confirmation failed!']);
            }
            $user->password = Hash::make($request->password);
        }
        $user->displayname = $request->displayname;
        $user->email = $request->email;
        $user->date_of_birth = $request->date_of_birth;
        if ($request->hasFile("image")) {
            if($user->image){
            $img = $user->image;
                if (Storage::exists($img)) {
                    Storage::delete($img);
                }
            }
            $file = $request->file("image");
            $fileName = now()->format('YmdHis')  . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('img/users', $fileName);
            $user->image = $path;
        }
        $user->save();
        return back()->with(['success' => true, 'alert' => 'Successfully edited!']);
    }
    // public function getLoginUser()
    // {
    //     if (Auth::check()) {
    //         $displayname = Auth::user()->displayname;
    //         return $displayname;
    //     }
    // }

    //Manage User
    public function index(Request $request)
    {
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
        $listUsers = Users::where('admin_role', 0)->paginate($show);
        return view('user/index', compact('listUsers'));
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
        $listUsers = Users::where(function ($query) use ($searchInput) {
            $query->where('displayname', 'like', "%$searchInput%")
                  ->orWhere('email', 'like', "%$searchInput%");
        })
        ->where('admin_role', 0)
        ->when($active != null, function ($query) use ($active) {
            $query->where('status', $active);
        })
        ->paginate($show);
        return view('user/index', compact('listUsers'));
    }
    public function createHandle(UsersRequest $request)
    {
        $user = new Users();
        $user->displayname = $request->displayname;
        $user->email = $request->email;
        $user->date_of_birth = $request->date_of_birth;
        $user->password = Hash::make($request->password);
        if ($request->hasFile("image")) {
            $file = $request->file("image");
            $fileName = now()->format('YmdHis')  . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('img/users', $fileName);
            $user->image = $path;
        }
        $user->save();
        return back()->with(['success' => true, 'alert' => 'Successfully created!']);
    }
    public function getUser($id){
        $user = Users::where('admin_role', 0)->find($id);
        return $user;
    }
    public function editHandle(Request $request, $id)
    {
        $user = Users::where('admin_role', 0)->find($id);
        $user->displayname = $request->displayname;
        $user->date_of_birth = $request->date_of_birth;
        if ($request->hasFile("image")) {
            if($user->image){
            $img = $user->image;
                if (Storage::exists($img)) {
                    Storage::delete($img);
                }
            }
            $file = $request->file("image");
            $fileName = now()->format('YmdHis')  . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('img/users', $fileName);
            $user->image = $path;
        }
        $user->save();
        return back()->with(['success' => true, 'alert' => 'Successfully edited!']);
    }
    public function delete($id)
    {
        $user = Users::where('admin_role', 0)->find($id);
        if (!$user) {
            return back()->with(['success' => false, 'alert' => 'User not found']);
        }
        if($user->status == 0){
            $user->status = 1;
            $user->save();
            return back()->with(['success' => true, 'alert' => 'Successfully unlocked']);
        }
        else{
            $user->status = 0;
            $user->save();
            return back()->with(['success' => true, 'alert' => 'Successfully locked']);
        }
    }
}
