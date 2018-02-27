<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', 'rootpass' );

/** MySQL hostname */
define( 'DB_HOST', 'db' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         ':~p#/-&vjf(DH&WNs5_fXGJZI@3z!7Y0p^i:ZZER!uA>yu&u=xp^.fPrRIp1O63s' );
define( 'SECURE_AUTH_KEY',  'zW00*#s{SS{N4E=^W5dfa?nI7i;#2}#]:LD_@.ms/MUFG(#)ixh=,{aal`2V4/,/' );
define( 'LOGGED_IN_KEY',    'e0iDuzQ}Ydh$lgTd.8DtdvK#7%#:&`0zoT>({7{T|UZa8j.v~}hiMI-nEh&.<Y@1' );
define( 'NONCE_KEY',        '!,DMkZ;;O`eUBZ+gP9hNc`fZMaurwX)VmSnyG<{e0;YRm~`5zhQe?|yjrturYfPi' );
define( 'AUTH_SALT',        '{PB9:S`_mBDCqh>4{v2.]K8PBM^4b%!oEXny{* Y90(|H1#}qvgoae)A5rUiYBYF' );
define( 'SECURE_AUTH_SALT', '4=en&yu3r}Bp?hA~GI9;0D~kDPr~KqKdf@YCU[;>_ycxiOzLhK}I4Lt>*V|@O9K:' );
define( 'LOGGED_IN_SALT',   '98=ODZdw=bavAo%{Hr!.u&Nlma^4!C#AwjbnM.pR8#eiGa5GqkS0T^hl,<9^Bi|/' );
define( 'NONCE_SALT',       '1aV [|`).|17X0*fyIi(s|Of]=$E9f[xd~/Oql?U~C=c+7vQ:>P~25JM>g7GzlIp' );

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


define( 'FS_METHOD', 'direct' );

if ($_SERVER && isset($_SERVER['HTTP_HOST'])) {
	define('WP_SITEURL', "http://${_SERVER['HTTP_HOST']}");
	define('WP_HOME',    "http://${_SERVER['HTTP_HOST']}");
}


define( 'COOKIE_DOMAIN', 'headless.dev' );
define( 'COOKIEPATH', '/' );

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) )
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
