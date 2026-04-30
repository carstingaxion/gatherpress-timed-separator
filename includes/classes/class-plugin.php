<?php
/**
 * Main plugin class implementing the Singleton pattern.
 *
 * @package GatherpressTimedSeparator
 * @since   0.1.0
 */

declare(strict_types=1);

namespace GatherpressTimedSeparator;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( __NAMESPACE__ . '\Plugin' ) ) {

	/**
	 * Class Plugin
	 *
	 * Responsible for initializing the plugin, registering the block,
	 * and ensuring only one instance is loaded at any time.
	 *
	 * @since 0.1.0
	 */
	class Plugin {

		/**
		 * Singleton instance.
		 *
		 * @since 0.1.0
		 *
		 * @var Plugin|null
		 */
		private static ?Plugin $instance = null;

		/**
		 * Tracks the last rendered separator label per interval per query.
		 *
		 * @since 0.1.0
		 *
		 * @var array<string, string>
		 */
		private array $last_rendered_labels = array();

		/**
		 * Retrieves the singleton instance.
		 *
		 * @since 0.1.0
		 *
		 * @return Plugin The singleton instance.
		 */
		public static function get_instance(): Plugin {
			if ( null === self::$instance ) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		/**
		 * Constructor. Registers WordPress hooks.
		 *
		 * @since 0.1.0
		 */
		private function __construct() {
			add_action( 'init', array( $this, 'register_block' ) );
			add_filter( 'query_loop_block_query_vars', array( $this, 'reset_separator_state' ), 10, 1 );
		}

		/**
		 * Registers the block using metadata from block.json.
		 *
		 * @since 0.1.0
		 *
		 * @return void
		 */
		public function register_block(): void {
			$block_path = dirname( __DIR__, 2 ) . '/build/';

			if ( ! file_exists( $block_path . 'block.json' ) ) {
				return;
			}

			register_block_type( $block_path );
		}

		/**
		 * Resets separator state when a new query loop begins.
		 *
		 * @since 0.1.0
		 *
		 * @param array<string, mixed> $query The query variables for the loop.
		 * @return array<string, mixed> The unmodified query variables.
		 */
		public function reset_separator_state( array $query ): array {
			$this->last_rendered_labels = array();
			return $query;
		}

		/**
		 * Retrieves the last rendered label for a given interval.
		 *
		 * @since 0.1.0
		 *
		 * @param string $interval The interval key (day, week, month, year).
		 * @return string The last rendered label, or empty string if none.
		 */
		public function get_last_label( string $interval ): string {
			return $this->last_rendered_labels[ $interval ] ?? '';
		}

		/**
		 * Stores the last rendered label for a given interval.
		 *
		 * @since 0.1.0
		 *
		 * @param string $interval The interval key (day, week, month, year).
		 * @param string $label    The formatted label string.
		 * @return void
		 */
		public function set_last_label( string $interval, string $label ): void {
			$this->last_rendered_labels[ $interval ] = $label;
		}
	}
}
