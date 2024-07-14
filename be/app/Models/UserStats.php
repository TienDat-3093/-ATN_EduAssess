<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserStats extends Model
{
    use HasFactory;
    protected $table = 'user_stats';

    public function test()
    {
        return $this->belongsTo(Tests::class, 'test_id');
    }
    public function user()
    {
        return $this->belongsTo(Users::class, 'user_id');
    }
    public function userStatsDetails()
    {
        return $this->hasMany(UserStatsDetails::class, 'user_stats_id');
    }
}
