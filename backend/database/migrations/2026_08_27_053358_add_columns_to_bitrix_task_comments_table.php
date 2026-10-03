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
        Schema::table('bitrix_task_comments', function (Blueprint $table) {
            $table->string('author_name')->nullable()->after('author_id');
            $table->text('post_message')->nullable()->after('message');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bitrix_task_comments', function (Blueprint $table) {
            $table->dropColumn(['author_name', 'post_message']);
        });
    }
};
