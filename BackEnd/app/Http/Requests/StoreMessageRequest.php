<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreMessageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'content' => ['required', 'string', 'max:1000'],
            'show_at' => ['required', 'date', 'after:now'],
        ];
    }
    public function messages(): array
    {
        return [
            'content.required' => 'Message content is required.',
            'content.string'   => 'Message must be a string.',
            'show_at.required' => 'Show date/time is required.',
            'show_at.after'    => 'Show date/time must be in the future.',
        ];
    }
}
