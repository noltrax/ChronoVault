<?php
namespace App\Data;
use Carbon\Carbon;
use Spatie\LaravelData\Data;

class ResponseMessageData extends Data
{

    public function __construct(
        public ?string $content,
        public string $status,
        public Carbon $showAt
    )
    {}

}
