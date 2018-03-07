<?php

/**
* Plugin Name: Headless Plugin
*/

remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );

add_filter( 'rest_pre_serve_request', 'headless_allow_cors' );

function headless_allow_cors( $value ) {
	header( 'Access-Control-Allow-Origin: *' );
	header( 'Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE' );
	header( 'Access-Control-Allow-Credentials: true' );
	return $value;
}