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
        Schema::table('bitrix_tasks', function (Blueprint $table) {
            $table->dateTime('activity_date')->nullable()->after('deadline');
            $table->integer('new_comments_count')->default(0)->after('activity_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bitrix_tasks', function (Blueprint $table) {
            $table->dropColumn(['activity_date', 'new_comments_count']);
        });
    }
};
