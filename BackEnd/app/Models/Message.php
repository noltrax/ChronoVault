<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        'token',
        'content',
        'show_at',
        'expires_at',
    ];

    protected $casts = [
        'show_at'    => 'datetime',
        'expires_at'=> 'datetime',
    ];
}
