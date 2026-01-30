<?php
namespace App\Http\Controllers\Api\V1;
use App\DTOs\CreateMessageDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMessageRequest;
use App\Http\Resources\MessageResource;
use App\Services\MessageService;
use Carbon\Carbon;

class MessageController extends Controller
{
    protected MessageService $service;

    public function __construct(MessageService $service)
    {
        $this->service = $service;
    }
    public function store(StoreMessageRequest $request){
        $dto = new CreateMessageDTO(
            content: $request->validated('content'),
            showAt: Carbon::parse($request->validated('show_at'))
        );
        $message = $this->service->create($dto);
        return (new MessageResource($message))
            ->response()
            ->setStatusCode(201);
    }



}
