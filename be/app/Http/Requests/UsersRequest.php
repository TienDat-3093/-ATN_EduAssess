<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UsersRequest extends FormRequest
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
            'displayname' => 'required|max:20|min:1',
            'email' => 'required|regex:/^.+@.+$/|max:30',
            'date_of_birth' => 'required',
            'password' => 'required|confirmed',
        ];
    }
    public function messages(): array
    {
        return [
            'required' => ":attribute can't be empty",
            'min' => ":attribute can't be lower than :min character",
            'max' => ":attribute can't be higher than :max characters",
            'regex:/^.+@.+$/' => ":attribute must have @",
            'confirmed' => ":attribute must match",
        ];
    }
    public function attributes()
    {
        return [
            'displayname' => 'Displayname',
            'email' => 'Email',
            'date_of_birth' => 'Date of birth',
            'password' => 'Password',
        ];
    }
}
