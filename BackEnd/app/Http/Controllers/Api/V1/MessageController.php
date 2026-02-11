<?php
namespace App\Http\Controllers\Api\V1;
use App\Data\CreateMessageData;
use App\Data\ResponseMessageData;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMessageRequest;
use App\Http\Resources\MessageResource;
use App\Http\Resources\MessageTokenResource;
use App\Services\MessageService;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;

class MessageController extends Controller
{
    protected MessageService $service;

    public function __construct(MessageService $service)
    {
        $this->service = $service;
    }
    public function store(StoreMessageRequest $request): JsonResponse{
        $dto = CreateMessageData::from($request->validated());
        $message = $this->service->create($dto);
        return new MessageTokenResource($message)
            ->response()
            ->setStatusCode(201);
    }
    public function showByLink(string $token):MessageResource
    {
        $message = $this->service->showMessageByLink($token);
        return new MessageResource($message);


    }



}
