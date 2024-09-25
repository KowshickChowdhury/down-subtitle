<?php

namespace App\Http\Controllers;

use App\Models\History;
use App\Traits\CommonTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class SubtitleController extends Controller
{
    use CommonTrait;

    private $youtubeApiKey;

    public function __construct()
    {
        $this->youtubeApiKey = env('YOUTUBE_API_KEY');
    }

    public function extractSubtitles(Request $request)
    {
        // Validate the input URL
        $validated = $request->validate([
            'link' => 'required|url',
        ]);

        $link = $validated['link'];
        $videoId = $this->extractVideoId($link);

        if (!$videoId) {
            return response()->json(['error' => 'Invalid YouTube link.'], 400);
        }

        // Fetch video details
        $videoDetails = $this->fetchVideoDetails($videoId);

        if (!$videoDetails) {
            return response()->json(['error' => 'Failed to retrieve video details.'], 500);
        }

        // Check if captions are available
        if (!$videoDetails['has_captions']) {
            return response()->json(['error' => 'No subtitles available for this video.'], 404);
        }

        // Extract captions URL from video details
        $captionUrl = $this->getCaptionUrl($videoId);

        if (!$captionUrl) {
            return response()->json(['error' => 'Failed to retrieve captions URL.'], 500);
        }

        // Download and process the subtitles
        $subtitleContent = $this->downloadSubtitles($captionUrl);

        if (!$subtitleContent) {
            return response()->json(['error' => 'Failed to download subtitles.'], 500);
        }

        // Sanitize the video title to create a valid filename
        $sanitizedTitle = Str::slug($videoDetails['title'], '-');

        // Ensure that the subtitles directory exists
        if (!is_dir('D:/xampp/htdocs/down-subtitle/public/subtitles')) {
            mkdir('D:/xampp/htdocs/down-subtitle/public/subtitles', 0777, true);
        }

        // Define the subtitle paths using sanitized title
        $subtitleSrtPath = 'D:/xampp/htdocs/down-subtitle/public/subtitles/' . $sanitizedTitle . '.srt';
        $subtitleTxtPath = 'D:/xampp/htdocs/down-subtitle/public/subtitles/' . $sanitizedTitle . '.txt';

        // Save the subtitle content to the .srt file
        file_put_contents($subtitleSrtPath, $this->convertToSRT($subtitleContent));

        // Convert to plain text and save it to the .txt file
        $plainTextContent = $this->convertToPlainText($subtitleContent);
        file_put_contents($subtitleTxtPath, $plainTextContent);

        if ($link && $videoDetails) {
            $old_history = History::where('url', $link)->first();
            // dd($old_history->url);
            if (!$old_history) {
                $history = new History();
                $history->source = 'Youtube';
                $history->title = $videoDetails['title'];
                $history->url = $link;
                $history->save();
            }
        }

        // Return video metadata and subtitle download links
        return $this->sendResponse([
            'videoLink' => $link,
            'video' => $videoDetails,
            'srt' => asset('subtitles/' . $sanitizedTitle . '.srt'),
            'txt' => asset('subtitles/' . $sanitizedTitle . '.txt'),
            'raw' => $subtitleContent,
        ]);
    }

    private function extractVideoId($url)
    {
        // Extract video ID from YouTube URL
        preg_match("/(youtu\.be\/|v=)([^&]+)/", $url, $matches);
        return $matches[2] ?? null;
    }

    private function fetchVideoDetails($videoId)
    {
        // YouTube Data API URL
        $url = "https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id={$videoId}&key={$this->youtubeApiKey}";

        $response = Http::get($url);
        if ($response->successful()) {
            $data = $response->json();
            $item = $data['items'][0];

            return [
                'title' => $item['snippet']['title'],
                'thumbnail' => $item['snippet']['thumbnails']['high']['url'],
                'duration' => $this->convertDuration($item['contentDetails']['duration']),
                'has_captions' => isset($item['contentDetails']['caption']) && $item['contentDetails']['caption'] === 'true',
            ];
        }

        return null;
    }

    private function getCaptionUrl($videoId)
    {
        // Get video page content
        $videoPageUrl = "https://www.youtube.com/watch?v=" . $videoId;
        $videoPageContent = file_get_contents($videoPageUrl);

        // Extract caption tracks URL (can be improved with a proper regex pattern)
        if (preg_match('/"captionTracks":\[(.*?)\]/', $videoPageContent, $matches)) {
            $captionTracksJson = $matches[1];

            // Decode JSON and get the caption track URL
            $captionTracks = json_decode("[$captionTracksJson]", true);
            foreach ($captionTracks as $track) {
                if ($track['languageCode'] === 'en') {
                    return $track['baseUrl'];
                }
            }
        }

        return null;
    }

    private function downloadSubtitles($captionUrl)
    {
        // Append fmt=srv3 to get the SRT format if available
        $srtUrl = $captionUrl . '&fmt=srv3';
        return file_get_contents($srtUrl);
    }

    private function convertToSRT($subtitleContent)
    {
        // Return raw content for SRT (can be parsed further if needed)
        return strip_tags($subtitleContent);
    }

    private function convertToPlainText($subtitleContent)
    {
        // Strip out tags and return plain text
        return strip_tags($subtitleContent);
    }

    private function convertDuration($duration)
    {
        $interval = new \DateInterval($duration);
        return $interval->format('%H:%I:%S');
    }

}
