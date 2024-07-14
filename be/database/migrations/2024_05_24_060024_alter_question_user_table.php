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
        Schema::table('question_users', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained(
                table: 'users', indexName: 'question_user_user_id'
            );
            $table->foreignId('question_type_id')->constrained(
                table: 'question_types', indexName: 'question_user_question_type'
            );
            $table->foreignId('level_id')->constrained(
                table: 'levels', indexName: 'question_user_level'
            );
            $table->foreignId('topic_id')->constrained(
                table: 'topics', indexName: 'question_user_topic'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('question_users', function (Blueprint $table) {
            $table->dropForeign(['question_type_id','level_id','topic_id']);
            $table->dropColumn(['question_type_id','level_id','topic_id']);
        });
    }
};
