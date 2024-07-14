@extends('layout')

@section('content')
@include('topic.modals')
<div class="mt-3">
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#createTopic">
        <i class="ti ti-playlist-add"></i>
        Create
    </button>
    <button type="button" class="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#importTopic">
        <i class="ti ti-file-import"></i>
        Import
    </button>
    <button type="button" class="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#exportTopic">
        <i class="ti ti-file-export"></i>
        Export
    </button>
</div>
<font id="errorName" style="vertical-align: inherit;">
    @error('name')
    <font style="vertical-align: inherit;color:red">{{ $message }}</font>
    @enderror
</font>
<!-- Search Input -->
<div class="col-lg-13 d-flex align-items-stretch">
    <div class="card w-100">
        <div class="card-body p-4">
            <form action="{{ route('topic.index') }}" method="GET">
                <div class="input-group mb-3">
                    <button class="input-group-text" id="search-button"><i class="ti ti-search"></i></button>
                    <input value="{{ request('searchInput', old('searchInput')) }}" type="text" name="searchInput" id="searchInput" class="form-control" placeholder="Search">
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
            <h5 class="card-title fw-semibold mb-4">List Topics</h5>
            <div class="table-responsive">
                <table id="lisTopics" class="table text-nowrap mb-0 align-middle text-center table-hover">
                    <thead class="text-dark fs-4">
                        <tr>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Name</h6>
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
                    @foreach($listTopics as $topic)
                        <tr>
                            <td class="border-bottom-0"
                            @if(!$topic->deleted_at) 
                                style="cursor: pointer;" 
                                onclick="editTopic({{ $topic->id }},'{{ $topic->name }}')" 
                                data-bs-toggle="modal" 
                                data-bs-target="#editTopic"
                            @endif
                            >
                                <h6 class="fw-semibold mb-1">{{$topic->name}}</h6>
                            </td>
                            <td class="border-bottom-0"
                            @if(!$topic->deleted_at) 
                                style="cursor: pointer;" 
                                onclick="editTopic({{ $topic->id }},'{{ $topic->name }}')" 
                                data-bs-toggle="modal" 
                                data-bs-target="#editTopic"
                            @endif
                            >
                            @if($topic->deleted_at)
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
                                        @if($topic->deleted_at)
                                        <li><a data-action-name="setting topic to Active" href="{{ route('topic.delete', ['id' => $topic->id] )}}" class="dropdown-item delete-link">Set to Active</a></li>
                                        @else
                                        <li><button class="edit-topic-btn dropdown-item" data-bs-toggle="modal" data-bs-target="#editTopic" onclick="editTopic({{ $topic->id }},'{{ $topic->name }}')" >Edit</button></li>
                                        <li><a data-action-name="setting topic to Inactive" href="{{ route('topic.delete', ['id' => $topic->id] )}}" class="dropdown-item delete-link">Set to Inactive</a></li>
                                        @endif
                                    </ul>
                                </div>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
                {{ $listTopics->appends(request()->query())->links() }}
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
    var $j = jQuery.noConflict();
        $j(document).ready(function() {
            $j(document).on('keyup', function(event) {
                if (event.key === 'Enter') {
                    search();
                }
            });
        });
    function search() {
            let searchInput = $j('#searchInput').val();
            let activeStatus = $j('input[name="active"]:checked').val();
            $j.ajax({
                url: "{{ route('topic.search') }}",
                type: 'POST',
                data: {
                    searchInput: searchInput,
                    active: activeStatus,
                    _token: '{{ csrf_token() }}'
                },
                success: function(data) {
                    $j('#lisTopics tbody').html(data);
                },
                error: function(xhr) {
                    console.error(xhr.responseText);
                }
            });
        }
    document.addEventListener('DOMContentLoaded', (event) => {
        const createTopic = document.getElementById('createTopic');
        createTopic.addEventListener('hidden.bs.modal', () => resetModalTopic('create'));
        
        const editTopic = document.getElementById('editTopic');
        editTopic.addEventListener('hidden.bs.modal', () => resetModalTopic('edit'));
    })
    function editTopic(topicId,topicName){
            const editTopicModal = document.getElementById('editTopic');
            const editForm = editTopicModal.querySelector('form');
            editForm.action = "{{ route('topic.edit', ['id' => ':topicId']) }}".replace(':topicId', topicId);
            const editName = document.getElementById('editTopicName');
            editName.value = topicName;
    }
    function resetModalTopic(modalType) {
        document.getElementById(`${modalType}TopicName`).value = '';
    }
    setTimeout(function() {
    var element = document.getElementById('errorName');
    if (element) {
        element.style.display = 'none';
    }
    }, 5000);
</script>
@endsection
