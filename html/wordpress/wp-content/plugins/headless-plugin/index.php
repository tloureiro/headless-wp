<?php

/**
* Plugin Name: Headless Plugin
*/

//add_filter( 'rest_post_dispatch', 'headless_allow_cors', 10, 3 );

//function headless_allow_cors( $response, $server, $request ) {
//
//	$response->headers['Access-Control-Allow-Origin'] = '*';
//	$response->headers['Access-Control-Allow-Credentials'] = true;
////	header( 'Access-Control-Allow-Origin: *' );
////	header( 'Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE' );
////	header( 'Access-Control-Allow-Credentials: true' );
//
//	return $response;
//}