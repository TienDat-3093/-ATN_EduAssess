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
        Schema::create('tests', function (Blueprint $table) {
            $table->id();
            $table->string('question_admin')->nullable();
            $table->string('question_user')->nullable();
            $table->string('name');
            $table->string('test_img')->nullable();
            $table->string('password')->nullable();
            $table->string('topic_data');
            $table->string('tag_data');
            $table->integer('done_count');
            $table->boolean('privacy');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tests');
    }
};
