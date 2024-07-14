<?php

namespace App\Exports;

use App\Models\QuestionsAdmin;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Illuminate\Support\Facades\Schema;

class ExportQuestionsAdmin implements FromCollection, ShouldAutoSize, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function headings(): array
    {
        $questionsadmin = new QuestionsAdmin;
        $table = $questionsadmin->getTable();
        return Schema::getColumnListing($table);
    }
    public function collection()
    {
        return QuestionsAdmin::all();
    }
}
