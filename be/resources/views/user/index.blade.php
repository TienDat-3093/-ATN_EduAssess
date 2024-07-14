@extends('layout')

@section('content')
@include('user.modals')
<div class="mt-3">
    <!-- Button trigger modal -->
    <!-- <button type="button" class="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#createUser">
        <i class="ti ti-playlist-add"></i>
        Create
    </button> -->
    <button type="button" class="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#importUser">
        <i class="ti ti-file-import"></i>
        Import
    </button>
    <button type="button" class="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#exportUser">
        <i class="ti ti-file-export"></i>
        Export
    </button>
</div>
@error('displayname')
<font id="error" style="vertical-align: inherit;color:red">{{ $message }}.<br></font>
@enderror
@error('email')
<font id="error" style="vertical-align: inherit;color:red">{{ $message }}.<br></font>
@enderror
@error('password')
<font id="error" style="vertical-align: inherit;color:red">{{ $message }}.<br></font>
@enderror
@error('date_of_birth')
<font id="error" style="vertical-align: inherit;color:red">{{ $message }}.<br></font>
@enderror
    <!-- Search Input -->
<div class="col-lg-13 d-flex align-items-stretch">
    <div class="card w-100">
        <div class="card-body p-4">
        <form action="{{ route('user.index') }}" method="GET">
            <div class="input-group mb-3">
                <button class="input-group-text" id="search-button"><i class="ti ti-search"></i></button>
                <input value="{{ request('searchInput', old('searchInput')) }}" type="text" name="searchInput" id="searchInput" class="form-control" placeholder="Search by displayname or email" aria-label="Search by displayname or email" aria-describedby="basic-addon-search31">
            </div>
            
            <!-- Radio Buttons -->
            <div class="d-flex mb-4">
                <div class="flex-fill">
                    <label>Status:</label>
                    <div class="d-flex align-middle">
                        <div class="form-check m-2">
                            <input class="form-check-input" type="radio" name="active" id="active_all" value=""{{ request('active') == '' ? 'checked' : '' }}>
                            <label class="form-check-label" for="active_all"><h6>All</h6></label>
                        </div>
                        <div class="form-check m-2">
                            <input class="form-check-input" type="radio" name="active" id="active" value="1" {{ request('active') == '1' ? 'checked' : '' }}>
                            <label class="form-check-label" for="active"><h6>Active</h6></label>
                        </div>
                        <div class="form-check m-2">
                            <input class="form-check-input" type="radio" name="active" id="inactive" value="0" {{ request('active') == '0' ? 'checked' : '' }}>
                            <label class="form-check-label" for="inactive"><h6>Inactive</h6></label>
                        </div>
                    </div>
                </div>
                <div class="flex-fill">
                    <label>Show amount:</label>
                    <select name="show" class="form-select">
                        <option value="10" {{ request('show') == '10' ? 'selected' : '' }}>10</option>
                        <option value="20" {{ request('show') == '20' ? 'selected' : '' }}>20</option>
                        <option value="50" {{ request('show') == '50' ? 'selected' : '' }}>50</option>
                        <option value="100" {{ request('show') == '100' ? 'selected' : '' }}>100</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</div>
</form>
<div class="col-lg-13 d-flex align-items-stretch">
    <div class="card w-100">
        <div class="card-body p-4">
            <h5 class="card-title fw-semibold mb-4">List Users</h5>
            <div class="table-responsive">
                <table id="listUsers" class="table text-nowrap mb-0 align-middle text-center table-hover">
                    <thead class="text-dark fs-4">
                        <tr>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Displayname</h6>
                            </th>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Avatar</h6>
                            </th>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Email</h6>
                            </th>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Date of Birth</h6>
                            </th>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Status</h6>
                            </th>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Functions</h6>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="table-bordered">
                    @foreach ($listUsers as $user)
                        <tr>
                            <td class="border-bottom-0"
                            @if($user->status) 
                                style="cursor: pointer;" 
                                data-bs-toggle="modal"
                                data-bs-target="#editUser"
                                onclick="getUser({{$user->id}})"
                            @endif
                            >
                                <h6 class="fw-semibold mb-0">{{$user->displayname}}</h6>
                            </td>
                            <td class="border-bottom-0"
                            @if($user->status) 
                                style="cursor: pointer;" 
                                data-bs-toggle="modal"
                                data-bs-target="#editUser"
                                onclick="getUser({{$user->id}})"
                            @endif
                            >
                                <img src="{{ $user->image ? asset($user->image) : asset('img/users/default.png') }}" class="preview-img" alt="">
                            </td>
                            <td class="border-bottom-0"
                            @if($user->status) 
                                style="cursor: pointer;" 
                                data-bs-toggle="modal"
                                data-bs-target="#editUser"
                                onclick="getUser({{$user->id}})"
                            @endif
                            >
                                <h6 class="fw-semibold mb-0">{{$user->email}}</h6>
                            </td>
                            <td class="border-bottom-0"
                            @if($user->status) 
                                style="cursor: pointer;" 
                                data-bs-toggle="modal"
                                data-bs-target="#editUser"
                                onclick="getUser({{$user->id}})"
                            @endif
                            >
                                <h6 class="fw-semibold mb-0">{{ \Carbon\Carbon::parse($user->date_of_birth)->format('d/m/Y') }}</h6>
                            </td>
                            <td class="border-bottom-0"
                            @if($user->status) 
                                style="cursor: pointer;" 
                                data-bs-toggle="modal"
                                data-bs-target="#editUser"
                                onclick="getUser({{$user->id}})"
                            @endif
                            >
                            @if($user->status == 0)
                                <font class="badge bg-danger rounded-3 fw-semibol">
                                    Inactive
                                </font>
                            @else
                                <font class="badge bg-success rounded-3 fw-semibol">
                                    Active
                                </font>
                            @endif
                            </td>
                            <td>
                                <div class="btn-group">
                                    <button type="button" class="btn btn-icon rounded-pill hide-arrow" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="ti ti-dots-vertical"></i>
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end">
                                        @if($user->status == 0)
                                        <li><a data-action-name="setting account to Active" href="{{ route('user.delete', ['id' => $user->id] )}}" class="dropdown-item delete-link">Set to Active</a></li>
                                        @else
                                        <li><button id="edit-user" type="button" class="edit-user-btn dropdown-item" data-bs-toggle="modal" data-bs-target="#editUser" onclick='getUser({{$user->id}})'>Edit</button></li>
                                        <li><a data-action-name="setting account to Inactive" href="{{ route('user.delete', ['id' => $user->id] )}}" class="dropdown-item delete-link">Set to Inactive</a></li>
                                        @endif
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
                {{ $listUsers->appends(request()->query())->links() }}
            </div>
        </div>
    </div>
</div>

<script src="{{asset('assets/jquery-3.7.1.min.js')}}"></script>
<script>
    document.querySelectorAll('.delete-link').forEach(function(link) {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const actionName = event.target.getAttribute('data-action-name');
                Swal.fire({
                    title: 'Confirm ' + actionName + '?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Confirm',
                    cancelButtonText: 'Cancel',
                }).then(function(result) {
                    if (result.isConfirmed) {
                        window.location.href = event.target.href;
                    }
                });
            });
        });
    document.addEventListener('DOMContentLoaded', (event) => {
        const createUser = document.getElementById('createUser');
        createUser.addEventListener('hidden.bs.modal', () => resetModalUser('create'));
        
        const editUser = document.getElementById('editUser');
        editUser.addEventListener('hidden.bs.modal', () => resetModalUser('edit'));

        // const editButtons = document.querySelectorAll('.edit-user-btn');
        // editButtons.forEach(button => {
        //     button.addEventListener('click', (event) => {
        //         const itemId = button.getAttribute('item-id');
        //         const itemName = button.getAttribute('item-name');
        //         const editUserModal = document.getElementById('editUser');
        //         const editForm = editUserModal.querySelector('form');
        //         editForm.action = "{{ route('user.editHandle', ['id' => ':itemId']) }}".replace(':itemId', itemId);
        //         getUser(itemId);
        //     });
        // });
    })
    function resetModalUser(modalType) {
        document.getElementById(`${modalType}Displayname`).value = '';
        document.getElementById(`${modalType}Dateofbirth`).value = '';
        if(modalType == "create"){
        document.getElementById(`${modalType}Email`).value = '';
        document.getElementById(`${modalType}Password`).value = '';
        document.getElementById(`${modalType}RePassword`).value = '';
        }
        const newFilePreview = document.getElementById(`${modalType}FileUser`);
        const imgElement = newFilePreview.querySelector('img');
        if(imgElement)
        newFilePreview.removeChild(imgElement);
    }
    document.addEventListener("DOMContentLoaded", function() {
            setTimeout(function() {
                var elements = document.querySelectorAll('#error');
                if (elements) {
                    elements.forEach(function(element) {
                        element.remove();
                    });
                }
            }, 5000);
        });
    var $j = jQuery.noConflict();
        $j(document).ready(function() {
            $j(document).on('keyup', function(event) {
                if (event.key === 'Enter') {
                    search();
                }
            });
        });

        function search() {
            let keyword = $j('#searchInput').val();
            let activeStatus = $j('input[name="active"]:checked').val();
            $j.ajax({
                url: "{{ route('user.search') }}",
                type: 'POST',
                data: {
                    keyword: keyword,
                    active: activeStatus,
                    _token: '{{ csrf_token() }}'
                },
                success: function(data) {
                    $j('#listUsers tbody').html(data);
                },
                error: function(xhr) {
                    console.error(xhr.responseText);
                }
            });
        }
        function previewUser(modalType) {
        const fileInput = document.getElementById(`${modalType}InputUser`);
        const fileUser = document.getElementById(`${modalType}FileUser`);
        const file = fileInput.files[0];
        fileUser.innerHTML = '';
        if (file) {
            const fileName = document.createElement('p');
            fileName.textContent = `Selected file: ${file.name}`;
            fileUser.appendChild(fileName);
            if (file.type.startsWith('image/')) {
                const imgUser = document.createElement('img');
                imgUser.classList.add('preview-img');
                imgUser.src = URL.createObjectURL(file);
                fileUser.appendChild(imgUser);
                }
            }
        }
    function getUser(userID){
            const editUserModal = document.getElementById('editUser');
            const editForm = editUserModal.querySelector('form');
            editForm.action = "{{ route('user.editHandle', ['id' => ':userID']) }}".replace(':userID', userID);
            $j.ajax({
                url: "{{ route('user.getUser', ['id' => ':userID']) }}".replace(':userID', userID),
                method: 'GET',
                success: function(data) {
                    document.getElementById('editDisplayname').value = data.displayname;
                    document.getElementById('editDateofbirth').value = data.date_of_birth;
                    const imgElement = document.createElement('img');
                    const newFilePreview = document.getElementById('editFileUser');
                    if(data.image != null){
                        imgElement.src = data.image;
                        imgElement.className = 'preview-img';
                        newFilePreview.appendChild(imgElement);
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Error fetching user data:', error);
                }
            });
    }
</script>
@endsection
