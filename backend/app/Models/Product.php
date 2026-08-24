<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';
    protected $guarded = [];
    
    protected function casts(): array
    {
        return [
            'features' => 'array',
            'gallery' => 'array',
            'specifications' => 'array',
            'benefits' => 'array',
            'faqs' => 'array',
            'related_projects' => 'array',
        ];
    }
}


