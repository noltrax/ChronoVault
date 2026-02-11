<?php
namespace App\Services;
use App\Data\ResponseMessageData;
use App\Models\Message;
use App\Data\CreateMessageData;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class MessageService{
    public function create(CreateMessageData $dto):Message{
        return Message::create([
            'content'    => $dto->content,
            'show_at' => $dto->showAtCarbon(),        ]);
    }
    public function getMessageByToken(string $token): Message
    {
        return Message::where('token', $token)->firstOrFail();
    }

    public function resolveStatus(Message $message): ResponseMessageData
    {
        $showAtUtc = $message->show_at?->copy()->utc();
        $nowUtc = now()->utc();

        if ($showAtUtc && $showAtUtc->gt($nowUtc)) {
            return new ResponseMessageData(
                content: null,
                status: 'waiting',
                showAt: $showAtUtc
            );
        }
        return new ResponseMessageData(
            content: $message->content,
            status: 'revealed',
            showAt: $showAtUtc
        );

    }
    public function showMessageByLink(string $token): ResponseMessageData
    {
        return $this->resolveStatus($this->getMessageByToken($token));
    }

}
