<?php
/**
 * GatherPress Timed Separator — Server-Side Render
 *
 * This file is referenced in block.json as the `render` callback for the
 * dynamic block. WordPress calls this file for every instance of the block
 * during frontend page rendering.
 *
 * Available variables (provided by WordPress block rendering context):
 *
 * @var array<string, mixed> $attributes Block attributes.
 * @var string               $content    Inner block content (empty for this block).
 * @var WP_Block             $block      The block instance, including context.
 *
 * @package GatherpressTimedSeparator
 * @since   0.1.0
 */

declare(strict_types=1);

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$gatherpress_timed_separator_renderer = GatherpressTimedSeparator\Renderer::get_instance();

// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Renderer::render() escapes all output internally.
echo $gatherpress_timed_separator_renderer->render( $attributes, $content, $block );
