@extends('layout')
@include('test.modals')
@section('content')
<div class="mt-3">
    <a href="{{route('test.create')}}"><button type="button" class="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#createTest">
        <i class="ti ti-playlist-add"></i>
        Create
    </button></a>
    <button type="button" class="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#importTest">
        <i class="ti ti-file-import"></i>
        Import
    </button>
    <button type="button" class="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#exportTest">
        <i class="ti ti-file-export"></i>
        Export
    </button>
</div>
<font id="error">
@if(Session::has('error'))
    <font style="vertical-align: inherit;color:red">{{Session::get('error')}}</font>
@endif
</font>
<!-- Search Input -->
<div class="col-lg-13 d-flex align-items-stretch">
    <div class="card w-100">
        <div class="card-body p-4">
            <form action="{{ route('test.index') }}" method="GET">
                <div class="input-group mb-3">
                    <button class="input-group-text" id="search-button"><i class="ti ti-search"></i></button>
                    <input value="{{ request('searchInput', old('searchInput')) }}" type="text" name="searchInput" id="searchInput" class="form-control" placeholder="Search by name or author">
                </div>
                <div class="d-flex mb-4">
                    <div class="flex-fill me-2">
                    <label class="form-label">Topics</label>
                        @foreach ($listTopics as $topic)
                            <div style="display:inline-block; margin:5px;">
                            <input @if (in_array($topic->id, $topic_data)) checked @endif class="btn-check" id="topic-{{ $topic->id }}" autocomplete="off" type="checkbox" name="topic_data[]" value="{{ $topic->id }}" id="topic-{{ $topic->id }}">
                            <label style="border-radius:25px;" class="btn btn-secondary" for="topic-{{ $topic->id }}" class="topic-label">{{ $topic->name }}</label>
                            </div>
                        @endforeach
                    </div>
                </div>
                <div class="d-flex mb-4">
                    <div class="flex-fill me-2">
                    <label class="form-label">Tags</label>
                        @foreach ($listTags as $tag)
                            <div style="display:inline-block; margin:5px;">
                            <input @if (in_array($tag->id, $tag_data)) checked @endif class="btn-check" id="searchtag-{{ $tag->id }}" autocomplete="off" type="checkbox" name="tag_data[]" value="{{ $tag->id }}" id="tag-{{ $tag->id }}">
                            <label style="border-radius:25px;" class="btn btn-secondary" for="searchtag-{{ $tag->id }}" class="tag-label">{{ $tag->name }}</label>
                            </div>
                        @endforeach
                    </div>
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
            </form>
        </div>
    </div>
</div>
<div class="col-lg-13 d-flex align-items-stretch">
    <div class="card w-100">
        <div class="card-body p-4">
            <h5 class="card-title fw-semibold mb-4">List Tests</h5>
            <div class="table-responsive">
                <table id="listTests" class="table text-nowrap mb-0 align-middle text-center table-hover">
                    <thead class="text-dark fs-4">
                        <tr>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Name</h6>
                            </th>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Banner</h6>
                            </th>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Author</h6>
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
                        @foreach($listTests as $test)
                            <tr>
                                <td class="border-bottom-0"
                                @if(!$test->deleted_at) 
                                    style="cursor: pointer;" 
                                    data-bs-toggle="modal"
                                    data-bs-target="#editTest"
                                    onclick="getTags({{$test->id}})"
                                @endif
                                >
                                    <h6 class="fw-semibold mb-1">
                                    @if (strlen($test->name) > 30)
                                    <span title="{{$test->name}}">{{ substr($test->name, 0, 30) }}...</span>
                                    @else
                                        {{ $test->name }}
                                    @endif
                                    </h6>
                                </td>
                                <td class="border-bottom-0"
                                @if(!$test->deleted_at) 
                                    style="cursor: pointer;" 
                                    data-bs-toggle="modal"
                                    data-bs-target="#editTest"
                                    onclick="getTags({{$test->id}})"
                                @endif
                                >
                                    <img src="{{asset($test->test_img)}}" class="preview-img" alt="">
                                </td>
                                <td class="border-bottom-0"
                                @if(!$test->deleted_at) 
                                    style="cursor: pointer;" 
                                    data-bs-toggle="modal"
                                    data-bs-target="#editTest"
                                    onclick="getTags({{$test->id}})"
                                @endif
                                >
                                    <h6 class="fw-semibold mb-1">{{$test->user->displayname}}</h6>
                                </td>
                                <td class="border-bottom-0"
                                @if(!$test->deleted_at) 
                                    style="cursor: pointer;" 
                                    data-bs-toggle="modal"
                                    data-bs-target="#editTest"
                                    onclick="getTags({{$test->id}})"
                                @endif
                                >
                                @if($test->deleted_at)
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
                                            <li><a href="{{route('test.detail', ['id' => $test->id] )}}"><button id="edit-test" type="button" class="edit-test-btn dropdown-item"  >Detail</button></a></li>
                                            @if($test->deleted_at)
                                            <!-- <li><a data-action-name="setting test to Active" href="{{ route('test.delete', ['id' => $test->id] )}}" class="dropdown-item delete-link">Restore</a></li> -->
                                            @else
                                            <li><button onclick="getTags({{$test->id}})" id="edit-test" type="button" class="edit-test-btn dropdown-item" data-bs-toggle="modal" data-bs-target="#editTest">Edit</button></li>
                                            <li><a data-action-name="deleting test? This cannot be undone." href="{{ route('test.delete', ['id' => $test->id] )}}" class="dropdown-item delete-link">Delete</a></li>
                                            @endif
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
                {{ $listTests->appends(request()->query())->links() }}
            </div>
        </div>
    </div>
</div>
@endsection
<script src="{{asset('assets/jquery-3.7.1.min.js')}}"></script>
<script>
    var $j = jQuery.noConflict();
    function previewTest() {
    const fileInput = document.getElementById(`test_img`);
    const file = fileInput.files[0];
    const editTestImg = document.getElementById('editTestImg');
    if (file) {
        if (file.type.startsWith('image/')) {
            editTestImg.src = URL.createObjectURL(file);
            }
        }
    }
    document.addEventListener('DOMContentLoaded', (event) => {
        const createTag = document.getElementById('editTest');
        const editTestImg = document.getElementById('editTestImg');
        editTest.addEventListener('hidden.bs.modal', () => {
            const checkboxes = editTest.querySelectorAll('input[type="checkbox"]');
            const fileInput = document.getElementById('test_img');
            fileInput.value = '';
            editTestImg.src = '';
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
        });
        
        document.querySelectorAll('.delete-link').forEach(function(link) {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const actionName = event.target.getAttribute('data-action-name');
                Swal.fire({
                    title: 'Confirm ' + actionName,
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
        
        setTimeout(function() {
                var elements = document.querySelectorAll('#error');
                if (elements) {
                    elements.forEach(function(element) {
                        element.style.display = 'none';
                    });
                }
            }, 5000);
    });
    function getTags(testID) {
            $j.ajax({
                url: "{{ route('test.getTags', ['id' => ':testID']) }}".replace(':testID', testID),
                method: 'GET',
                success: function(data) {
                    const editTestName = document.getElementById('editTestName');
                    editTestName.value = data.name;
                    if(data.test_img){
                        const editTestImg = document.getElementById('editTestImg');
                        editTestImg.src = data.test_img;
                    }
                    const tags = JSON.parse(data.tag_data);
                    tags.forEach(tagNumber => {
                        const input = document.getElementById('tag-' + tagNumber);
                        if (input) {
                            input.checked = true;
                        }
                    });
                },
                error: function(xhr, status, error) {
                    console.error('Error fetching tag_data:', error);
                }
            });
        const editTest = document.getElementById('editTest');
        const editForm = editTest.querySelector('form');
        editForm.action = "{{ route('test.edit', ['id' => ':testID']) }}".replace(':testID', testID);
    };
</script>