<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BitrixTask extends Model
{
    use HasFactory;
    protected $guarded = [];

    protected $appends = [
        'activity_date',
        'created_date',
        'new_comments_count',
        'creator_data',
        'responsible_data',
        'comments_count',
        'files_count',
        'is_recurrent',
        'customer_data',
        'auditors_data'
    ];

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

    public function getActivityDateAttribute()
    {
        $raw = is_array($this->raw_data) ? $this->raw_data : json_decode($this->raw_data ?? '[]', true);
        if (!empty($raw['activityDate'])) {
            return $raw['activityDate'];
        }
        if (!empty($raw['changedDate'])) {
            return $raw['changedDate'];
        }
        if (!empty($raw['statusChangedDate'])) {
            return $raw['statusChangedDate'];
        }
        if (!empty($this->attributes['activity_date'])) {
            try {
                return (new \Carbon\Carbon($this->attributes['activity_date'], 'UTC'))->setTimezone('Asia/Ho_Chi_Minh')->toIso8601String();
            } catch (\Exception $e) {
                return $this->attributes['activity_date'];
            }
        }
        return $this->updated_at ? $this->updated_at->setTimezone('Asia/Ho_Chi_Minh')->toIso8601String() : null;
    }

    public function getDeadlineAttribute($value)
    {
        $raw = is_array($this->raw_data) ? $this->raw_data : json_decode($this->raw_data ?? '[]', true);
        if (!empty($raw['deadline'])) {
            return $raw['deadline'];
        }
        if ($value) {
            try {
                return (new \Carbon\Carbon($value, 'UTC'))->setTimezone('Asia/Ho_Chi_Minh')->toIso8601String();
            } catch (\Exception $e) {
                return $value;
            }
        }
        return null;
    }

    public function getCreatedDateAttribute()
    {
        $raw = is_array($this->raw_data) ? $this->raw_data : json_decode($this->raw_data ?? '[]', true);
        if (!empty($raw['createdDate'])) {
            return $raw['createdDate'];
        }
        if (!empty($raw['dateCreated'])) {
            return $raw['dateCreated'];
        }
        return $this->created_at ? (new \Carbon\Carbon($this->created_at, 'UTC'))->setTimezone('Asia/Ho_Chi_Minh')->toIso8601String() : null;
    }

    public function getNewCommentsCountAttribute()
    {
        if (isset($this->attributes['new_comments_count']) && $this->attributes['new_comments_count'] !== null) {
            return (int) $this->attributes['new_comments_count'];
        }
        $raw = is_array($this->raw_data) ? $this->raw_data : json_decode($this->raw_data ?? '[]', true);
        return (int) ($raw['newCommentsCount'] ?? 0);
    }

    public function getCreatorDataAttribute()
    {
        $raw = is_array($this->raw_data) ? $this->raw_data : json_decode($this->raw_data ?? '[]', true);
        $name = $raw['creator']['name'] ?? ($this->creator ? $this->creator->name : $this->created_by);
        $icon = $raw['creator']['icon'] ?? ($this->creator ? $this->creator->avatar : '');
        return [
            'id' => $raw['creator']['id'] ?? $this->created_by,
            'name' => $name,
            'icon' => $icon
        ];
    }

    public function getResponsibleDataAttribute()
    {
        $raw = is_array($this->raw_data) ? $this->raw_data : json_decode($this->raw_data ?? '[]', true);
        $name = $raw['responsible']['name'] ?? ($this->responsible ? $this->responsible->name : $this->responsible_id);
        $icon = $raw['responsible']['icon'] ?? ($this->responsible ? $this->responsible->avatar : '');
        return [
            'id' => $raw['responsible']['id'] ?? $this->responsible_id,
            'name' => $name,
            'icon' => $icon
        ];
    }

    public function getCommentsCountAttribute()
    {
        $raw = is_array($this->raw_data) ? $this->raw_data : json_decode($this->raw_data ?? '[]', true);
        if (isset($raw['commentsCount']) && $raw['commentsCount'] !== null && $raw['commentsCount'] !== '') {
            return (int) $raw['commentsCount'];
        }
        if (array_key_exists('comments_count', $this->attributes) && $this->attributes['comments_count'] > 0) {
            return (int) $this->attributes['comments_count'];
        }
        return $this->relationLoaded('comments') ? $this->comments->count() : $this->comments()->count();
    }

    public function getFilesCountAttribute()
    {
        $raw = is_array($this->raw_data) ? $this->raw_data : json_decode($this->raw_data ?? '[]', true);
        if (!empty($raw['ufTaskWebdavFiles']) && is_array($raw['ufTaskWebdavFiles'])) {
            return count($raw['ufTaskWebdavFiles']);
        }
        if (array_key_exists('files_count', $this->attributes) && $this->attributes['files_count'] > 0) {
            return (int) $this->attributes['files_count'];
        }
        return $this->relationLoaded('files') ? $this->files->count() : $this->files()->count();
    }

    public function getIsRecurrentAttribute()
    {
        $raw = is_array($this->raw_data) ? $this->raw_data : json_decode($this->raw_data ?? '[]', true);
        return ($raw['replicate'] ?? 'N') === 'Y' || !empty($raw['forkedByTemplateId']);
    }

    public function getCustomerDataAttribute()
    {
        if ($this->project && $this->project->customer) {
            return [
                'id' => $this->project->customer->id,
                'bitrix_id' => $this->project->customer->bitrix_id,
                'name' => $this->project->customer->name,
                'phone' => $this->project->customer->phone,
                'email' => $this->project->customer->email,
            ];
        }
        $raw = is_array($this->raw_data) ? $this->raw_data : json_decode($this->raw_data ?? '[]', true);
        if (!empty($raw['ufCrmTask'])) {
            foreach ($raw['ufCrmTask'] as $crmItem) {
                if (str_starts_with($crmItem, 'C_')) {
                    $contact = BitrixCustomer::where('bitrix_id', substr($crmItem, 2))->first();
                    if ($contact) {
                        return [
                            'id' => $contact->id,
                            'bitrix_id' => $contact->bitrix_id,
                            'name' => $contact->name,
                            'phone' => $contact->phone,
                            'email' => $contact->email,
                        ];
                    }
                }
            }
        }
        return null;
    }

    public function getAuditorsDataAttribute()
    {
        $raw = is_array($this->raw_data) ? $this->raw_data : json_decode($this->raw_data ?? '[]', true);
        if (!empty($raw['auditorsData']) && is_array($raw['auditorsData'])) {
            $list = [];
            foreach ($raw['auditorsData'] as $a) {
                $list[] = [
                    'id' => $a['id'] ?? '',
                    'name' => $a['name'] ?? '',
                    'icon' => $a['icon'] ?? '',
                    'workPosition' => $a['workPosition'] ?? '',
                ];
            }
            return $list;
        }
        return [];
    }
}
