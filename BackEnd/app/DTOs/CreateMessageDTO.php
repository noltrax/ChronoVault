<?php
namespace App\DTOs;

use Carbon\Carbon;

readonly class CreateMessageDTO
{
    public function __construct(
        public string $content,
        public Carbon $showAt,
    ) {}
}
