<?php
/**
 * Plugin Name:       GatherPress Timed Separator
 * Description:       A dynamic separator block for GatherPress event query loops that displays date-boundary labels between event posts based on configurable intervals (day, week, month, year).
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      7.4
 * Author:            GatherPress
 * License:           GPLv2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gatherpress-timed-separator
 *
 * @package GatherpressTimedSeparator
 */

declare(strict_types=1);

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

require_once __DIR__ . '/includes/classes/class-plugin.php';
require_once __DIR__ . '/includes/classes/class-renderer.php';

GatherpressTimedSeparator\Plugin::get_instance();
