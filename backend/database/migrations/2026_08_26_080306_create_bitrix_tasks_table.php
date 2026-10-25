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
        Schema::create('bitrix_tasks', function (Blueprint $table) {
            $table->id();
            $table->string('bitrix_id')->unique();
            $table->foreignId('project_id')->nullable()->constrained('bitrix_projects')->cascadeOnDelete();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('status')->nullable();
            $table->string('created_by')->nullable(); // bitrix_id of user
            $table->string('responsible_id')->nullable(); // bitrix_id of user
            $table->dateTime('deadline')->nullable();
            $table->json('raw_data')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bitrix_tasks');
    }
};
