<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="referrer" content="origin">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Download Subtitle</title>
        {{-- <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <script src="{{ asset('js/app.js') }}"></script> --}}
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

        <!-- Styles -->
        {{-- @viteReactRefresh
        @vite(['resources/css/app.css','resources/js/app.js']) --}}
    </head>
    <body class="antialiased">
        {{-- <div id="root"></div> --}}
        
    </body>
</html>