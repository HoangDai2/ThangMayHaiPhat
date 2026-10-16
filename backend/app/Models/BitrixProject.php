<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BitrixProject extends Model
{
    use HasFactory;
    protected $guarded = [];

    protected $appends = ['project_date_start', 'project_date_finish'];

    public function getProjectDateStartAttribute()
    {
        return $this->start_date;
    }

    public function getProjectDateFinishAttribute()
    {
        return $this->end_date;
    }

    public function customer()
    {
        return $this->belongsTo(BitrixCustomer::class, 'customer_id');
    }

    public function tasks()
    {
        return $this->hasMany(BitrixTask::class, 'project_id');
    }
}

