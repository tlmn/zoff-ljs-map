<?php
/**
 * Plugin Name: LJS Map Local Branches
 */

function ljs_wp_map_shortcode()
{
    return '<div id="wp-plugin-ljs-map"></div>';
}

add_shortcode('wp-plugin-ljs-map', 'ljs_wp_map_shortcode');

function ljs_wp_map_load_assets()
{
    $react_app_js =
        plugin_dir_url(__FILE__) .
        'wp-plugin-ljs-map/build/static/js/all_in_one_file.js';
    $react_app_css =
        plugin_dir_url(__FILE__) .
        'wp-plugin-ljs-map/build/static/css/all_in_one_file.css';

    $version = time();
    wp_enqueue_script('wp-plugin-ljs-map', $react_app_js, [], $version, true);
    wp_enqueue_style('wp-plugin-ljs-map', $react_app_css, [], $version);
}

add_action('wp_enqueue_scripts', 'ljs_wp_map_load_assets');
