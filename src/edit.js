/**
 * GatherPress Timed Separator — Editor Component
 *
 * @package
 * @since   0.1.0
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Spinner } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import {
	useState,
	useEffect,
	useMemo,
	useRef,
	useCallback,
} from '@wordpress/element';
import { dateI18n } from '@wordpress/date';
import './editor.scss';

/**
 * Mapping of interval values to human-readable labels.
 *
 * @type {Object<string, string>}
 */
const INTERVAL_LABELS = {
	day: __( 'Day', 'gatherpress-timed-separator' ),
	week: __( 'Week', 'gatherpress-timed-separator' ),
	month: __( 'Month', 'gatherpress-timed-separator' ),
	year: __( 'Year', 'gatherpress-timed-separator' ),
};

/**
 * Fallback example labels for when no post context is available.
 *
 * @return {Object<string, string>}
 */
function getIntervalExamples() {
	const exampleDate = '2026-04-29T18:00:00';
	return {
		day: dateI18n( 'l, F j, Y', exampleDate ),
		week: computeLabel( new Date( 2026, 3, 29 ), 'week' ),
		month: dateI18n( 'F Y', exampleDate ),
		year: dateI18n( 'Y', exampleDate ),
	};
}

/**
 * Options array for the interval SelectControl.
 *
 * @type {Array<{label: string, value: string}>}
 */
const INTERVAL_OPTIONS = [
	{ label: __( 'Day', 'gatherpress-timed-separator' ), value: 'day' },
	{ label: __( 'Week', 'gatherpress-timed-separator' ), value: 'week' },
	{ label: __( 'Month', 'gatherpress-timed-separator' ), value: 'month' },
	{ label: __( 'Year', 'gatherpress-timed-separator' ), value: 'year' },
];

/**
 * Computes the date-boundary label from a Date object and interval.
 *
 * @param {Date}   date     The event date.
 * @param {string} interval The interval: day|week|month|year.
 * @return {string} The formatted label.
 */
function computeLabel( date, interval ) {
	const pad = ( n ) => String( n ).padStart( 2, '0' );
	const isoString = `${ date.getFullYear() }-${ pad(
		date.getMonth() + 1
	) }-${ pad( date.getDate() ) }T${ pad( date.getHours() ) }:${ pad(
		date.getMinutes()
	) }:${ pad( date.getSeconds() ) }`;

	switch ( interval ) {
		case 'day': {
			return dateI18n( 'l, F j, Y', isoString );
		}

		case 'week': {
			const jsDay = date.getDay();
			const isoDay = jsDay === 0 ? 7 : jsDay;
			const monday = new Date( date );
			monday.setDate( date.getDate() - ( isoDay - 1 ) );
			const sunday = new Date( monday );
			sunday.setDate( monday.getDate() + 6 );

			const mondayIso = `${ monday.getFullYear() }-${ pad(
				monday.getMonth() + 1
			) }-${ pad( monday.getDate() ) }T00:00:00`;
			const sundayIso = `${ sunday.getFullYear() }-${ pad(
				sunday.getMonth() + 1
			) }-${ pad( sunday.getDate() ) }T00:00:00`;

			const startLabel = dateI18n( 'M j', mondayIso );
			const endLabel = dateI18n( 'M j, Y', sundayIso );

			/* translators: %1$s: week start date (e.g., "Apr 27"), %2$s: week end date (e.g., "May 3, 2026"). */
			return wp.i18n.sprintf(
				__( 'Week of %1$s \u2013 %2$s', 'gatherpress-timed-separator' ),
				startLabel,
				endLabel
			);
		}

		case 'month': {
			return dateI18n( 'F Y', isoString );
		}

		case 'year': {
			return dateI18n( 'Y', isoString );
		}

		default:
			return '';
	}
}

/**
 * Custom hook that fetches the GatherPress event datetime for a given post.
 *
 * @param {number} postId   The post ID.
 * @param {string} postType The post type.
 * @return {{ date: Date|null, isLoading: boolean }}
 */
function useEventDate( postId, postType ) {
	const [ gpDate, setGpDate ] = useState( null );
	const [ gpLoading, setGpLoading ] = useState( false );
	const [ gpAttempted, setGpAttempted ] = useState( false );

	useEffect( () => {
		if ( ! postId || postType !== 'gatherpress_event' ) {
			setGpAttempted( true );
			return;
		}

		setGpLoading( true );
		setGpAttempted( false );

		const controller = new AbortController();

		fetch(
			`${
				window.wpApiSettings?.root || '/wp-json/'
			}gatherpress/v1/event/${ postId }`,
			{
				headers: {
					'X-WP-Nonce': window.wpApiSettings?.nonce || '',
				},
				signal: controller.signal,
			}
		)
			.then( ( response ) => {
				if ( ! response.ok ) {
					throw new Error( 'GatherPress endpoint not available' );
				}
				return response.json();
			} )
			.then( ( data ) => {
				const dtString =
					data?.datetime?.datetime_start_gmt ||
					data?.datetime?.datetime_start ||
					data?.datetime_start_gmt ||
					data?.datetime_start ||
					null;

				if ( dtString ) {
					const parsed = new Date(
						dtString.replace( ' ', 'T' ) + 'Z'
					);
					if ( ! isNaN( parsed.getTime() ) ) {
						setGpDate( parsed );
					}
				}
				setGpLoading( false );
				setGpAttempted( true );
			} )
			.catch( () => {
				setGpLoading( false );
				setGpAttempted( true );
			} );

		return () => controller.abort();
	}, [ postId, postType ] );

	const postDate = useSelect(
		( select ) => {
			if ( ! postId ) {
				return null;
			}
			const post = select( 'core' ).getEntityRecord(
				'postType',
				postType || 'gatherpress_event',
				postId
			);
			return post?.date || null;
		},
		[ postId, postType ]
	);

	const isResolving = useSelect(
		( select ) => {
			if ( ! postId ) {
				return false;
			}
			return select( 'core/data' ).isResolving(
				'core',
				'getEntityRecord',
				[ 'postType', postType || 'gatherpress_event', postId ]
			);
		},
		[ postId, postType ]
	);

	const finalDate = useMemo( () => {
		if ( gpDate ) {
			return gpDate;
		}
		if ( gpAttempted && postDate ) {
			const parsed = new Date( postDate );
			if ( ! isNaN( parsed.getTime() ) ) {
				return parsed;
			}
		}
		return null;
	}, [ gpDate, gpAttempted, postDate ] );

	const isLoading = gpLoading || ( ! gpAttempted && ! gpDate ) || isResolving;

	return { date: finalDate, isLoading };
}

/*
 * ──────────────────────────────────────────────────────────
 * Shared global registry for separator label deduplication
 * ──────────────────────────────────────────────────────────
 *
 * Each separator instance registers { postId, label, timestamp }
 * into a Map keyed by `queryId:interval`. Instances are stored in
 * an array ordered by their event timestamp so that position in
 * the rendered query is respected. When the registry changes, a
 * CustomEvent is dispatched so all instances can re-evaluate.
 */

const REGISTRY_EVENT = 'gp-timed-sep-registry-change';

/**
 * Global registry: Map<string, Array<{ postId: number, label: string, domIndex: number }>>
 */
if ( ! window.__gpTimedSepRegistry ) {
	window.__gpTimedSepRegistry = new Map();
}

/**
 * Builds a registry key from query context and interval.
 *
 * @param {number|string} queryId  The query ID from block context.
 * @param {string}        interval The selected interval.
 * @return {string} The registry key.
 */
function registryKey( queryId, interval ) {
	return `${ queryId || 0 }:${ interval }`;
}

/**
 * Registers (or updates) this separator instance in the global registry.
 *
 * @param {string} key      The registry key.
 * @param {number} postId   The post ID for this instance.
 * @param {string} label    The computed label.
 * @param {number} domIndex The DOM position index of this instance.
 */
function registrySet( key, postId, label, domIndex ) {
	const registry = window.__gpTimedSepRegistry;
	let entries = registry.get( key );

	if ( ! entries ) {
		entries = [];
		registry.set( key, entries );
	}

	const existing = entries.findIndex( ( e ) => e.postId === postId );
	if ( existing !== -1 ) {
		const prev = entries[ existing ];
		if ( prev.label === label && prev.domIndex === domIndex ) {
			return; // No change, skip dispatch.
		}
		entries[ existing ] = { postId, label, domIndex };
	} else {
		entries.push( { postId, label, domIndex } );
	}

	// Sort by DOM index so the walk order matches the rendered post order.
	entries.sort( ( a, b ) => a.domIndex - b.domIndex );

	document.dispatchEvent(
		new CustomEvent( REGISTRY_EVENT, { detail: { key } } )
	);
}

/**
 * Removes a separator instance from the registry (cleanup on unmount).
 *
 * @param {string} key    The registry key.
 * @param {number} postId The post ID to remove.
 */
function registryRemove( key, postId ) {
	const registry = window.__gpTimedSepRegistry;
	const entries = registry.get( key );

	if ( ! entries ) {
		return;
	}

	const idx = entries.findIndex( ( e ) => e.postId === postId );
	if ( idx !== -1 ) {
		entries.splice( idx, 1 );
		document.dispatchEvent(
			new CustomEvent( REGISTRY_EVENT, { detail: { key } } )
		);
	}
}

/**
 * Checks whether a given postId is a duplicate in the ordered registry.
 * A duplicate is any entry whose label matches the label of the entry
 * immediately before it in the sorted list.
 *
 * @param {string} key    The registry key.
 * @param {number} postId The post ID to check.
 * @return {boolean} True if this instance is a duplicate.
 */
function registryIsDuplicate( key, postId ) {
	const entries = window.__gpTimedSepRegistry.get( key );

	if ( ! entries || entries.length < 2 ) {
		return false;
	}

	let prevLabel = '';
	for ( const entry of entries ) {
		if ( entry.postId === postId ) {
			return entry.label !== '' && entry.label === prevLabel;
		}
		if ( entry.label ) {
			prevLabel = entry.label;
		}
	}

	return false;
}

/**
 * Determines the DOM index of a separator element within its
 * post-template container by finding all separator elements
 * with the same data attribute and returning this element's position.
 *
 * @param {HTMLElement|null} el     The block's DOM element.
 * @param {number}           postId The post ID.
 * @return {number} The zero-based DOM index, or 0 if not determinable.
 */
function getDomIndex( el, postId ) {
	if ( ! el ) {
		return 0;
	}

	// Walk up to find the post-template wrapper.
	let container = el.closest( '.wp-block-post-template' );
	if ( ! container ) {
		// In the editor the post-template might use a different selector.
		container = el.closest( '[class*="post-template"]' );
	}
	if ( ! container ) {
		// Fallback: use the entire editor canvas.
		container = el.closest( '.editor-styles-wrapper' ) || document.body;
	}

	// Find all separator instances within this container.
	const allSeps = container.querySelectorAll( '[data-gp-post-id]' );
	let index = 0;
	for ( let i = 0; i < allSeps.length; i++ ) {
		if ( allSeps[ i ] === el ) {
			return i;
		}
		// Also check if the data attribute matches (for cases where
		// the element reference isn't the same but the post ID is).
		if (
			Number( allSeps[ i ].getAttribute( 'data-gp-post-id' ) ) === postId
		) {
			index = i;
		}
	}
	return index;
}

/**
 * Custom hook that subscribes to the registry and returns
 * whether this separator instance is a duplicate.
 *
 * @param {number|string}                          queryId  The query ID from block context.
 * @param {string}                                 interval The selected interval.
 * @param {number}                                 postId   The current post ID.
 * @param {string|null}                            label    The computed label.
 * @param {import('@wordpress/element').RefObject} blockRef A ref to the block DOM element.
 * @return {boolean} True if this instance should be dimmed.
 */
function useIsDuplicate( queryId, interval, postId, label, blockRef ) {
	const [ isDuplicate, setIsDuplicate ] = useState( false );
	const [ domIndex, setDomIndex ] = useState( 0 );
	const key = registryKey( queryId, interval );

	// Determine DOM index after mount and when label changes.
	useEffect( () => {
		// Use a small delay so the DOM has settled after render.
		const timer = setTimeout( () => {
			const idx = getDomIndex( blockRef.current, postId );
			setDomIndex( idx );
		}, 50 );
		return () => clearTimeout( timer );
	}, [ blockRef, postId, label ] );

	// Register this instance whenever label or domIndex changes.
	useEffect( () => {
		if ( ! postId || ! label ) {
			return;
		}

		registrySet( key, postId, label, domIndex );

		return () => {
			registryRemove( key, postId );
		};
	}, [ key, postId, label, domIndex ] );

	// Recompute duplicate status whenever the registry changes.
	const recompute = useCallback( () => {
		if ( ! postId || ! label ) {
			setIsDuplicate( false );
			return;
		}
		setIsDuplicate( registryIsDuplicate( key, postId ) );
	}, [ key, postId, label ] );

	// Subscribe to registry changes.
	useEffect( () => {
		/**
		 * @param {CustomEvent} e The registry change event.
		 */
		const handler = ( e ) => {
			if ( e.detail?.key === key ) {
				recompute();
			}
		};

		document.addEventListener( REGISTRY_EVENT, handler );
		// Initial check.
		recompute();

		return () => {
			document.removeEventListener( REGISTRY_EVENT, handler );
		};
	}, [ key, recompute ] );

	return isDuplicate;
}

/**
 * Edit component for the GatherPress Timed Separator block.
 *
 * @since 0.1.0
 * @param          props.attributes
 * @param          props.setAttributes
 * @param          props.context
 *
 * @param {Object} props               Block edit props.
 * @return {import('@wordpress/element').WPElement} The editor UI.
 */
export default function Edit( { attributes, setAttributes, context } ) {
	const { interval } = attributes;
	const postId = context?.postId || 0;
	const postType = context?.postType || 'gatherpress_event';
	const queryId = context?.queryId || 0;
	const blockRef = useRef( null );

	const { date: eventDate, isLoading } = useEventDate( postId, postType );

	const label = useMemo( () => {
		if ( eventDate ) {
			return computeLabel( eventDate, interval );
		}
		return null;
	}, [ eventDate, interval ] );

	const intervalExamples = useMemo(
		() => getIntervalExamples(),
		[ interval ]
	);
	const displayLabel =
		label || intervalExamples[ interval ] || intervalExamples.month;
	const isLive = !! label;

	const isDuplicate = useIsDuplicate(
		queryId,
		interval,
		postId,
		label,
		blockRef
	);

	/**
	 * Update the block's metadata.name to reflect the selected interval.
	 */
	const prevIntervalRef = useRef( interval );
	useEffect( () => {
		if (
			prevIntervalRef.current !== interval ||
			! attributes.metadata?.name
		) {
			const intervalLabel =
				INTERVAL_LABELS[ interval ] || INTERVAL_LABELS.month;
			setAttributes( {
				metadata: {
					...( attributes.metadata || {} ),
					name: `${ __(
						'Timed Separator',
						'gatherpress-timed-separator'
					) } — ${ intervalLabel }`,
				},
			} );
			prevIntervalRef.current = interval;
		}
	}, [ interval ] );

	const blockProps = useBlockProps( {
		ref: blockRef,
		className: [
			'gatherpress-timed-separator',
			isDuplicate ? 'gatherpress-timed-separator--dimmed' : '',
		]
			.filter( Boolean )
			.join( ' ' ),
		'data-gp-post-id': postId || undefined,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __(
						'Separator Settings',
						'gatherpress-timed-separator'
					) }
					initialOpen={ true }
				>
					<SelectControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __(
							'Separation Interval',
							'gatherpress-timed-separator'
						) }
						help={ __(
							'Choose how events are grouped. A separator label will appear when the boundary of this interval changes between consecutive events.',
							'gatherpress-timed-separator'
						) }
						value={ interval }
						options={ INTERVAL_OPTIONS }
						onChange={ ( value ) =>
							setAttributes( { interval: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				{ isLoading ? (
					<div className="gatherpress-timed-separator__loading">
						<Spinner />
					</div>
				) : (
					<>
						<div className="gatherpress-timed-separator__inner">
							<span
								className="gatherpress-timed-separator__line"
								aria-hidden="true"
							></span>
							<span className="gatherpress-timed-separator__label">
								{ displayLabel }
							</span>
							<span
								className="gatherpress-timed-separator__line"
								aria-hidden="true"
							></span>
						</div>
						<p className="gatherpress-timed-separator__hint">
							{ __(
								'Timed Separator',
								'gatherpress-timed-separator'
							) }
							{ ' — ' }
							{ INTERVAL_LABELS[ interval ] ||
								INTERVAL_LABELS.month }
							{ isDuplicate && (
								<>
									{ ' · ' }
									{ __(
										'Hidden on frontend (duplicate)',
										'gatherpress-timed-separator'
									) }
								</>
							) }
							{ ! isLive && ! isDuplicate && (
								<>
									{ ' · ' }
									{ __(
										'Example preview (no post context)',
										'gatherpress-timed-separator'
									) }
								</>
							) }
						</p>
					</>
				) }
			</div>
		</>
	);
}
