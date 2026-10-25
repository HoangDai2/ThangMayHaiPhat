<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';
    protected $guarded = [];
    
    protected function casts(): array
    {
        return [
            'features' => 'array',
            'gallery' => 'array',
            'testimonial' => 'array',
        ];
    }
}


