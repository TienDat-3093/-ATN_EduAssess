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
        Schema::table('answer_users', function (Blueprint $table) {
            $table->foreignId('question_user_id')->constrained(
                table: 'question_users', indexName: 'answer_user_question_user_id'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('answer_users', function (Blueprint $table) {
            $table->dropForeign(['question_user_id']);
            $table->dropColumn(['question_user_id']);
        });
    }
};
