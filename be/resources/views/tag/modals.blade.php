 <!-- Modal Create Question -->
 <div class="modal fade" id="createTag" tabindex="-1" style="display: none;" aria-hidden="true">
     <div class="modal-dialog " role="document">
         <div class="modal-content">
             <div class="modal-header">
                 <h5 class="modal-title" id="createModalTag">Add Tag</h5>
                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
             </div>
            <form action="{{ route('tag.create' )}}" method="POST">
                @csrf
             <div class="modal-body">
                 <div class="row">
                     <div class="col mb-3">
                         <label for="createTagName" class="form-label">Name</label>
                         <div class="input-group">
                             <input type="text" id="createTagName" name="name" class="form-control" placeholder="Enter Name">
                         </div>
                     </div>
                 </div>
             </div>
             <div class="modal-footer">
                 <button type="button" class="btn btn-outline-secondary" onclick="resetModalTag('create')">
                     Delete
                 </button>
                 <button type="submit" class="btn btn-primary">Save changes</button>
             </div>
            </form>
         </div>
     </div>
 </div>


 <!-- Modal Edit Question -->
 <div class="modal fade" id="editTag" tabindex="-1" style="display: none;" aria-hidden="true">
 <div class="modal-dialog " role="document">
         <div class="modal-content">
             <div class="modal-header">
                 <h5 class="modal-title" id="editModalTag">Edit Tag</h5>
                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
             </div>
            <form action="" method="POST">
                @csrf
             <div class="modal-body">
                 <div class="row">
                     <div class="col mb-3">
                         <label for="editTagName" class="form-label">Name</label>
                         <div class="input-group">
                             <input type="text" id="editTagName" name="name" class="form-control" placeholder="Enter Name">
                         </div>
                     </div>
                 </div>
             </div>
             <div class="modal-footer">
                 <button type="button" class="btn btn-outline-secondary" onclick="resetModalTag('edit')">
                     Delete
                 </button>
                 <button type="submit" class="btn btn-primary">Save changes</button>
             </div>
            </form>
         </div>
     </div>
     </div>
<!-- Import -->
<div class="modal fade" id="importTag" tabindex="-1" style="display: none;" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">    
            <div class="modal-header">
                <h5 class="modal-title">Import Tag</h5>
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
                <form action="{{ route('tag.importTags') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                        <p class="form-label">Your file</p>
                        <input type="file" name="importTags_file" class="form-control" accept=".xlsx">
                    <br>
                    <button type="submit" class="btn btn-primary">Import Tags</button>
                </form>
            </div>
        </div>
    </div>
</div>
<!-- Export -->
<div class="modal fade" id="exportTag" tabindex="-1" style="display: none;" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">    
            <div class="modal-header">
                <h5 class="modal-title">Export Tag</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="card-body p-4">
                <p>For security reasons, please <b>do not</b> alter and/or edit the exported file.</p>
                <p>Exports an .<b>xlsx</b> file</p>
                <a href="{{route('tag.exportTags')}}"><button class="btn btn-primary mb-4">
                    Export Tags
                </button></a>
            </div>
        </div>
    </div>
</div>