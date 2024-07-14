<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserStats;
use App\Models\UserStatsDetails;
use App\Models\Tests;
use DateTime;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ApiUserStatsController extends Controller
{
    public function create(Request $request)
    {
        $formData = $request->all();
        $data = $formData['formData'];

        $listUserStats = UserStats::where("test_id", $data['testId'])->where("user_id", $data['userId'])->first();

        if (empty($listUserStats)) {
            $test = Tests::find($data['testId']);
            $test->done_count = $test->done_count +1;
            $test->save();
            $userStats = new UserStats();
            $userStats->count = 1;
            $userStats->test_id = $data['testId'];
            $userStats->user_id = $data['userId'];
            $userStats->save();
        } else {
            $test = Tests::find($data['testId']);
            $test->done_count = $test->done_count +1;
            $test->save();
            $userStats = UserStats::where("test_id", $data['testId'])->where("user_id", $data['userId'])->first();
            $userStats->count = $userStats->count + 1;

            $userStats->test_id = $data['testId'];
            $userStats->user_id = $data['userId'];
            $userStats->save();
        }


        $userStatsDetail = new UserStatsDetails();
        $userStatsDetail->question_right = $data['questionRight'];
        $userStatsDetail->question_wrong = (int)$data['totalQuestion'] - (int)$data['questionRight'];
        $userStatsDetail->total_time = $data['totalTimer'] / 1000;
        $userStatsDetail->finished_at = date('Y-m-d H:i:s');
        $userStatsDetail->user_stats_id = $userStats->id;
        $userStatsDetail->save();
        return response()->json([
            'success' => true,
            'message' => "Completed the test",


        ]);
    }

    public function indexUserStatsToUser(Request $request)
    {
        $id = $request->query('userId');
        $currentPage = $request->query('currentPage');
        $itemsPerPage = $request->query('itemsPerPage');

        $query = UserStats::where('user_id', $id);

        $total = 0;
        $userStatsList = $query->get();

        $boxUserStats = [];

        foreach ($userStatsList as $userStats) {
            $test = $userStats->test()->withTrashed()->first();
            $userStatsDetailsList = $userStats->userStatsDetails;
            $total += $userStatsDetailsList->count();
            foreach ($userStatsDetailsList as $userStatsDetail) {
                $finishedAt = Carbon::parse($userStatsDetail->finished_at)->format('H:i:s d-m-Y');

                $boxUserStats[] = [
                    'testName' => $test->name,
                    'questionRight' => $userStatsDetail->question_right,
                    'questionWrong' => $userStatsDetail->question_wrong,
                    'totalQuestion' => $userStatsDetail->question_right + $userStatsDetail->question_wrong,
                    'totalTime' => $userStatsDetail->total_time,
                    'finished' => $finishedAt,
                ];
            }
        }
        usort($boxUserStats, function ($a, $b) {
            return strtotime($b['finished']) - strtotime($a['finished']);
        });
        $startIndex = ($currentPage - 1) * $itemsPerPage;

        $pagedData = array_slice($boxUserStats, $startIndex, $itemsPerPage);

        return response()->json([
            'success' => true,
            'data' => $pagedData,
            'totalPages' => ceil($total / $itemsPerPage),
        ]);
    }
    public function indexUserStatsToExam(Request $request)
    {
        $id = $request->query('examId');
        $currentPage = $request->query('currentPage');
        $itemsPerPage = $request->query('itemsPerPage');

        $query = UserStats::where('test_id', $id);

        $total = 0;
        $userStatsList = $query->get();

        $boxUserStats = [];

        foreach ($userStatsList as $userStats) {
            $test = $userStats->user;
            $userStatsDetailsList = $userStats->userStatsDetails;
            $total += $userStatsDetailsList->count();
            foreach ($userStatsDetailsList as $userStatsDetail) {
                $finishedAt = Carbon::parse($userStatsDetail->finished_at)->format('H:i:s d-m-Y');

                $boxUserStats[] = [
                    'displayName' => $test->displayname,
                    'questionRight' => $userStatsDetail->question_right,
                    'questionWrong' => $userStatsDetail->question_wrong,
                    'totalQuestion' => $userStatsDetail->question_right + $userStatsDetail->question_wrong,
                    'totalTime' => $userStatsDetail->total_time,
                    'finished' => $finishedAt,
                ];
            }
        }
        usort($boxUserStats, function ($a, $b) {
            return strtotime($b['finished']) - strtotime($a['finished']);
        });
        $startIndex = ($currentPage - 1) * $itemsPerPage;

        $pagedData = array_slice($boxUserStats, $startIndex, $itemsPerPage);

        return response()->json([
            'success' => true,
            'data' => $pagedData,
            'totalPages' => ceil($total / $itemsPerPage),
        ]);
    }
}
