@extends('layout')

@section('content')

<div class="row">
    <div class="col-lg-6 d-flex align-items-stretch">
        <div class="card w-100">
            <div class="card-body">
                <div class="d-sm-flex d-block align-items-center justify-content-between mb-9">
                    <div class="mb-3 mb-sm-0">
                        <h5 class="card-title fw-semibold">New Questions Added Statistics</h5>
                    </div>
                </div>
                <select id="monthlyYear_question" aria-label="Default select example">
                </select>
                <select id="weeklyMonth_question" aria-label="Default select example">
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
                <canvas id="monthlyChart_question"></canvas>
                <canvas id="weeklyChart_question"></canvas>
            </div>
        </div>
    </div>
    <div class="col-lg-6 d-flex align-items-stretch">
        <div class="card w-100">
            <div class="card-body">
                <div class="d-sm-flex d-block align-items-center justify-content-between mb-9">
                    <div class="mb-3 mb-sm-0">
                        <h5 class="card-title fw-semibold">New Accounts Created Statistics</h5>
                    </div>
                </div>
                <select id="monthlyYear_user" aria-label="Default select example">
                </select>
                <canvas id="monthlyChart_user"></canvas>
                <select id="weeklyMonth_user" aria-label="Default select example">
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
                <canvas id="weeklyChart_user"></canvas>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-lg-4 d-flex align-items-stretch">
        <div class="card w-100">
            <div class="card-body p-4">
                <div class="mb-4">
                    <h5 class="card-title fw-semibold">Most Questions Added</h5>
                </div>
                <div class="table-responsive">
                    <table id="mostAddedQuestion" class="table text-nowrap mb-0 align-middle">
                        <thead class="text-dark fs-4">
                            <tr>
                                <th class="border-bottom-0">
                                    <h6 class="fw-semibold mb-0">Admin</h6>
                                </th>
                                <th class="border-bottom-0">
                                    <h6 class="fw-semibold mb-0">Question Added</h6>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-8 d-flex align-items-stretch">
        <div class="card w-100">
            <div class="card-body p-4">
                <h5 class="card-title fw-semibold mb-4">Most Engaged Tests</h5>
                <div class="table-responsive">
                    <table id="mostEngagedTests" class="table text-nowrap mb-0 align-middle">
                        <thead class="text-dark fs-4">
                            <tr>
                                <th class="border-bottom-0">
                                    <h6 class="fw-semibold mb-0">Author</h6>
                                </th>
                                <th class="border-bottom-0">
                                    <h6 class="fw-semibold mb-0">Name</h6>
                                </th>
                                <th class="border-bottom-0">
                                    <h6 class="fw-semibold mb-0">Tags</h6>
                                </th>
                                <th class="border-bottom-0">
                                    <h6 class="fw-semibold mb-0">Done Count</h6>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- <div class="row">
    <div class="col-sm-6 col-xl-3">
        <div class="card overflow-hidden rounded-2">
            <div class="position-relative">
                <a href="javascript:void(0)"><img src="../assets/images/products/s4.jpg" class="card-img-top rounded-0" alt="..."></a>
                <a href="javascript:void(0)" class="bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart"><i class="ti ti-basket fs-4"></i></a>
            </div>
            <div class="card-body pt-3 p-4">
                <h6 class="fw-semibold fs-4">Boat Headphone</h6>
                <div class="d-flex align-items-center justify-content-between">
                    <h6 class="fw-semibold fs-4 mb-0">$50 <span class="ms-2 fw-normal text-muted fs-3"><del>$65</del></span></h6>
                    <ul class="list-unstyled d-flex align-items-center mb-0">
                        <li><a class="me-1" href="javascript:void(0)"><i class="ti ti-star text-warning"></i></a></li>
                        <li><a class="me-1" href="javascript:void(0)"><i class="ti ti-star text-warning"></i></a></li>
                        <li><a class="me-1" href="javascript:void(0)"><i class="ti ti-star text-warning"></i></a></li>
                        <li><a class="me-1" href="javascript:void(0)"><i class="ti ti-star text-warning"></i></a></li>
                        <li><a class="" href="javascript:void(0)"><i class="ti ti-star text-warning"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-sm-6 col-xl-3">
        <div class="card overflow-hidden rounded-2">
            <div class="position-relative">
                <a href="javascript:void(0)"><img src="../assets/images/products/s5.jpg" class="card-img-top rounded-0" alt="..."></a>
                <a href="javascript:void(0)" class="bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart"><i class="ti ti-basket fs-4"></i></a>
            </div>
            <div class="card-body pt-3 p-4">
                <h6 class="fw-semibold fs-4">MacBook Air Pro</h6>
                <div class="d-flex align-items-center justify-content-between">
                    <h6 class="fw-semibold fs-4 mb-0">$650 <span class="ms-2 fw-normal text-muted fs-3"><del>$900</del></span></h6>
                    <ul class="list-unstyled d-flex align-items-center mb-0">
                        <li><a class="me-1" href="javascript:void(0)"><i class="ti ti-star text-warning"></i></a></li>
                        <li><a class="me-1" href="javascript:void(0)"><i class="ti ti-star text-warning"></i></a></li>
                        <li><a class="me-1" href="javascript:void(0)"><i class="ti ti-star text-warning"></i></a></li>
                        <li><a class="me-1" href="javascript:void(0)"><i class="ti ti-star text-warning"></i></a></li>
                        <li><a class="" href="javascript:void(0)"><i class="ti ti-star text-warning"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-sm-6 col-xl-3">
        <div class="card overflow-hidden rounded-2">
            <div class="position-relative">
                <a href="javascript:void(0)"><img src="../assets/images/products/s7.jpg" class="card-img-top rounded-0" alt="..."></a>
                <a href="javascript:void(0)" class="bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart"><i class="ti ti-basket fs-4"></i></a>
            </div>
            <div class="card-body pt-3 p-4">
                <h6 class="fw-semibold fs-4">Red Valvet Dress</h6>
                <div class="d-flex align-items-center justify-content-between">
                    <h6 class="fw-semibold fs-4 mb-0">$150 <span class="ms-2 fw-normal text-muted fs-3"><del>$200</del></span></h6>
                    <ul class="list-unstyled d-flex align-items-center mb-0">
                        <li><a class="me-1" href="javascript:void(0)"><i class="ti ti-star text-warning"></i></a></li>
                        <li><a class="me-1" href="javascript:void(0)"><i class="ti ti-star text-warning"></i></a></li>
                        <li><a class="me-1" href="javascript:void(0)"><i class="ti ti-star text-warning"></i></a></li>
                        <li><a class="me-1" href="javascript:void(0)"><i class="ti ti-star text-warning"></i></a></li>
                        <li><a class="" href="javascript:void(0)"><i class="ti ti-star text-warning"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-sm-6 col-xl-3">
        <div class="card overflow-hidden rounded-2">
            <div class="position-relative">
                <a href="javascript:void(0)"><img src="../assets/images/products/s11.jpg" class="card-img-top rounded-0" alt="..."></a>
                <a href="javascript:void(0)" class="bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart"><i class="ti ti-basket fs-4"></i></a>
            </div>
            <div class="card-body pt-3 p-4">
                <h6 class="fw-semibold fs-4">Cute Soft Teddybear</h6>
                <div class="d-flex align-items-center justify-content-between">
                    <h6 class="fw-semibold fs-4 mb-0">$285 <span class="ms-2 fw-normal text-muted fs-3"><del>$345</del></span></h6>
                    <ul class="list-unstyled d-flex align-items-center mb-0">
                        <li><a class="me-1" href="javascript:void(0)"><i class="ti ti-star text-warning"></i></a></li>
                        <li><a class="me-1" href="javascript:void(0)"><i class="ti ti-star text-warning"></i></a></li>
                        <li><a class="me-1" href="javascript:void(0)"><i class="ti ti-star text-warning"></i></a></li>
                        <li><a class="me-1" href="javascript:void(0)"><i class="ti ti-star text-warning"></i></a></li>
                        <li><a class="" href="javascript:void(0)"><i class="ti ti-star text-warning"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div> -->
<script src="{{ asset('assets/jquery-3.7.1.min.js') }}"></script>
<script>
    var csrfToken = '{{ csrf_token() }}';
    $(document).ready(function() {

        // Event listener for select element change
        $('#monthlyYear_question').change(function() {
            var selectedYear = $('#monthlyYear_question').val();
            var selectedMonth = $('#weeklyMonth_question').val();
            fetchMonthlyDataQuestion(selectedYear,selectedMonth);
        });
        $('#weeklyMonth_question').change(function() {
            var selectedYear = $('#monthlyYear_question').val();
            var selectedMonth = $('#weeklyMonth_question').val();
            fetchMonthlyDataQuestion(selectedYear,selectedMonth);
        });
        $('#monthlyYear_user').change(function() {
            var selectedYear = $('#monthlyYear_user').val();
            var selectedMonth = $('#weeklyMonth_user').val();
            fetchMonthlyDataUser(selectedYear,selectedMonth);
        });
        $('#weeklyMonth_user').change(function() {
            var selectedYear = $('#monthlyYear_user').val();
            var selectedMonth = $('#weeklyMonth_user').val();
            fetchMonthlyDataUser(selectedYear,selectedMonth);
        });

        // Fetch monthly report for the current year on website start up
        var defaultYear = new Date().getFullYear();
        fetchMonthlyDataQuestion(defaultYear,1);
        fetchMonthlyDataUser(defaultYear,1);
        $.ajax({
            url: 'getYears/',
            type: "get",
            headers: {
                    'X-CSRF-TOKEN': csrfToken,
                },
            success: function(response) {
                var years_questions = response.years_questions;
                var selectElement = $('#monthlyYear_question');
                selectElement.empty();
                years_questions.forEach(function(year) {
                    var option = $('<option></option>').attr('value', year).text(year);
                    selectElement.append(option);
                });
                var years_users = response.years_users;
                selectElement = $('#monthlyYear_user');
                selectElement.empty();
                years_users.forEach(function(year) {
                    var option = $('<option></option>').attr('value', year).text(year);
                    selectElement.append(option);
                });
            },
            error: function(xhr, status, error) {
            console.error(xhr.responseText);
        }
        });
        getMostQuestionsAdded();
        getBestTest();
    });

    function getMostQuestionsAdded(){
        $.ajax({
            url: 'mostQuestionsAdded/',
            type: "get",
            headers: {
                    'X-CSRF-TOKEN': csrfToken,
                },
            success: function(response) {
                var selectElement = $('#mostAddedQuestion');
                for (var key in response) {
                var row = `<tr>
                                <td class="border-bottom-0">
                                    <h6 class="fw-semibold mb-0">${key}</h6>
                                </td>
                                <td class="border-bottom-0">
                                    <h6 class="fw-semibold mb-1" >${response[key]}</h6>
                                </td>
                            </tr>`
                selectElement.find('tbody').append(row);
                };
            },
            error: function(xhr, status, error) {
            console.error(xhr.responseText);
        }
        });
    }
    
    // Function to strip HTML tags
    function stripHTML(html) {
        var tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }

    // Function to truncate text to a specified length and add ellipsis
    function truncate(text, length) {
        if (text.length > length) {
            return text.substring(0, length) + "...";
        }
        return text;
    }
    function getBestTest(){
        $.ajax({
            url: 'mostEngagedTests/',
            type: "get",
            headers: {
                    'X-CSRF-TOKEN': csrfToken,
                },
            success: function(response) {
                var selectElement = $('#mostEngagedTests');
                response.test_data.forEach(function(test) {
                var tagSpans = test.tag_data.map(function(tag) {
                    return `<span class="col-lg-6 m-1 d-flex align-items-stretch justify-content-center badge bg-primary rounded-3 fw-semibold">${tag}</span>`;
                }).join('');
                var row = `<tr>
                                <td class="border-bottom-0">
                                    <h6 class="fw-semibold mb-1">${test.user_id}</h6>
                                </td>
                                <td class="border-bottom-0">
                                    <p class="fw-semibold mb-1" title="${stripHTML(test.name)}">${truncate(stripHTML(test.name), 25)}</p>
                                </td>
                                <td class="border-bottom-0">
                                    <div class="row">
                                        ${tagSpans}
                                    </div>
                                </td>
                                <td class="border-bottom-0">
                                    <h6 class="fw-semibold mb-0 fs-4">${test.done_count}</h6>
                                </td>
                            </tr>`
                selectElement.find('tbody').append(row);
                });
            },
            error: function(xhr, status, error) {
            console.error(xhr.responseText);
        }
        });
    }
    function initializeMonthlyChart(xValues, yValues, year, chart_name, value_name) {
        var barColors = ["rgba(93, 135, 255, 1.0)", "rgba(73, 190, 255, 1.0)", "rgba(93, 135, 255, 1.0)", "rgba(73, 190, 255, 1.0)", "rgba(93, 135, 255, 1.0)", "rgba(73, 190, 255, 1.0)", "rgba(93, 135, 255, 1.0)", "rgba(73, 190, 255, 1.0)", "rgba(93, 135, 255, 1.0)", "rgba(73, 190, 255, 1.0)", "rgba(93, 135, 255, 1.0)", "rgba(73, 190, 255, 1.0)"];
        var existingCanvas = document.querySelector('canvas[id="monthlyChart_'+chart_name+'"]');
        if (existingCanvas) {
            var parentElement = existingCanvas.parentElement;
            var newCanvas = document.createElement('canvas');
            newCanvas.setAttribute('style', 'max-width:900px;margin:auto;');
            newCanvas.id = 'monthlyChart_'+chart_name+'';
            existingCanvas.remove();
            parentElement.append(newCanvas);
        }
        new Chart("monthlyChart_"+ chart_name, {
            type: "bar",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    borderRadius: 5,
                    data: yValues
                }]
            },
            options: {
                legend: { display: false },
                scales: {
                    yAxes: [{
                        display: true,
                        ticks: {
                            beginAtZero: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: value_name
                        },
                    }]
                },
                title: {
                    display: true,
                    text: value_name+' every month in ' + year
                }
            }
        });
        }
    function initializeWeeklyChart(xValues, yValues, month, chart_name, value_name) {
        var barColors = ["rgba(93, 135, 255, 1.0)", "rgba(73, 190, 255, 1.0)", "rgba(93, 135, 255, 1.0)", "rgba(73, 190, 255, 1.0)", "rgba(93, 135, 255, 1.0)", "rgba(73, 190, 255, 1.0)", "rgba(93, 135, 255, 1.0)", "rgba(73, 190, 255, 1.0)", "rgba(93, 135, 255, 1.0)", "rgba(73, 190, 255, 1.0)", "rgba(93, 135, 255, 1.0)", "rgba(73, 190, 255, 1.0)"];
        var existingCanvas = document.querySelector('canvas[id="weeklyChart_'+chart_name+'"]');
        if (existingCanvas) {
            var parentElement = existingCanvas.parentElement;
            var newCanvas = document.createElement('canvas');
            newCanvas.setAttribute('style', 'max-width:900px;margin:auto;');
            newCanvas.id = 'weeklyChart_'+chart_name+'';
            existingCanvas.remove();
            parentElement.append(newCanvas);
        }
        new Chart("weeklyChart_"+chart_name, {
            type: "bar",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    borderRadius: 5,
                    data: yValues
                }]
            },
            options: {
                legend: { display: false },
                scales: {
                    yAxes: [{
                        display: true,
                        ticks: {
                            beginAtZero: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: value_name
                        },
                    }]
                },
                title: {
                    display: true,
                    text: value_name+' every week in '+month,
                }
            }
        });
        }
    function fetchMonthlyDataQuestion(input_year,input_month) {
        $.ajax({
            url: 'getMonthlyQuestions/' + input_year + '/' + input_month,
            type: "POST",
            headers: {
                'X-CSRF-TOKEN': csrfToken,
            },
            success: function(response) {
                //Get x,y for each month
                var xValuesMonthly = response.monthly_data.map(function(item) {
                    return item.month;
                });

                var yValuesMonthly = response.monthly_data.map(function(item) {
                    return item.count;
                });
                //Get x,y for each week
                var xValuesWeekly = response.weekly_data.map(function(item) {
                    return "Week "+item.week;
                });

                var yValuesWeekly = response.weekly_data.map(function(item) {
                    return item.count;
                });
                initializeMonthlyChart(xValuesMonthly, yValuesMonthly, response.year,"question","Added questions");
                var selectedMonthText = $('#weeklyMonth_question option:selected').text();
                initializeWeeklyChart(xValuesWeekly, yValuesWeekly, selectedMonthText,"question","Added questions");
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    }
    function fetchMonthlyDataUser(input_year,input_month) {
        $.ajax({
            url: 'getMonthlyUsers/' + input_year + '/' + input_month,
            type: "POST",
            headers: {
                'X-CSRF-TOKEN': csrfToken,
            },
            success: function(response) {
                //Get x,y for each month
                var xValuesMonthly = response.monthly_data.map(function(item) {
                    return item.month;
                });

                var yValuesMonthly = response.monthly_data.map(function(item) {
                    return item.count;
                });
                //Get x,y for each week
                var xValuesWeekly = response.weekly_data.map(function(item) {
                    return "Week "+item.week;
                });

                var yValuesWeekly = response.weekly_data.map(function(item) {
                    return item.count;
                });
                initializeMonthlyChart(xValuesMonthly, yValuesMonthly, response.year,"user","New users");
                var selectedMonthText = $('#weeklyMonth_user option:selected').text();
                initializeWeeklyChart(xValuesWeekly, yValuesWeekly, selectedMonthText,"user","New users");
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    }
</script>
@endsection
