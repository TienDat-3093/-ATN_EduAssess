<?php

namespace App\Exports;

use App\Models\Tests;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Illuminate\Support\Facades\Schema;

class ExportTests implements FromCollection, ShouldAutoSize, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function headings(): array
    {
        $tests = new Tests;
        $table = $tests->getTable();
        return Schema::getColumnListing($table);
    }
    public function collection()
    {
        return Tests::all()->map(function ($item) {
            $item->privacy = (string) $item->privacy;
            $item->done_count = (string) $item->done_count;
            return $item;
        });
    }
}
