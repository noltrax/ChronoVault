<?php
namespace App\Services;
use App\Models\Message;
use App\DTOs\CreateMessageDTO;
use Carbon\Carbon;
use Illuminate\Support\Str;

class MessageService{
    public function create(CreateMessageDTO $dto):Message{
        return Message::create([
            'token'      => Str::random(32),
            'content'    => $dto->content,
            'show_at'    => $dto->showAt->utc(),
            'expires_at' => $dto->showAt->copy()->addDay()->utc(),
        ]);
    }
}
