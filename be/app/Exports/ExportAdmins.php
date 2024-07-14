<?php

namespace App\Exports;

use App\Models\Users;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Illuminate\Support\Facades\Schema;

class ExportAdmins implements FromCollection, ShouldAutoSize, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function headings(): array
    {
        $user = new Users;
        $table = $user->getTable();
        return Schema::getColumnListing($table);
    }
    public function collection()
    {
        return Users::where('admin_role', '!=', 0)->get()->map(function ($item) {
            $item->status = (string) $item->status;
            $item->admin_role = (string) $item->admin_role;
            return $item;
        });
    }
}
