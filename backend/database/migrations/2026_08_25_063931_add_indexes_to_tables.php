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
        Schema::table('projects', function (Blueprint $table) {
            $table->index('created_at');
        });
        Schema::table('products', function (Blueprint $table) {
            $table->index('created_at');
            $table->index('sort_order');
            $table->index('is_published');
        });
        Schema::table('articles', function (Blueprint $table) {
            $table->index('created_at');
            $table->index('is_published');
        });
        Schema::table('banners', function (Blueprint $table) {
            $table->index('created_at');
            $table->index('sort_order');
        });
        Schema::table('reviews', function (Blueprint $table) {
            $table->index('created_at');
        });
        Schema::table('services', function (Blueprint $table) {
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropIndex(['created_at']);
        });
        Schema::table('products', function (Blueprint $table) {
            $table->dropIndex(['created_at']);
            $table->dropIndex(['sort_order']);
            $table->dropIndex(['is_published']);
        });
        Schema::table('articles', function (Blueprint $table) {
            $table->dropIndex(['created_at']);
            $table->dropIndex(['is_published']);
        });
        Schema::table('banners', function (Blueprint $table) {
            $table->dropIndex(['created_at']);
            $table->dropIndex(['sort_order']);
        });
        Schema::table('reviews', function (Blueprint $table) {
            $table->dropIndex(['created_at']);
        });
        Schema::table('services', function (Blueprint $table) {
            $table->dropIndex(['created_at']);
        });
    }
};
