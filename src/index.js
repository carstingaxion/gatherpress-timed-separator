/**
 * GatherPress Timed Separator — Block Registration
 *
 * @package
 * @since   0.1.0
 */

import { registerBlockType } from '@wordpress/blocks';
import { SVG, Path } from '@wordpress/primitives';

import './style.scss';

import Edit from './edit';

import metadata from './block.json';

/**
 * Separator icon — matches the core/separator block icon.
 *
 * @type {import('@wordpress/element').WPElement}
 */
const separatorIcon = (
	<SVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<Path d="M4.5 12.5v4H3V7h1.5v3.987h15V7H21v9.5h-1.5v-4h-15Z" />
	</SVG>
);

/**
 * Register the GatherPress Timed Separator block.
 */
registerBlockType( metadata.name, {
	icon: separatorIcon,
	edit: Edit,
} );
