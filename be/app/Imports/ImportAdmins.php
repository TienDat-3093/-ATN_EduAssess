<?php

namespace App\Imports;

use App\Models\Users;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ImportAdmins implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Users([
            'displayname' => $row['displayname'],
            'email' => $row['email'],
            'password' => $row['password'],
            'date_of_birth' => $row['date_of_birth'],
            'image' => $row['image'],
            'status' => $row['status'],
            'admin_role' => $row['admin_role'],
            'created_at' => $row['created_at'],
            'updated_at' => $row['updated_at'],
        ]);
    }
}
