<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;
use Illuminate\Support\Str;

class SubtitleController extends Controller
{
    private $youtubeApiKey;

    public function __construct()
    {
        $this->youtubeApiKey = env('YOUTUBE_API_KEY');
    }

    public function extractSubtitles(Request $request)
    {
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
        // dd($videoDetails);

        // Use yt-dlp to download the subtitles
        $outputPath = 'D:\\xampp\\htdocs\\down-subtitle\\public\\subtitles\\%(title)s.%(ext)s';

        $process = new Process([
            'C:\\Python312\\python.exe',
            'C:\\Users\\bdCalling\\yt-dlp\\yt-dlp.exe',
            '--write-sub',
            '--skip-download',
            '--sub-format',
            'srt',
            '--sub-lang',
            'en',
            '-o',
            $outputPath,
            $link
        ], null, [
            'TMP' => 'D:\\xampp\\tmp', // Change to a writable directory
            'TEMP' => 'D:\\xampp\\tmp' // Same here
        ]);
        
        // $process = new Process(['C:\\Users\\bdCalling\\yt-dlp\\yt-dlp.exe', '--write-sub', '--skip-download', '--sub-format', 'srt', '--sub-lang', 'en', '-o', '%(title)s.%(ext)s', $link], null, ['TMP' => 'C:\\Users\\bdCalling\\AppData\\Local\\Temp']);

        // Check if the process succeeded
        try {
            $process->run();
        
            if (!$process->isSuccessful()) {
                throw new ProcessFailedException($process);
            }
        
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

        // Subtitle file path based on video title
        $subtitleFile = 'D:/xampp/htdocs/down-subtitle/public/subtitles/'.$videoDetails['title'].'.en.srt';
        
        if (!file_exists($subtitleFile)) {
            return response()->json(['error' => 'Subtitle file not found.'], 404);
        }

        $rawContent = file_get_contents($subtitleFile);
        $textFile = str_replace('.srt', '.txt', $subtitleFile);
        file_put_contents($textFile, strip_tags($rawContent));

        // Return video metadata and subtitle download links
        return response()->json([
            'video' => $videoDetails,
            'srt' => asset('subtitles/'.$videoDetails['title'].'.en.srt'),
            'txt' => asset('subtitles/'.$videoDetails['title'].'.txt'),
            'raw' => $rawContent,
        ]);
    }

    private function extractVideoId($url)
    {
        // Extract video ID from the YouTube URL
        preg_match("/(youtu\.be\/|v=)([^&]+)/", $url, $matches);
        return $matches[2] ?? null;
    }

    private function fetchVideoDetails($videoId)
    {
        $url = "https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id={$videoId}&key={$this->youtubeApiKey}";

        $response = Http::get($url);
        if ($response->successful()) {
            $data = $response->json();
            $item = $data['items'][0];

            return [
                'title' => $item['snippet']['title'],
                'thumbnail' => $item['snippet']['thumbnails']['high']['url'],
                'duration' => $this->convertDuration($item['contentDetails']['duration']),
            ];
        }

        return null;
    }

    private function convertDuration($duration)
    {
        $interval = new \DateInterval($duration);
        return $interval->format('%H:%I:%S');
    }
}
