<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Web\QuestionsAdminController;
use App\Http\Controllers\Web\TopicsController;
use App\Http\Controllers\Web\TagsController;
use App\Http\Controllers\Web\UsersController;
use App\Http\Controllers\Web\AdminsController;
use App\Http\Controllers\Web\TestsController;
use App\Http\Controllers\Web\StatisticsController;
use App\Models\QuestionsAdmin;

// Route::get('/', function () {
//     return view('login');
// });
Route::get('/question', function () {
    return view('question.index');
});
/* Route::prefix('/question')->name('question.')->group(function(){
    Route::get('/',[QuestionsController::class,'index'])->name('index');
}); */
Route::middleware('guest')->group(function () {

    Route::get('/login', [UsersController::class, 'login'])->name('login');
    Route::post('/login', [UsersController::class, 'loginHandle'])->name('loginHandle');
});

Route::middleware('auth')->group(function () {

    //Statistics
    Route::post('/getMonthlyQuestions/{year}/{month}', [StatisticsController::class, 'getMonthlyQuestions'])->name('getMonthlyQuestions');
    Route::get('/getYears', [StatisticsController::class, 'getYears'])->name('getYears');
    Route::post('/getMonthlyUsers/{year}/{month}', [StatisticsController::class, 'getMonthlyUsers'])->name('getMonthlyUsers');
    Route::get('/mostEngagedTests', [StatisticsController::class, 'mostEngagedTests'])->name('mostEngagedTests');
    Route::get('/mostQuestionsAdded', [StatisticsController::class, 'mostQuestionsAdded'])->name('mostQuestionsAdded');

    Route::get('/logout', [UsersController::class, 'logout'])->name('logout');
    Route::get('/', [UsersController::class, 'dashboard'])->name('dashboard.index');
    Route::get('/userDetail', [UsersController::class, 'userDetail'])->name('userDetail');
    Route::post('/editProfile/{id}', [UsersController::class, 'editProfile'])->name('editProfile');

    Route::prefix('/question')->name('question.')->group(function(){
        Route::get('/',[QuestionsAdminController::class,'index'])->name('index');
        Route::post('findDupeQuestions/{id?}',[QuestionsAdminController::class,'findDupeQuestions'])->name('findDupeQuestions');
        Route::get('exportAnswers',[QuestionsAdminController::class,'exportAnswers'])->name('exportAnswers');
        Route::get('exportQuestions',[QuestionsAdminController::class,'exportQuestions'])->name('exportQuestions');
        Route::post('importQuestions',[QuestionsAdminController::class,'importQuestions'])->name('importQuestions');
        Route::post('/create',[QuestionsAdminController::class,'create'])->name('create');
        Route::get('edit/{id}',[QuestionsAdminController::class,'edit'])->name('edit');
        Route::post('edit/{id}',[QuestionsAdminController::class,'editHandle'])->name('editHandle');
        Route::post('delete/{id}',[QuestionsAdminController::class,'deleteHandle'])->name('delete');

    });
    Route::prefix('/topic')->name('topic.')->group(function(){
        Route::get('/',[TopicsController::class,'index'])->name('index');
        Route::get('exportTopics',[TopicsController::class,'exportTopics'])->name('exportTopics');
        Route::post('importTopics',[TopicsController::class,'importTopics'])->name('importTopics');
        Route::get('/search', [TopicsController::class, 'search'])->name('search');
        Route::post('/create',[TopicsController::class,'createHandle'])->name('create');
        Route::post('/edit/{id}',[TopicsController::class,'editHandle'])->name('edit');
        Route::get('/delete/{id}',[TopicsController::class,'deleteHandle'])->name('delete');
    });
    Route::prefix('/tag')->name('tag.')->group(function(){
        Route::get('/',[TagsController::class,'index'])->name('index');
        Route::get('exportTags',[TagsController::class,'exportTags'])->name('exportTags');
        Route::post('importTags',[TagsController::class,'importTags'])->name('importTags');
        Route::get('/search', [TagsController::class, 'search'])->name('search');
        Route::post('/create',[TagsController::class,'createHandle'])->name('create');
        Route::post('/edit/{id}',[TagsController::class,'editHandle'])->name('edit');
        Route::get('/delete/{id}',[TagsController::class,'deleteHandle'])->name('delete');
    });
    
    Route::prefix('/test')->name('test.')->group(function(){
        Route::get('/',[TestsController::class,'index'])->name('index');
        Route::get('/create',[TestsController::class,'create'])->name('create');
        Route::get('exportTests',[TestsController::class,'exportTests'])->name('exportTests');
        Route::post('importTests',[TestsController::class,'importTests'])->name('importTests');
        Route::get('/search', [TestsController::class, 'search'])->name('search');
        Route::post('/getQuestion',[TestsController::class,'getQuestion'])->name('getQuestion');
        Route::post('/create',[TestsController::class,'createHandle'])->name('createHandle');
        Route::get('/getTags/{id}',[TestsController::class,'getTags'])->name('getTags');
        Route::get('/detail/{id}',[TestsController::class,'detail'])->name('detail');
        Route::post('/edit/{id}',[TestsController::class,'edit'])->name('edit');
        Route::get('/delete/{id}',[TestsController::class,'deleteHandle'])->name('delete');
    });
    Route::prefix('/admin')->name('admin.')->group(function () {
        Route::get('/', [AdminsController::class, 'index'])->name('index');
        Route::get('exportAdmins',[AdminsController::class,'exportAdmins'])->name('exportAdmins');
        Route::post('importAdmins',[AdminsController::class,'importAdmins'])->name('importAdmins');
        // Route::get('/search', [AdminsController::class, 'search'])->name('search');
        Route::post('/create', [AdminsController::class, 'createHandle'])->name('createHandle');
        Route::get('/getUser/{id}', [AdminsController::class, 'getUser'])->name('getUser');
        Route::post('/edit/{id}', [AdminsController::class, 'editHandle'])->name('editHandle');
        Route::get('/delete/{id}', [AdminsController::class, 'delete'])->name('delete');
    });
    Route::prefix('/user')->name('user.')->group(function () {
        Route::get('/', [UsersController::class, 'index'])->name('index');
        Route::get('exportUsers',[UsersController::class,'exportUsers'])->name('exportUsers');
        Route::post('importUsers',[UsersController::class,'importUsers'])->name('importUsers');
        Route::get('/search', [UsersController::class, 'search'])->name('search');
        Route::post('/create', [UsersController::class, 'createHandle'])->name('createHandle');
        Route::get('/getUser/{id}', [UsersController::class, 'getUser'])->name('getUser');
        Route::post('/edit/{id}', [UsersController::class, 'editHandle'])->name('editHandle');
        Route::get('/delete/{id}', [UsersController::class, 'delete'])->name('delete');
    });
});
