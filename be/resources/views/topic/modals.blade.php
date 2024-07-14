<!-- Modal Create Question -->
<div class="modal fade" id="createTopic" tabindex="-1" style="display: none;" aria-hidden="true">
    <div class="modal-dialog " role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="createModalTopic">Add Topic</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
        <form action="{{ route('topic.create' )}}" method="POST">
            @csrf
            <div class="modal-body">
                <div class="row">
                    <div class="col mb-3">
                        <label for="createTopicName" class="form-label">Name</label>
                        <div class="input-group">
                            <input type="text" id="createTopicName" name="name" class="form-control" placeholder="Enter Name">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" onclick="resetModalTopic('create')">
                    Delete
                </button>
                <button type="submit" class="btn btn-primary">Save changes</button>
            </div>
        </form>
        </div>
    </div>
</div>


<!-- Modal Edit Question -->
<div class="modal fade" id="editTopic" tabindex="-1" style="display: none;" aria-hidden="true">
<div class="modal-dialog " role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="editModalTopic">Edit Topic</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
    <form action="" method="POST">
        @csrf
        <div class="modal-body">
            <div class="row">
                <div class="col mb-3">
                    <label for="editTopicName" class="form-label">Name</label>
                    <div class="input-group">
                        <input type="text" id="editTopicName" name="name" class="form-control" placeholder="Enter Name">
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" onclick="resetModalTopic('edit')">
                Delete
            </button>
            <button type="submit" class="btn btn-primary">Save changes</button>
        </div>
    </form>
    </div>
</div>
</div>

<!-- Import -->
<div class="modal fade" id="importTopic" tabindex="-1" style="display: none;" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">    
            <div class="modal-header">
                <h5 class="modal-title" id="importexportModalTopic">Import Topic</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="card-body p-4">
                <li><span class="ck-list-bogus-paragraph">File must have the extension “.<strong>xlsx</strong>”.</span></li>
                <li><span>Columns in the file must have:<br>
                - name<br>
                - deleted_at<br>
                - created_at<br>
                - updated_at<br>
                </li>
                <form action="{{ route('topic.importTopics') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                        <p class="form-label">Your file</p>
                        <input type="file" name="importTopics_file" class="form-control" accept=".xlsx">
                    <br>
                    <button type="submit" class="btn btn-primary">Import Topics</button>
                </form>
            </div>
        </div>
    </div>
</div>
<!-- Export -->
<div class="modal fade" id="exportTopic" tabindex="-1" style="display: none;" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">    
            <div class="modal-header">
                <h5 class="modal-title" id="importexportModalTopic">Export Topic</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="card-body p-4">
                <p>For security reasons, please <b>do not</b> alter and/or edit the exported file.</p>
                <p>Exports an .<b>xlsx</b> file</p>
                <a href="{{route('topic.exportTopics')}}"><button class="btn btn-primary mb-4">
                    Export Topics
                </button></a>
            </div>
        </div>
    </div>
</div>