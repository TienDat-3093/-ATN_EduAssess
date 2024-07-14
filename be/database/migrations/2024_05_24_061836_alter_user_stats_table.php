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
        Schema::table('user_stats', function (Blueprint $table) {
            $table->foreignId('test_id')->constrained(
                table: 'tests', indexName: 'user_stat_test_id'
            );
            $table->foreignId('user_id')->constrained(
                table: 'users', indexName: 'user_stat_user_id'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_stats', function (Blueprint $table) {
            $table->dropForeign(['test_id','user_id']);
            $table->dropColumn(['test_id','user_id']);
        });
    }
};
