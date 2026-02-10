<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * @property string|null $content
 * @property Carbon|null|string $show_at
 *
 * @method static where(string $string, string $token)
 * @method static create(array $array)
 */
class Message extends Model
{
    protected $fillable = [
        'token',
        'content',
        'show_at',
    ];

    protected $casts = [
        'show_at' => 'datetime:Y-m-d H:i:s', // Carbon instance,
    ];
    protected static function booted(): void
    {
        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
            if (empty($model->token)) {
                $model->token = Str::random(42);
            }
        });
    }
}
