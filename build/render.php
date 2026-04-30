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
 * @var string $content Inner block content (empty for this block).
 * @var WP_Block $block The block instance, including context.
 *
 * @package GatherpressTimedSeparator
 * @since   0.1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$renderer = GatherpressTimedSeparator\Renderer::get_instance();
echo $renderer->render( $attributes, $content, $block );
