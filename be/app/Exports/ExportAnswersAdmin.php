<?php

namespace App\Exports;

use App\Models\AnswersAdmin;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Illuminate\Support\Facades\Schema;

class ExportAnswersAdmin implements FromCollection, ShouldAutoSize, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function headings(): array
    {
        $answersadmin = new AnswersAdmin;
        $table = $answersadmin->getTable();
        return Schema::getColumnListing($table);
    }
    public function collection()
    {
        return AnswersAdmin::all();
    }
}
