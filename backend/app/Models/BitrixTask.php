<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BitrixTask extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function project()
    {
        return $this->belongsTo(BitrixProject::class, 'project_id');
    }

    public function creator()
    {
        return $this->belongsTo(BitrixUser::class, 'created_by', 'bitrix_id');
    }

    public function responsible()
    {
        return $this->belongsTo(BitrixUser::class, 'responsible_id', 'bitrix_id');
    }

    public function comments()
    {
        return $this->hasMany(BitrixTaskComment::class, 'task_id');
    }

    public function files()
    {
        return $this->hasMany(BitrixTaskFile::class, 'task_id');
    }
}
