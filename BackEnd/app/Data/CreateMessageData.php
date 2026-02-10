<?php
namespace App\Data;

use Carbon\Carbon;
use Spatie\LaravelData\Data;
class CreateMessageData extends Data
{
    public function __construct(
        public string $content,
        public string $showAt
    ) {}
    public function showAtCarbon(): Carbon
    {
        return Carbon::parse($this->showAt)->utc();
    }

}
