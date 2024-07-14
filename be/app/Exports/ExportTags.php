<?php

namespace App\Exports;

use App\Models\Tags;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Illuminate\Support\Facades\Schema;

class ExportTags implements FromCollection, ShouldAutoSize, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function headings(): array
    {
        $tags = new Tags;
        $table = $tags->getTable();
        return Schema::getColumnListing($table);
    }
    public function collection()
    {
        return Tags::all();
    }
}
