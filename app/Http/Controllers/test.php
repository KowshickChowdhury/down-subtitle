namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
use GuzzleHttp\Client;

class SubtitleController extends Controller
{
    public function extractSubtitles(Request $request)
    {
        $request->validate([
            'link' => 'required|url',
        ]);

        // Extract the video ID from the YouTube link
        preg_match('/[\\?&]v=([^&#]*)/', $request->input('link'), $matches);
        $videoId = $matches[1] ?? null;

        if (!$videoId) {
            return response()->json(['error' => 'Invalid YouTube link'], 400);
        }

        // Fetch video details from YouTube API
        $youtubeApiKey = env('YOUTUBE_API_KEY');
        $client = new Client();
        $response = $client->get("https://www.googleapis.com/youtube/v3/videos", [
            'query' => [
                'id' => $videoId,
                'part' => 'snippet,contentDetails',
                'key' => $youtubeApiKey
            ]
        ]);
        $videoData = json_decode($response->getBody(), true);

        if (empty($videoData['items'])) {
            return response()->json(['error' => 'No video data found'], 404);
        }

        $videoDetails = $videoData['items'][0];
        $videoInfo = [
            'title' => $videoDetails['snippet']['title'],
            'thumbnail' => $videoDetails['snippet']['thumbnails']['high']['url'],
            'duration' => $this->convertDuration($videoDetails['contentDetails']['duration']),
        ];

        // Extract subtitles using yt-dlp
        $link = $request->input('link');
        $ytDlpPath = '/path/to/yt-dlp';

        $process = new Process([$ytDlpPath, '--write-sub', '--skip-download', '--sub-format', 'srt', '--sub-lang', 'en', $link]);

        try {
            $process->mustRun();
            // Subtitle extraction succeeded
            $subtitleFilePathSrt = '/path/to/subtitle/file.srt';
            $subtitleFilePathTxt = '/path/to/subtitle/file.txt'; // Optional: Convert SRT to TXT

            return response()->json([
                'video' => $videoInfo,
                'srt' => $subtitleFilePathSrt,
                'txt' => $subtitleFilePathTxt,
                'raw' => file_get_contents($subtitleFilePathSrt),
            ]);
        } catch (ProcessFailedException $exception) {
            return response()->json(['error' => 'Subtitle extraction failed'], 500);
        }
    }

    private function convertDuration($youtubeDuration)
    {
        $interval = new \DateInterval($youtubeDuration);
        return $interval->format('%H:%I:%S');
    }
}
