 <!-- Modal Create User -->
 <div class="modal fade" id="createUser" tabindex="-1" style="display: none;" aria-hidden="true">
     <div class="modal-dialog " role="document">
         <div class="modal-content">
             <div class="modal-header">
                 <h5 class="modal-title" id="createModalUser">Add User</h5>
                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
             </div>
            <form action="{{ route('user.createHandle' )}}" method="POST" enctype="multipart/form-data">
                @csrf
             <div class="modal-body">
                 <div class="row">
                     <div class="col mb-3">
                         <label for="createUserName" class="form-label">Displayname</label>
                         <div class="input-group">
                             <input type="text" id="createDisplayname" name="displayname" class="form-control" placeholder="Enter displayname">
                         </div>
                     </div>
                 </div>
                 <div class="row">
                     <div class="col mb-3">
                         <label for="createUserName" class="form-label">Email</label>
                         <div class="input-group">
                             <input type="email" id="createEmail" name="email" class="form-control" placeholder="Enter email">
                         </div>
                     </div>
                 </div>
                 <div class="row">
                     <div class="col mb-3">
                         <label for="createUserName" class="form-label">Password</label>
                         <div class="input-group">
                             <input type="password" id="createPassword" name="password" class="form-control" placeholder="Enter password">
                         </div>
                     </div>
                 </div>
                 <div class="row">
                     <div class="col mb-3">
                         <label for="createUserName" class="form-label">Confirm Password</label>
                         <div class="input-group">
                             <input type="password" id="createRePassword" name="password_confirmation" class="form-control" placeholder="Re-Enter password">
                         </div>
                     </div>
                 </div>
                 <div class="row">
                     <div class="col mb-3">
                         <label for="createUserName" class="form-label">Date of Birth</label>
                         <div class="input-group">
                             <input type="date" id="createDateofbirth" name="date_of_birth" class="form-control">
                         </div>
                     </div>
                 </div>
                <label class="btn btn-outline-secondary mb-0" for="createInputUser">
                    <span class="ti ti-upload"></span>
                </label>
                <input type="file" name="image" class="form-control d-none" id="createInputUser" onchange="previewUser('create')">
                <div id="createFileUser" name="createFileUser" class="mt-2"></div>
            </div>
            <div class="modal-footer">
                 <button type="button" class="btn btn-outline-secondary" onclick="resetModalUser('create')">
                     Delete
                 </button>
                 <button type="submit" class="btn btn-primary">Save changes</button>
             </div>
            </form>
         </div>
     </div>
 </div>


 <!-- Modal Edit User -->
 <div class="modal fade" id="editUser" tabindex="-1" style="display: none;" aria-hidden="true">
 <div class="modal-dialog " role="document">
         <div class="modal-content">
             <div class="modal-header">
                 <h5 class="modal-title" id="editModalUser">Edit User</h5>
                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
             </div>
            <form action="" method="POST" enctype="multipart/form-data">
                @csrf
                <div class="modal-body">
                 <div class="row">
                     <div class="col mb-3">
                         <label for="editUserName" class="form-label">Displayname</label>
                         <div class="input-group">
                             <input type="text" id="editDisplayname" name="displayname" class="form-control" placeholder="Enter displayname">
                         </div>
                     </div>
                 </div>
                 <div class="row">
                     <div class="col mb-3">
                         <label for="editUserName" class="form-label">Date of Birth</label>
                         <div class="input-group">
                             <input type="date" id="editDateofbirth" name="date_of_birth" class="form-control">
                         </div>
                     </div>
                 </div>
                <label class="btn btn-outline-secondary mb-0" for="editInputUser">
                    <span class="ti ti-upload"></span>
                </label>
                <input type="file" name="image" class="form-control d-none" id="editInputUser" onchange="previewUser('edit')">
                <div id="editFileUser" name="editFileUser" class="mt-2"></div>
            </div>
            <div class="modal-footer">
                 <button type="button" class="btn btn-outline-secondary" onclick="resetModalUser('edit')">
                     Delete
                 </button>
                 <button type="submit" class="btn btn-primary">Save changes</button>
             </div>
            </form>
         </div>
     </div>
     </div>
<!-- Import -->
<div class="modal fade" id="importUser" tabindex="-1" style="display: none;" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">    
            <div class="modal-header">
                <h5 class="modal-title" id="importUser">Import Users</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <ol><li><span class="ck-list-bogus-paragraph">File must have the extension “.<strong>xlsx</strong>”.</span></li>
            <li><span>Columns in the file must have:<br>
            - displayname<br>
            - email<br>
            - password<br>
            - date_of_birth<br>
            - image<br>- status<br>
            - admin_role<br>
            - created_at<br>
            - updated_at</span>
            </li></ol>
            <div class="card-body p-4">
                <form action="{{ route('user.importUsers') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                        <p class="form-label">Your file</p>
                        <input type="file" name="importUsers_file" class="form-control" accept=".xlsx">
                    <br>
                    <button type="submit" class="btn btn-primary">Import Users</button>
                </form>
            </div>
        </div>
    </div>
</div>
<!-- Export -->
<div class="modal fade" id="exportUser" tabindex="-1" style="display: none;" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">    
            <div class="modal-header">
                <h5 class="modal-title" id="exportUser">Export Users</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="card-body p-4">
                <p>For security reasons, please <b>do not</b> alter and/or edit the exported file.</p>
                <p>Exports an .<b>xlsx</b> file</p>
                <a href="{{route('user.exportUsers')}}"><button class="btn btn-primary mb-4">
                    Export Users
                </button></a>
            </div>
        </div>
    </div>
</div>