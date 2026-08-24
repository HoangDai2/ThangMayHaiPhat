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
        Schema::create('projects', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('location')->nullable();
            $table->string('category')->default('Gia đình');
            $table->string('image')->nullable();
            $table->string('specs')->nullable();
            $table->text('description')->nullable();
            $table->integer('floors')->default(1);
            $table->string('capacity')->nullable();
            $table->string('speed')->nullable();
            $table->string('brand')->nullable();
            $table->string('completion_date')->nullable();
            $table->string('warranty')->nullable();
            $table->json('features')->nullable();
            $table->json('gallery')->nullable();
            $table->json('testimonial')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
