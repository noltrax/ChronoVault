<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'token'      => $this->token,
            'content'    => $this->content,
            'show_at'    => $this->show_at?->toIso8601String(),
            'expires_at' => $this->expires_at?->toIso8601String(),
            'link'       => url("/m/{$this->token}"), // frontend can open /m/{token}
        ];
    }


}
