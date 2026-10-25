<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    protected $fillable = [
        'title',
        'subtitle',
        'description',
        'discount_text',
        'image_url',
        'link_url',
        'delay_seconds',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'delay_seconds' => 'integer',
    ];
}
