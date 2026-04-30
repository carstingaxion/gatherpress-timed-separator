<?php
// This file is generated. Do not modify it manually.
return array(
	'build' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'gatherpress/timed-separator',
		'version' => '0.1.0',
		'title' => 'GatherPress Timed Separator',
		'category' => 'design',
		'description' => 'A dynamic separator block for GatherPress event query loops that displays date-boundary labels (day, week, month, or year) between event posts.',
		'example' => array(
			'attributes' => array(
				'interval' => 'month'
			)
		),
		'attributes' => array(
			'interval' => array(
				'type' => 'string',
				'default' => 'month',
				'enum' => array(
					'day',
					'week',
					'month',
					'year'
				)
			),
			'metadata' => array(
				'type' => 'object'
			)
		),
		'ancestor' => array(
			'core/post-template'
		),
		'usesContext' => array(
			'postId',
			'postType'
		),
		'supports' => array(
			'html' => false,
			'align' => array(
				'wide',
				'full'
			),
			'color' => array(
				'background' => true,
				'text' => true,
				'gradients' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalTextTransform' => true
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true
			),
			'shadow' => true,
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'radius' => true,
					'style' => true,
					'width' => true
				)
			),
			'interactivity' => array(
				'clientNavigation' => true
			)
		),
		'textdomain' => 'gatherpress-timed-separator',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	)
);
