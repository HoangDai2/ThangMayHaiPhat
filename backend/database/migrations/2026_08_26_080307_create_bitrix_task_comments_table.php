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
        Schema::create('bitrix_task_comments', function (Blueprint $table) {
            $table->id();
            $table->string('bitrix_id')->unique();
            $table->foreignId('task_id')->constrained('bitrix_tasks')->cascadeOnDelete();
            $table->string('author_id')->nullable(); // bitrix user id
            $table->text('message')->nullable();
            $table->json('raw_data')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bitrix_task_comments');
    }
};
