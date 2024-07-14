 <!-- Modal Create Question -->
 <div class="modal fade" id="createQuestion" tabindex="-1" style="display: none;" aria-hidden="true">
     <div class="modal-dialog modal-lg" role="document">
         <div class="modal-content">
             <div class="modal-header">
                 <h5 class="modal-title" id="create_modalQuestion">Add Question</h5>
                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
             </div>
             <form id="create_questionForm" action="{{route('question.create')}}" onsubmit="return validateForm('create_')" method="post" enctype="multipart/form-data">
                 @csrf
                 <div class="modal-body">
                     <div class="row">
                         <div class="col mb-3">
                             <label for="create_questionText" class="form-label">Name</label>
                             <font id="create_errorName" style="vertical-align: inherit;">
                             </font>
                                <textarea id="create_editor" name="create_questionText"></textarea><br>
                                <div id="create_name_duplicate_error" class="alert alert-danger alert-dismissible d-none">
                                    <h4 class="alert-heading">Possible duplicates!</h4>
                                    <button type="button" class="create-btn-close btn-close" onclick=hideAlert(this) aria-label="Close"></button>
                                </div>
                                 <label class="form-label">Question Image</label><br>
                                 <label class="btn btn-outline-secondary mb-0" for="create_inputQuestion">
                                     <span class="ti ti-upload"></span>
                                 </label>
                                 <input type="file" name="create_questionImg" class="form-control d-none" id="create_inputQuestion" onchange="previewQuestion('create_')">
                             
                             <div id="create_fileQuestion" name="create_fileQuestion" class="mt-2"></div>
                         </div>


                         <div class="mb-3">
                             <label for="create_levelSelect" class="form-label">Level</label>
                             <select id="create_levelSelect" name="create_level" class="form-select">
                                 @if(!empty($listLevels))
                                 @foreach($listLevels as $level )
                                 <option value="{{$level->id}}">{{$level->name}}</option>

                                 @endforeach
                                 @else
                                 <option value="">No choose</option>
                                 @endif
                             </select>
                         </div>
                         <div class="mb-3 mt-1">
                             <label for="create_topicSelect" class="form-label">Topic</label>
                             <select id="create_topicSelect" name="create_topic" class="form-select">
                                 @if(!empty($listTopics))
                                 @foreach($listTopics as $topic)
                                 <option value="{{$topic->id}}">{{$topic->name}}</option>

                                 @endforeach
                                 @else
                                 <option value="">No choose</option>
                                 @endif
                             </select>
                         </div>
                         <div class="col-md mb-2">
                             <label for="create_typeRadio" class="form-label d-block">Question Type</label>
                             @if(!empty($listTypes))
                             @foreach($listTypes as $type)
                             <div class="form-check form-check-inline mt-2">
                                 <input class="form-check-input" type="radio" name="create_typeRadio" id="create_typeRadio{{$type->id}}" value="{{$type->id}}" @if($type->id ==1) checked @endif >
                                 <label class="form-check-label" for="create_typeRadio{{$type->id}}">{{$type->name}}</label>
                             </div>

                             @endforeach
                             @endif
                         </div>
                         <label for="create_answer" class="form-label">Answer</label>
                         <div id="create_answersContainer">
                             <!-- answers -->

                         </div>


                     </div>
                     <button id="create_btnAnswer" type="button" class="btn rounded-pill btn-icon" onclick="addAnswer('checkbox','create_')">
                         <span class="ti ti-circle-plus" style="font-size: 20px;"></span>

                     </button>


                 </div>
                 <div class="modal-footer">
                     <button type="button" class="btn btn-outline-secondary" onclick="resetModalQuestion('create_')">
                         Delete
                     </button>

                     <button type="submit" class="btn btn-primary">Save changes</button>
                 </div>
             </form>
         </div>
     </div>
 </div>


 <!-- Modal Edit Question -->
 <div class="modal fade" id="editQuestion" tabindex="-1" style="display: none;" aria-hidden="true">
     <div class="modal-dialog modal-lg" role="document">
         <div class="modal-content">
             <div class="modal-header">
                 <h5 class="modal-title" id="modalQuestion">Edit Question</h5>
                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
             </div>
             <form id="edit_questionForm" action="" onsubmit="return validateForm('edit_')" method="post" enctype="multipart/form-data">
                 @csrf
                 <div class="modal-body">
                     <div class="row">
                         <div class="col mb-3">
                             <label for="edit_questionText" class="form-label">Name</label>
                                <font id="edit_errorName" style="vertical-align: inherit;">
                                </font>
                                <textarea id="edit_editor" name="edit_questionText"></textarea>
                                <br>
                                <div id="edit_name_duplicate_error" class="alert alert-danger alert-dismissible d-none">
                                    <h4 class="alert-heading">Possible duplicates!</h4>
                                    <button type="button" class="edit-btn-close btn-close" onclick=hideAlert(this) aria-label="Close"></button>
                                </div>
                                <label class="form-label">Question Image</label><br>
                                 <label class="btn btn-outline-secondary mb-0" for="edit_inputQuestion">
                                     <span class="ti ti-upload"></span>
                                 </label>
                                 <input type="file" name="edit_questionImg" class="form-control d-none" id="edit_inputQuestion" onchange="previewQuestion('edit_')">
                             

                             <div id="edit_fileQuestion" name="edit_fileQuestion" class="mt-2">
                                 <img src="" class="question-img" id="edit_loadImg" />
                             </div>
                         </div>


                         <div class="mb-3">
                             <label for="edit_levelSelect" class="form-label">Level</label>
                             <select id="edit_levelSelect" name="edit_level" class="form-select">
                                 @if(!empty($listLevels))
                                 @foreach($listLevels as $level )
                                 <option value="{{$level->id}}">{{$level->name}}</option>

                                 @endforeach
                                 @else
                                 <option value="">No choose</option>
                                 @endif
                             </select>
                         </div>
                         <div class="mb-3 mt-1">
                             <label for="edit_topicSelect" class="form-label">Topic</label>
                             <select id="edit_topicSelect" name="edit_topic" class="form-select">
                                 @if(!empty($listTopics))
                                 @foreach($listTopics as $topic)
                                 <option value="{{$topic->id}}">{{$topic->name}}</option>

                                 @endforeach
                                 @else
                                 <option value="">No choose</option>
                                 @endif
                             </select>
                         </div>
                         <div class="col-md mb-2">
                             <label for="edit_typeRadio" class="form-label d-block">Question Type</label>
                             @if(!empty($listTypes))
                             @foreach($listTypes as $type)
                             <div class="form-check form-check-inline mt-2">
                                 <input class="form-check-input" type="radio" name="edit_typeRadio" id="edit_typeRadio{{$type->id}}" value="{{$type->id}}" @if($type->id ==1) checked @endif >
                                 <label class="form-check-label" for="edit_typeRadio{{$type->id}}">{{$type->name}}</label>
                             </div>

                             @endforeach
                             @endif
                         </div>
                         <label for="answer" class="form-label">Answer</label>
                         <div id="edit_answersContainer">
                             <!-- answers -->

                         </div>


                     </div>
                     <button id="edit_btnAnswer" type="button" class="btn rounded-pill btn-icon" onclick="addAnswer('checkbox','edit_')">
                        <span class="ti ti-circle-plus" style="font-size: 20px;"></span>

                     </button>


                 </div>
                 <div class="modal-footer">
                     <button type="submit" class="edit-question-btn btn btn-primary" data-id="">Save changes</button>
                 </div>
             </form>
         </div>
     </div>
 </div>

 <div class="modal fade" id="detailQuestion" tabindex="-1" style="display: none;" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel1">Answer Question</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Img</th>
                                <th>Text</th>
                                <th>Answer Right</th>
                            </tr>
                        </thead>
                        <tbody class="table-border-bottom-0">
                            <tr>
                                <td><img src="" alt="Avatar" class="preview-img"></td>
                                <td class="text-wrap text-break"><p class="mb-0 fw-normal">Your long text here that needs to be wrapped properly within the table cell to ensure it doesn't overflow.</p></td>
                                <td><span class="badge bg-secondary rounded-3 fw-semibold">Medium</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Close
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Import -->
<div class="modal fade" id="importQuestion" tabindex="-1" style="display: none;" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="importexportModalQuestion">Import Question</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="card-body p-4">
            <form action="{{ route('question.importQuestions') }}" method="POST" enctype="multipart/form-data">
                @csrf
                <li><span class="ck-list-bogus-paragraph">Both files must have the extension “.<strong>xlsx</strong>”.</span></li>
                <li><span>Columns in the file must have:<br>
                - question_text<br>
                - question_img<br>
                - deleted_at<br>
                - created_at<br>
                - updated_at<br>
                - user_id<br>
                - question_type_id<br>
                - level_id<br>
                - topic_id</span>
                </li>
                <p class="form-label">Your questions file</p>
                <input type="file" name="importQuestions_file" class="form-control" accept=".xlsx">
                <br>
                <li><span>Columns in the file must have:<br>
                - answer_data<br>
                - deleted_at<br>
                - created_at<br>
                - updated_at<br>
                - question_admin_id<br>
                </li>
                    <p class="form-label">Your answers file</p>
                    <input type="file" name="importAnswers_file" class="form-control" accept=".xlsx">
                <br>
                <p>Upload both files and then press this button.</p>
                <button type="submit" class="btn btn-primary">Import Questions</button>
            </form>
            </div>
        </div>
    </div>
</div>
<!-- Export -->
<div class="modal fade" id="exportQuestion" tabindex="-1" style="display: none;" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="card-title fw-semibold mb-4">Export Questions</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="card-body p-4">
            <p>For security reasons, please <b>do not</b> alter and/or edit the exported file.</p>
            <p>Exports an .<b>xlsx</b> file</p>
            <a href="{{route('question.exportQuestions')}}"><button class="btn btn-primary mb-4">
                Export Questions
            </button></a>
            <a href="{{route('question.exportAnswers')}}"><button class="btn btn-primary mb-4">
                Export Answers
            </button></a>
            </div>
        </div>
    </div>
</div>