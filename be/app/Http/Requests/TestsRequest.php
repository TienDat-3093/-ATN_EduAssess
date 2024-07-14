<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TestsRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required',
            'question_admin' => 'required',
            'tag_data' => 'required',
        ];
    }
    public function messages(): array
    {
        return [
            'required' => ":attribute can't be empty",
        ];
    }
    public function attributes()
    {
        return [
            'name' => 'Test name',
            'question_admin' => 'Questions',
            'tag_data' => 'Tags',
        ];
    }
}
