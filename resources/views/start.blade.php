<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Blog</title>

        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        <script async charset="utf-8" src="//cdn.embedly.com/widgets/platform.js"></script>

    </head>
    <body>
        <div id="app">
            <main-app></main-app>
        </div>
        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>