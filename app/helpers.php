<?php

use App\Helpers\UrlSlugGenerator as UrlSlugGeneratorAlias;

if (!function_exists('get_unique_slug')) {
    function get_unique_slug(\Illuminate\Database\Eloquent\Model $model, $strSlug = null)
    {
        return app(UrlSlugGeneratorAlias::class)->slugGet($model, $strSlug);
    }
}

if (!function_exists('clean_text')) {
    function clean_text($text)
    {
        $text = strip_tags(preg_replace('/<figure\b[^>]*>(.*?)<\/figure>/i', ' ', $text));
        $text = str_replace('&nbsp;', ' ', $text);

        return Str::limit($text, 222);
    }
}
