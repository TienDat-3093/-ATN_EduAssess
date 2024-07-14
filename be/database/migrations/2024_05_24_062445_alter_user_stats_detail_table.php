<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('user_stats_details', function (Blueprint $table) {
            $table->foreignId('user_stats_id')->constrained(
                table: 'user_stats', indexName: 'user_stats_detail_user_stats_id'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_stats_details', function (Blueprint $table) {
            $table->dropForeign(['user_stats_id']);
            $table->dropColumn(['user_stats_id']);
        });
    }
};
