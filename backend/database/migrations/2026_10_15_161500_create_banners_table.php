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
        if (!Schema::hasTable('banners')) {
            Schema::create('banners', function (Blueprint $table) {
                $table->uuid('id')->primary();
                $table->string('title')->default('');
                $table->string('subtitle')->nullable();
                $table->text('description')->nullable();
                $table->string('image_url', 1000)->nullable();
                $table->string('link_url', 500)->nullable();
                $table->string('position')->default('hero');
                $table->integer('sort_order')->default(0);
                $table->boolean('is_active')->default(true);
                $table->string('media_type')->default('image');
                $table->string('video_url', 1000)->nullable();
                $table->string('primary_button_text')->nullable();
                $table->string('primary_button_link', 500)->nullable();
                $table->string('secondary_button_text')->nullable();
                $table->string('secondary_button_link', 500)->nullable();
                $table->string('template_type')->nullable();
                $table->string('highlight_tag')->nullable();
                $table->json('features')->nullable();
                $table->json('stats')->nullable();
                $table->timestamps();

                $table->index('is_active');
                $table->index('sort_order');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('banners');
    }
};
