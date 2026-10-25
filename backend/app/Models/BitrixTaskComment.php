<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BitrixTaskComment extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function files()
    {
        return $this->hasMany(BitrixTaskFile::class, 'comment_id');
    }

    public function getCreatedAtAttribute($value)
    {
        $raw = is_array($this->raw_data) ? $this->raw_data : json_decode($this->raw_data ?? '[]', true);
        if (!empty($raw['date'])) {
            try {
                return (new \Carbon\Carbon($raw['date']))->setTimezone('Asia/Ho_Chi_Minh')->toIso8601String();
            } catch (\Exception $e) {}
        }
        if (!empty($raw['POST_DATE'])) {
            try {
                return (new \Carbon\Carbon($raw['POST_DATE']))->setTimezone('Asia/Ho_Chi_Minh')->toIso8601String();
            } catch (\Exception $e) {}
        }
        if ($value) {
            try {
                return (new \Carbon\Carbon($value, 'UTC'))->setTimezone('Asia/Ho_Chi_Minh')->toIso8601String();
            } catch (\Exception $e) {}
        }
        return $value;
    }
}
