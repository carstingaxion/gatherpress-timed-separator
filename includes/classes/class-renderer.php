<?php
/**
 * Renderer class for the timed separator block.
 *
 * @package GatherpressTimedSeparator
 * @since   0.1.0
 */

declare(strict_types=1);

namespace GatherpressTimedSeparator;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( __NAMESPACE__ . '\Renderer' ) ) {

	/**
	 * Class Renderer
	 *
	 * Implements the Singleton pattern for the render logic. Computes
	 * date-boundary labels and deduplicates consecutive separators.
	 *
	 * @since 0.1.0
	 */
	class Renderer {

		/**
		 * Singleton instance.
		 *
		 * @since 0.1.0
		 *
		 * @var Renderer|null
		 */
		private static ?Renderer $instance = null;

		/**
		 * Tracks the last rendered label keyed by interval.
		 *
		 * @since 0.1.0
		 *
		 * @var array<string, string>
		 */
		private array $last_labels = array();

		/**
		 * Returns the singleton instance.
		 *
		 * @since 0.1.0
		 *
		 * @return Renderer The singleton instance.
		 */
		public static function get_instance(): Renderer {
			if ( null === self::$instance ) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		/**
		 * Private constructor enforces singleton usage.
		 *
		 * @since 0.1.0
		 */
		private function __construct() {}

		/**
		 * Resets label tracking state.
		 *
		 * @since 0.1.0
		 *
		 * @return void
		 */
		public function reset(): void {
			$this->last_labels = array();
		}

		/**
		 * Renders the separator block.
		 *
		 * @since 0.1.0
		 *
		 * @param array<string, mixed> $attributes Block attributes including 'interval'.
		 * @param string               $content    Inner block content (unused).
		 * @param \WP_Block            $block      Block instance with context.
		 * @return string The separator HTML or empty string when no boundary change.
		 */
		public function render( array $attributes, string $content, \WP_Block $block ): string {
			/**
			 * Raw interval value from block attributes.
			 *
			 * @var string $raw_interval
			 */
			$raw_interval = $attributes['interval'] ?? 'month';
			$interval     = sanitize_key( (string) $raw_interval );

			/**
			 * Raw post ID from block context.
			 *
			 * @var int|string $raw_post_id
			 */
			$raw_post_id = $block->context['postId'] ?? 0;
			$post_id     = absint( $raw_post_id );

			if ( 0 === $post_id ) {
				return '';
			}

			$event_datetime = $this->get_event_datetime( $post_id );

			if ( null === $event_datetime ) {
				return '';
			}

			$label = $this->compute_label( $event_datetime, $interval );

			if ( '' === $label ) {
				return '';
			}

			$last_label = $this->last_labels[ $interval ] ?? '';

			$this->last_labels[ $interval ] = $label;

			if ( $label === $last_label ) {
				return '';
			}

			$wrapper_attributes = get_block_wrapper_attributes(
				array(
					'class'                   => 'gatherpress-timed-separator',
					'data-separator-label'    => esc_attr( $label ),
					'data-separator-interval' => esc_attr( $interval ),
					'role'                    => 'separator',
					'aria-label'              => esc_attr( $label ),
				)
			);

			$output  = '<div ' . $wrapper_attributes . '>';
			$output .= '<div class="gatherpress-timed-separator__inner">';
			$output .= '<span class="gatherpress-timed-separator__line" aria-hidden="true"></span>';
			$output .= '<span class="gatherpress-timed-separator__label">' . esc_html( $label ) . '</span>';
			$output .= '<span class="gatherpress-timed-separator__line" aria-hidden="true"></span>';
			$output .= '</div>';
			$output .= '</div>';

			return $output;
		}

		/**
		 * Retrieves the event start datetime for a given post.
		 *
		 * Attempts three strategies in order:
		 * 1. GatherPress Core Event class API.
		 * 2. Raw post meta `gatherpress_datetime`.
		 * 3. Post published date as fallback.
		 *
		 * @since 0.1.0
		 *
		 * @param int $post_id The post ID.
		 * @return \DateTimeImmutable|null The event start datetime or null on failure.
		 */
		private function get_event_datetime( int $post_id ): ?\DateTimeImmutable {
			$result = $this->get_event_datetime_from_gatherpress( $post_id );

			if ( null !== $result ) {
				return $result;
			}

			$result = $this->get_event_datetime_from_meta( $post_id );

			if ( null !== $result ) {
				return $result;
			}

			return $this->get_event_datetime_from_post( $post_id );
		}

		/**
		 * Retrieves event datetime via the GatherPress Core Event class.
		 *
		 * @since 0.1.0
		 *
		 * @param int $post_id The post ID.
		 * @return \DateTimeImmutable|null The event datetime or null if unavailable.
		 */
		private function get_event_datetime_from_gatherpress( int $post_id ): ?\DateTimeImmutable {
			if ( ! class_exists( '\GatherPress\Core\Event' ) ) {
				return null;
			}

			try {
				$event = new \GatherPress\Core\Event( $post_id );

				/**
				 * Datetime array from GatherPress.
				 *
				 * @var array<string, string> $datetime
				 */
				$datetime = $event->get_datetime();

				$gmt_start = $datetime['datetime_start_gmt'] ?? '';
				if ( '' !== $gmt_start ) {
					$dt = \DateTimeImmutable::createFromFormat(
						'Y-m-d H:i:s',
						$gmt_start,
						new \DateTimeZone( 'UTC' )
					);

					if ( $dt instanceof \DateTimeImmutable ) {
						return $dt->setTimezone( wp_timezone() );
					}
				}

				$local_start = $datetime['datetime_start'] ?? '';
				if ( '' !== $local_start ) {
					$dt = \DateTimeImmutable::createFromFormat(
						'Y-m-d H:i:s',
						$local_start,
						wp_timezone()
					);

					if ( $dt instanceof \DateTimeImmutable ) {
						return $dt;
					}
				}
			} catch ( \Exception $e ) {
				// GatherPress API unavailable or returned unexpected data; fall through to next strategy.
				unset( $e );
			}

			return null;
		}

		/**
		 * Retrieves event datetime from raw post meta.
		 *
		 * @since 0.1.0
		 *
		 * @param int $post_id The post ID.
		 * @return \DateTimeImmutable|null The event datetime or null if unavailable.
		 */
		private function get_event_datetime_from_meta( int $post_id ): ?\DateTimeImmutable {
			$raw_meta = get_post_meta( $post_id, 'gatherpress_datetime', true );

			if ( ! is_array( $raw_meta ) ) {
				return null;
			}

			/**
			 * Post meta datetime array.
			 *
			 * @var array<string, string> $meta
			 */
			$meta = $raw_meta;

			$datetime_start = $meta['datetime_start'] ?? '';

			if ( '' === $datetime_start ) {
				return null;
			}

			$timezone_string = $meta['timezone'] ?? '';

			try {
				$tz = '' !== $timezone_string
					? new \DateTimeZone( $timezone_string )
					: wp_timezone();
			} catch ( \Exception $e ) {
				// Invalid timezone string in meta; use site default.
				unset( $e );
				$tz = wp_timezone();
			}

			$dt = \DateTimeImmutable::createFromFormat(
				'Y-m-d H:i:s',
				$datetime_start,
				$tz
			);

			if ( $dt instanceof \DateTimeImmutable ) {
				return $dt;
			}

			return null;
		}

		/**
		 * Retrieves event datetime from the post's published date as fallback.
		 *
		 * @since 0.1.0
		 *
		 * @param int $post_id The post ID.
		 * @return \DateTimeImmutable|null The post datetime or null if unavailable.
		 */
		private function get_event_datetime_from_post( int $post_id ): ?\DateTimeImmutable {
			$post = get_post( $post_id );

			if ( ! $post instanceof \WP_Post ) {
				return null;
			}

			$post_date = $post->post_date;

			if ( '' === $post_date || '0000-00-00 00:00:00' === $post_date ) {
				return null;
			}

			$dt = \DateTimeImmutable::createFromFormat(
				'Y-m-d H:i:s',
				$post_date,
				wp_timezone()
			);

			if ( $dt instanceof \DateTimeImmutable ) {
				return $dt;
			}

			return null;
		}

		/**
		 * Computes the date-boundary label for a given datetime and interval.
		 *
		 * @since 0.1.0
		 *
		 * @param \DateTimeImmutable $datetime The event start datetime.
		 * @param string             $interval The interval: day|week|month|year.
		 * @return string The formatted label, or empty string on invalid interval.
		 */
		private function compute_label( \DateTimeImmutable $datetime, string $interval ): string {
			$timestamp = $datetime->getTimestamp();

			switch ( $interval ) {
				case 'day':
					return (string) wp_date( 'l, F j, Y', $timestamp );

				case 'week':
					$day_of_week = (int) $datetime->format( 'N' );
					$monday      = $datetime->modify( '-' . ( $day_of_week - 1 ) . ' days' );
					$sunday      = $datetime->modify( '+' . ( 7 - $day_of_week ) . ' days' );

					$start_label = (string) wp_date( 'M j', $monday->getTimestamp() );
					$end_label   = (string) wp_date( 'M j, Y', $sunday->getTimestamp() );

					return sprintf(
						/* translators: %1$s: week start date (e.g., "Apr 27"), %2$s: week end date with year (e.g., "May 3, 2026"). */
						__( 'Week of %1$s – %2$s', 'gatherpress-timed-separator' ),
						$start_label,
						$end_label
					);

				case 'month':
					return (string) wp_date( 'F Y', $timestamp );

				case 'year':
					return (string) wp_date( 'Y', $timestamp );

				default:
					return '';
			}
		}
	}
}
