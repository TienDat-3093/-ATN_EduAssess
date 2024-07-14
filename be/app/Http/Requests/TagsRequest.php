<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TagsRequest extends FormRequest
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
            'name' => 'required|max:20|min:1',
        ];
    }
    public function messages(): array
    {
        return [
            'required' => ":attribute can't be empty",
            'min' => ":attribute can't be lower than :min character",
            'max' => ":attribute can't be higher than :max characters",
        ];
    }
    public function attributes()
    {
        return [
            'name' => 'Tag name',
        ];
    }
}
