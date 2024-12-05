<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserTemplate extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'html_content',
        'css_content',
        'project_name',
    ];
}
