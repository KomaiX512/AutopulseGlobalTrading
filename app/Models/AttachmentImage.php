<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttachmentImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'attachment_id',
        'filename',
        'path',
        'alt_text',
        'sort_order',
        'is_primary'
    ];

    protected $casts = [
        'is_primary' => 'boolean',
        'sort_order' => 'integer'
    ];

    public function attachment()
    {
        return $this->belongsTo(Attachment::class);
    }
} 