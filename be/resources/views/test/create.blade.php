@extends('layout')
<style>
    .fixed-corner {
        position: fixed;
        top: 20px; /* Adjust top position as needed */
        right: 20px; /* Adjust right position as needed */
        z-index: 1000; /* Adjust z-index if necessary to ensure it appears above other content */
        padding: 10px;
        background-color: #f0f0f0;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
</style>
@section('content')
<form action="{{route('test.createHandle')}}" method="POST" id="createTest" enctype="multipart/form-data">
    @csrf
<div class="col-lg-13 d-flex align-items-stretch">
    <div class="card w-100">
        <div class="card-body p-4">
            <h5 class="card-title fw-semibold mb-4">Create Test</h5>
            <div style="margin:10px;">
            <font id="error">
                @error('name')
                <font style="vertical-align: inherit;color:red">{{ $message }}</font>
                @enderror
            </font>
            </div>
            <div class="col mb-3">
                    <label class="form-label">Name</label>
                    <input type="text" name="name" class="form-control" placeholder="Enter Name"><br>
                    <label class="form-label">Test Banner</label><br>
                    <label class="btn btn-outline-secondary mb-0" for="test_img">
                        <span class="ti ti-upload"></span>
                    </label>
                    <input type="file" name="test_img" class="form-control d-none" id="test_img" onchange="previewTest()">
                    <div id="test_imgPreview" name="test_imgPreview" class="mt-2"></div>
                    <br>
                <button type="submit" class="btn btn-primary">Create Test</button>
            </div>
        </div>
    </div>
</div>
<div class="col-lg-13 d-flex align-items-stretch">
    <div class="card w-100">
        <div class="card-body p-4">
            <h5 class="card-title fw-semibold mb-4">Select Tags</h5>
            <div>
            <font id="error">
                @error('tag_data')
                <font style="vertical-align: inherit;color:red">{{ $message }}</font>
                @enderror
            </font>
            </div>
            @foreach ($listTags as $tag)
            <div style="display:inline-block; margin:5px;">
                <input class="btn-check" id="tag-{{ $tag->id }}" autocomplete="off" type="checkbox" name="tag_data[]" value="{{ $tag->id }}" id="tag-{{ $tag->id }}">
                <label style="border-radius:25px;" class="btn btn-secondary" for="tag-{{ $tag->id }}" class="tag-label">{{ $tag->name }}</label>
            </div>
            @endforeach
        </div>
    </div>
</div>
<div id="question_admin">
</div>
</form>
<div class="col-lg-13 d-flex align-items-stretch">
    <div class="card w-100">
        <div class="card-body p-4">
            <h5 class="card-title fw-semibold mb-4">Automatic Questions Selector</h5>
            <div>
            <font id="error">
                @error('question_admin')
                <font style="vertical-align: inherit;color:red">{{ $message }}</font>
                @enderror
            </font>
            </div>
            <div id="form-row" class="row">
                <div class="col-md-4 mb-3 form-group">
                <label class="form-label">
                    Level
                </label>
                <select id="level" name="levels_id[]" class="form-select level" aria-label="Default select example">
                    <option value="0">All</option>
                    @foreach ($listLevels as $level)
                        <option value="{{ $level->id }}">{{ $level->name }}</option>
                    @endforeach
                </select>
                <label class="form-label">
                    Topic
                </label>
                <select id="topic" name="topics_id[]" class="form-select topic" aria-label="Default select example">
                    <option value="0">All</option>
                    @foreach ($listTopics as $topic)
                        <option value="{{ $topic->id }}">{{ $topic->name }}</option>
                    @endforeach
                </select>
                <label class="form-label">
                    Amount
                </label>
                <input id="amount_question" class="form-control amount_question" type="number" name="amount_question[]"/>
                </div>
                <div class="col-md-4 d-flex justify-content-center align-items-center" style="min-height:202px;">
                    <button id="add-more" class="btn rounded-pill btn-icon"><span class="ti ti-circle-plus" style="font-size: 40px;"></span></button>
                </div>
            </div>
            
            <br>
            <button id="getQuestionButton" type="button" class="btn btn-primary">
                Get questions
            </button>
            <button class="btn btn-outline-secondary" onclick="resetFormGroup()">
                Reset
            </button>
        </div>
    </div>
</div>
<div class="col-lg-13 d-flex align-items-stretch">
    <div class="card w-100">
        <div class="card-body p-4">
            <h5 class="card-title fw-semibold mb-4">Selected Questions</h5>
            <div class="table-responsive">
            <table id="listSelectedQuestions" class="table text-nowrap mb-0 align-middle">
                    <thead class="text-dark fs-4">
                        <tr>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Id</h6>
                            </th>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Text</h6>
                            </th>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Image</h6>
                            </th>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Level</h6>
                            </th>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Topic</h6>
                            </th>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Type</h6>
                            </th>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Function</h6>
                            </th>
                        </tr>
                    </thead>
                    
                    <tbody>
                    @include('test/create_results')
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('assets/jquery-3.7.1.min.js') }}"></script>
    <script>
        var $j = jQuery.noConflict();
        const levels = <?php echo json_encode($listLevels); ?>;
        const topics = <?php echo json_encode($listTopics); ?>;
        function generateOptions(data) {
            return data.map(item => `<option value="${item.id}">${item.name}</option>`).join('');
        }
        function resetFormGroup() {
            $('#form-row .form-group:not(:first)').remove();
        }
        function addFormGroup() {
            const levelOptions = generateOptions(levels);
            const topicOptions = generateOptions(topics);

            const formGroup = `
                <div class="col-md-4 mb-3 form-group">
                    <label class="form-label">Level</label>
                    <select name="levels_id[]" class="form-select level" aria-label="Default select example">
                        <option value="0">All</option>
                        ${levelOptions}
                    </select>
                    <label class="form-label">Topic</label>
                    <select name="topics_id[]" class="form-select topic" aria-label="Default select example">
                        <option value="0">All</option>
                        ${topicOptions}
                    </select>
                    <label class="form-label">Amount</label>
                    <input class="form-control amount_question" type="number" name="amount_question[]"/>
                </div>
            `;
            $("#form-row div:last").before(formGroup);
        }
        $j(document).ready(function() {
            $j('#getQuestionButton').on('click', function() {
                getQuestion();
            });

            $("#add-more").click(function () {
                addFormGroup();
            });
        });
        function removeQuestion(button) {
        var tr = $j(button).closest('tr');
        tr.remove();
            let selected_questions = [];
            $j('input[name="selected_questions[]"]').each(function() {
                selected_questions.push($j(this).val());
            });
            $j.ajax({
                url: "{{ route('test.getQuestion') }}",
                type: 'POST',
                data: {
                    selected_questions: selected_questions,
                    _token: '{{ csrf_token() }}'
                },
                success: function(data) {
                    $j('#listSelectedQuestions tbody').html(data);
                    var hiddenInputs = $j('#listSelectedQuestions tbody').find('input[type="hidden"]');
                    $j('#question_admin').empty();
                    hiddenInputs.each(function(index, element) {
                        var hiddenInput = document.createElement('input'); // Create a new hidden input element
                        hiddenInput.type = 'hidden';
                        hiddenInput.name = 'question_admin[]'; // Set the name attribute to question_admin[]
                        hiddenInput.value = $j(element).val();
                        $j('#question_admin').append(hiddenInput);
                    });
                },
                error: function(xhr) {
                    console.error(xhr.responseText);
                }
            });
        }
        function previewTest() {
        const fileInput = document.getElementById(`test_img`);
        const fileUser = document.getElementById(`test_imgPreview`);
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
        function getQuestion() {
            let topic_ids = [];
            let level_ids = [];
            let amount_questions = [];
            let selected_questions = [];

            let allValid = true;

            $j('.form-group').each(function() {
                let topic_id = $j(this).find('.topic').val();
                let level_id = $j(this).find('.level').val();
                let amount_question = $j(this).find('.amount_question').val();

                if (amount_question === null || amount_question.trim() === '' || amount_question == 0) {
                    allValid = false;
                    return false; // Exit the .each() loop early
                }

                topic_ids.push(topic_id);
                level_ids.push(level_id);
                amount_questions.push(amount_question);
            });
            if (!allValid) {
                alert('Amount questions can not be 0 or empty.');
                return;
            }
            $j('input[type="hidden"][name="selected_questions[]"]').each(function() {
                selected_questions.push($j(this).val());
            });
            console.log(topic_ids,level_ids,amount_questions);
            $j.ajax({
                url: "{{ route('test.getQuestion') }}",
                type: 'POST',
                data: {
                    topic_id: topic_ids,
                    level_id: level_ids,
                    selected_questions: selected_questions,
                    amount_question: amount_questions,
                    _token: '{{ csrf_token() }}'
                },
                success: function(data) {
                    $j('#listSelectedQuestions tbody').html(data);
                    var hiddenInputs = $j('#listSelectedQuestions tbody').find('input[type="hidden"]');
                    $j('#question_admin').empty();
                    hiddenInputs.each(function(index, element) {
                        var hiddenInput = document.createElement('input'); // Create a new hidden input element
                        hiddenInput.type = 'hidden';
                        hiddenInput.name = 'question_admin[]'; // Set the name attribute to question_admin[]
                        hiddenInput.value = $j(element).val();
                        $j('#question_admin').append(hiddenInput);
                    });
                },
                error: function(xhr) {
                    console.error(xhr.responseText);
                }
            });
        };
        document.addEventListener("DOMContentLoaded", function() {
            setTimeout(function() {
                var elements = document.querySelectorAll('#error');
                if (elements) {
                    elements.forEach(function(element) {
                        element.style.display = 'none';
                    });
                }
            }, 5000);
        });
    </script>
@endsection
