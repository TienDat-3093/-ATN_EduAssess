@extends('layout')

@section('content')
<div class="card mb-4">
    <div>
    <h5 class="d-inline-block card-header">Profile Details
    </h5>
    </div>
    <!-- Account -->
    <div class="card-body">
        <div class="row">
            <div class="mb-3 col-md-6 d-flex justify-content-center">
                <div class="text-center">
                <img src="{{ Auth::user()->image ? asset(Auth::user()->image) : asset('img/users/default.png') }}" alt="user-avatar" class="mb-3 rounded" height="100" width="100"/>
                @php
                    switch (Auth::user()->admin_role) {
                        case 1:
                            $roleText = 'Admin';
                            break;
                        case 2:
                            $roleText = 'Lead Admin';
                            break;
                        default:
                            $roleText = 'User';
                            break;
                    }
                @endphp
                <h6 class="fw-semibold mb-2">{{ Auth::user()->displayname }}</h6>
                <p>Account Rank: {{ $roleText }}</p>
                </div>
            </div>
            <div class="mb-3 col-md-6">
                <label for="email" class="form-label">E-mail</label>
                <input
                readonly
                class="form-control mb-4"
                type="text"
                id="email"
                name="email"
                value="{{Auth::user()->email}}"
                />
                
                <label for="organization" class="form-label">Date of Birth</label>
                <input
                readonly
                type="date"
                class="form-control mb-4"
                id="organization"
                name="organization"
                value="{{Auth::user()->date_of_birth}}"
                />
            </div>
        </div>
        <div class="row">
        <div class="col-md-12 d-flex justify-content-end">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#MyProfile">
                <p class="mb-0 fs-3">Edit Account</p>
            </button>
        </div>
    </div>
    </div>
</div>

<!-- Modal Edit User -->
<div class="modal fade" id="MyProfile" tabindex="-1" style="display: none;" aria-hidden="true">
    <div class="modal-dialog " role="document">
        <div class="modal-content">
            <div class="modal-header">
                 <h5 class="modal-title">Edit Profile</h5>
                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="{{ route('editProfile', ['id' => Auth::user()->id] )}}" method="POST" enctype="multipart/form-data">
                @csrf
                <div class="modal-body">
                    <div id="editProfileFileUser" class="d-inline-block align-middle m-2">
                        <img class="preview-img" src="{{ Auth::user()->image ? asset(Auth::user()->image) : asset('img/users/default.png') }}"></img>
                    </div>
                    <div class="d-inline-block align-middle m-2">
                        <label class="btn btn-outline-secondary mb-0" for="editProfileInputUser">
                            <span class="ti ti-upload"></span>
                        </label>
                        <input type="file" name="image" class="form-control d-none" id="editProfileInputUser" onchange="previeweditProfile()">
                    </div>
                    <div class="row">
                        <div class="col mb-3">
                            <label for="editProfileUserName" class="form-label">Displayname</label>
                            <div class="input-group">
                                <input type="text" value="{{Auth::user()->displayname}}" id="editProfileDisplayname" name="displayname" class="form-control" placeholder="Enter displayname">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col mb-3">
                            <label for="createProfileEmail" class="form-label">Email</label>
                            <div class="input-group">
                                <input type="email" value="{{Auth::user()->email}}" id="createProfileEmail" name="email" class="form-control" placeholder="Enter email">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col mb-3">
                            <label for="oldPassword" class="form-label">Old Password</label>
                            <div class="input-group">
                                <input type="password" id="oldPassword" name="old_password" class="form-control" placeholder="Enter password">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col mb-3">
                            <label for="createPassword" class="form-label">New Password</label>
                            <div class="input-group">
                                <input type="password" id="createPassword" name="password" class="form-control" placeholder="Enter password">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col mb-3">
                            <label for="createRePassword" class="form-label">Confirm Password</label>
                            <div class="input-group">
                                <input type="password" id="createRePassword" name="password_confirmation" class="form-control" placeholder="Re-Enter password">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col mb-3">
                            <label for="editProfileDateofbirth" class="form-label">Date of Birth</label>
                            <div class="input-group">
                                <input type="date" value="{{Auth::user()->date_of_birth}}" id="editProfileDateofbirth" name="date_of_birth" class="form-control">
                            </div>
                        </div>
                    </div>
                </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary">Save changes</button>
            </div>
            </form>
        </div>
    </div>
</div>
     <!--  Modal Ends -->
<script>
    function previeweditProfile() {
    const fileInput = document.getElementById(`editProfileInputUser`);
    const fileUser = document.getElementById(`editProfileFileUser`);
    const file = fileInput.files[0];
    fileUser.innerHTML = '';
    if (file) {
        if (file.type.startsWith('image/')) {
            const imgUser = document.createElement('img');
            imgUser.classList.add('preview-img');
            imgUser.src = URL.createObjectURL(file);
            fileUser.appendChild(imgUser);
            }
        }
    }
</script>
@endsection