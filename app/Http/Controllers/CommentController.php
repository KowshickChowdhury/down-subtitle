<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Traits\CommonTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    use CommonTrait;

    public function index()
    {
        $comments = Comment::with('user')->get();
        return $this->sendResponse($comments);
    }
    
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'comment' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->sendError(['errors' => $validator->errors()], 422);
        }

        $comment = $request['comment'];
        $user_id = Auth::user()->id;
        // dd($user_id);

        $newComment = new Comment();
        $newComment->user_id = $user_id;
        $newComment->comments = $comment;
        $newComment->save();

        return $this->sendResponse(['message' => 'Comment has been posted.']);
    }
}
