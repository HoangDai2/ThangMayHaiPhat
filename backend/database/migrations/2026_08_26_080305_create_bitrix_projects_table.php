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
        Schema::create('bitrix_projects', function (Blueprint $table) {
            $table->id();
            $table->string('bitrix_id')->unique();
            $table->string('name')->nullable();
            $table->text('description')->nullable();
            $table->foreignId('customer_id')->nullable()->constrained('bitrix_customers')->nullOnDelete();
            $table->string('status')->nullable();
            $table->dateTime('start_date')->nullable();
            $table->dateTime('end_date')->nullable();
            $table->json('raw_data')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bitrix_projects');
    }
};
