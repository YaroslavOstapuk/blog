const mix = require('laravel-mix');

mix.disableNotifications();

var LiveReloadPlugin = require('webpack-livereload-plugin');

mix.webpackConfig({
    plugins: [
        new LiveReloadPlugin()
    ]
});

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js');

mix.styles([
    'node_modules/bootstrap/dist/css/bootstrap.css',
    'node_modules/bootstrap-vue/dist/bootstrap-vue.css',
    'node_modules/vue-toast-notification/dist/theme-default.css',
    'resources/css/app.css'
], 'public/css/app.css');
