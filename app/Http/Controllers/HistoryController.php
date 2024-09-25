<?php

namespace App\Http\Controllers;

use App\Models\History;
use App\Traits\CommonTrait;
use Illuminate\Http\Request;

class HistoryController extends Controller
{
    use CommonTrait;

    public function index()
    {
        $histories = History::get();
        return $this->sendResponse($histories);
    }

    public function destroy(string $id)
    {
        // dd($id);
        History::destroy($id);
        return $this->sendResponse(['message' => 'History Deleted Successfully']);
    }
}
