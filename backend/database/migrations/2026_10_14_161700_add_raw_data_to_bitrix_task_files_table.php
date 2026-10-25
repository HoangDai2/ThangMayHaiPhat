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
        if (!Schema::hasColumn('bitrix_task_files', 'raw_data')) {
            Schema::table('bitrix_task_files', function (Blueprint $table) {
                $table->longText('raw_data')->nullable()->after('local_path');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('bitrix_task_files', 'raw_data')) {
            Schema::table('bitrix_task_files', function (Blueprint $table) {
                $table->dropColumn('raw_data');
            });
        }
    }
};
