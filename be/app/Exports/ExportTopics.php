<?php

namespace App\Exports;

use App\Models\Topics;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Illuminate\Support\Facades\Schema;

class ExportTopics implements FromCollection, ShouldAutoSize, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function headings(): array
    {
        $topics = new Topics;
        $table = $topics->getTable();
        return Schema::getColumnListing($table);
    }
    public function collection()
    {
        return Topics::all();
    }
}
