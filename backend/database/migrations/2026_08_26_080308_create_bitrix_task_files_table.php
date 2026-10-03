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
        Schema::create('bitrix_task_files', function (Blueprint $table) {
            $table->id();
            $table->string('bitrix_id')->unique(); // bitrix file id
            $table->foreignId('task_id')->nullable()->constrained('bitrix_tasks')->cascadeOnDelete();
            $table->foreignId('comment_id')->nullable()->constrained('bitrix_task_comments')->cascadeOnDelete();
            $table->string('file_name')->nullable();
            $table->string('file_url')->nullable();
            $table->string('local_path')->nullable(); // path in our storage
            $table->string('file_type')->nullable();
            $table->integer('file_size')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bitrix_task_files');
    }
};
