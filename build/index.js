/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/edit.js"
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/date */ "@wordpress/date");
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_date__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);
/**
 * GatherPress Timed Separator — Editor Component
 *
 * @package GatherpressTimedSeparator
 * @since   0.1.0
 */









/**
 * Mapping of interval values to human-readable labels.
 *
 * @type {Object<string, string>}
 */

const INTERVAL_LABELS = {
  day: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Day', 'gatherpress-timed-separator'),
  week: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Week', 'gatherpress-timed-separator'),
  month: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Month', 'gatherpress-timed-separator'),
  year: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Year', 'gatherpress-timed-separator')
};

/**
 * Fallback example labels for when no post context is available.
 *
 * @return {Object<string, string>}
 */
function getIntervalExamples() {
  const exampleDate = '2026-04-29T18:00:00';
  return {
    day: (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_5__.dateI18n)('l, F j, Y', exampleDate),
    week: computeLabel(new Date(2026, 3, 29), 'week'),
    month: (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_5__.dateI18n)('F Y', exampleDate),
    year: (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_5__.dateI18n)('Y', exampleDate)
  };
}

/**
 * Options array for the interval SelectControl.
 *
 * @type {Array<{label: string, value: string}>}
 */
const INTERVAL_OPTIONS = [{
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Day', 'gatherpress-timed-separator'),
  value: 'day'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Week', 'gatherpress-timed-separator'),
  value: 'week'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Month', 'gatherpress-timed-separator'),
  value: 'month'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Year', 'gatherpress-timed-separator'),
  value: 'year'
}];

/**
 * Computes the date-boundary label from a Date object and interval.
 *
 * @param {Date}   date     The event date.
 * @param {string} interval The interval: day|week|month|year.
 * @return {string} The formatted label.
 */
function computeLabel(date, interval) {
  const pad = n => String(n).padStart(2, '0');
  const isoString = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  switch (interval) {
    case 'day':
      {
        return (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_5__.dateI18n)('l, F j, Y', isoString);
      }
    case 'week':
      {
        const jsDay = date.getDay();
        const isoDay = jsDay === 0 ? 7 : jsDay;
        const monday = new Date(date);
        monday.setDate(date.getDate() - (isoDay - 1));
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        const mondayIso = `${monday.getFullYear()}-${pad(monday.getMonth() + 1)}-${pad(monday.getDate())}T00:00:00`;
        const sundayIso = `${sunday.getFullYear()}-${pad(sunday.getMonth() + 1)}-${pad(sunday.getDate())}T00:00:00`;
        const startLabel = (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_5__.dateI18n)('M j', mondayIso);
        const endLabel = (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_5__.dateI18n)('M j, Y', sundayIso);

        /* translators: %1$s: week start date (e.g., "Apr 27"), %2$s: week end date (e.g., "May 3, 2026"). */
        return wp.i18n.sprintf((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Week of %1$s \u2013 %2$s', 'gatherpress-timed-separator'), startLabel, endLabel);
      }
    case 'month':
      {
        return (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_5__.dateI18n)('F Y', isoString);
      }
    case 'year':
      {
        return (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_5__.dateI18n)('Y', isoString);
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
function useEventDate(postId, postType) {
  const [gpDate, setGpDate] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(null);
  const [gpLoading, setGpLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
  const [gpAttempted, setGpAttempted] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    if (!postId || postType !== 'gatherpress_event') {
      setGpAttempted(true);
      return;
    }
    setGpLoading(true);
    setGpAttempted(false);
    const controller = new AbortController();
    fetch(`${window.wpApiSettings?.root || '/wp-json/'}gatherpress/v1/event/${postId}`, {
      headers: {
        'X-WP-Nonce': window.wpApiSettings?.nonce || ''
      },
      signal: controller.signal
    }).then(response => {
      if (!response.ok) {
        throw new Error('GatherPress endpoint not available');
      }
      return response.json();
    }).then(data => {
      const dtString = data?.datetime?.datetime_start_gmt || data?.datetime?.datetime_start || data?.datetime_start_gmt || data?.datetime_start || null;
      if (dtString) {
        const parsed = new Date(dtString.replace(' ', 'T') + 'Z');
        if (!isNaN(parsed.getTime())) {
          setGpDate(parsed);
        }
      }
      setGpLoading(false);
      setGpAttempted(true);
    }).catch(() => {
      setGpLoading(false);
      setGpAttempted(true);
    });
    return () => controller.abort();
  }, [postId, postType]);
  const postDate = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    if (!postId) {
      return null;
    }
    const post = select('core').getEntityRecord('postType', postType || 'gatherpress_event', postId);
    return post?.date || null;
  }, [postId, postType]);
  const isResolving = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    if (!postId) {
      return false;
    }
    return select('core/data').isResolving('core', 'getEntityRecord', ['postType', postType || 'gatherpress_event', postId]);
  }, [postId, postType]);
  const finalDate = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useMemo)(() => {
    if (gpDate) {
      return gpDate;
    }
    if (gpAttempted && postDate) {
      const parsed = new Date(postDate);
      if (!isNaN(parsed.getTime())) {
        return parsed;
      }
    }
    return null;
  }, [gpDate, gpAttempted, postDate]);
  const isLoading = gpLoading || !gpAttempted && !gpDate || isResolving;
  return {
    date: finalDate,
    isLoading
  };
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
if (!window.__gpTimedSepRegistry) {
  window.__gpTimedSepRegistry = new Map();
}

/**
 * Builds a registry key from query context and interval.
 *
 * @param {number|string} queryId  The query ID from block context.
 * @param {string}        interval The selected interval.
 * @return {string} The registry key.
 */
function registryKey(queryId, interval) {
  return `${queryId || 0}:${interval}`;
}

/**
 * Registers (or updates) this separator instance in the global registry.
 *
 * @param {string} key      The registry key.
 * @param {number} postId   The post ID for this instance.
 * @param {string} label    The computed label.
 * @param {number} domIndex The DOM position index of this instance.
 */
function registrySet(key, postId, label, domIndex) {
  const registry = window.__gpTimedSepRegistry;
  let entries = registry.get(key);
  if (!entries) {
    entries = [];
    registry.set(key, entries);
  }
  const existing = entries.findIndex(e => e.postId === postId);
  if (existing !== -1) {
    const prev = entries[existing];
    if (prev.label === label && prev.domIndex === domIndex) {
      return; // No change, skip dispatch.
    }
    entries[existing] = {
      postId,
      label,
      domIndex
    };
  } else {
    entries.push({
      postId,
      label,
      domIndex
    });
  }

  // Sort by DOM index so the walk order matches the rendered post order.
  entries.sort((a, b) => a.domIndex - b.domIndex);
  document.dispatchEvent(new CustomEvent(REGISTRY_EVENT, {
    detail: {
      key
    }
  }));
}

/**
 * Removes a separator instance from the registry (cleanup on unmount).
 *
 * @param {string} key    The registry key.
 * @param {number} postId The post ID to remove.
 */
function registryRemove(key, postId) {
  const registry = window.__gpTimedSepRegistry;
  const entries = registry.get(key);
  if (!entries) {
    return;
  }
  const idx = entries.findIndex(e => e.postId === postId);
  if (idx !== -1) {
    entries.splice(idx, 1);
    document.dispatchEvent(new CustomEvent(REGISTRY_EVENT, {
      detail: {
        key
      }
    }));
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
function registryIsDuplicate(key, postId) {
  const entries = window.__gpTimedSepRegistry.get(key);
  if (!entries || entries.length < 2) {
    return false;
  }
  let prevLabel = '';
  for (const entry of entries) {
    if (entry.postId === postId) {
      return entry.label !== '' && entry.label === prevLabel;
    }
    if (entry.label) {
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
 * @param {HTMLElement|null} el       The block's DOM element.
 * @param {number}           postId   The post ID.
 * @return {number} The zero-based DOM index, or 0 if not determinable.
 */
function getDomIndex(el, postId) {
  if (!el) {
    return 0;
  }

  // Walk up to find the post-template wrapper.
  let container = el.closest('.wp-block-post-template');
  if (!container) {
    // In the editor the post-template might use a different selector.
    container = el.closest('[class*="post-template"]');
  }
  if (!container) {
    // Fallback: use the entire editor canvas.
    container = el.closest('.editor-styles-wrapper') || document.body;
  }

  // Find all separator instances within this container.
  const allSeps = container.querySelectorAll('[data-gp-post-id]');
  let index = 0;
  for (let i = 0; i < allSeps.length; i++) {
    if (allSeps[i] === el) {
      return i;
    }
    // Also check if the data attribute matches (for cases where
    // the element reference isn't the same but the post ID is).
    if (Number(allSeps[i].getAttribute('data-gp-post-id')) === postId) {
      index = i;
    }
  }
  return index;
}

/**
 * Custom hook that subscribes to the registry and returns
 * whether this separator instance is a duplicate.
 *
 * @param {number|string}              queryId   The query ID from block context.
 * @param {string}                     interval  The selected interval.
 * @param {number}                     postId    The current post ID.
 * @param {string|null}                label     The computed label.
 * @param {import('@wordpress/element').RefObject} blockRef  A ref to the block DOM element.
 * @return {boolean} True if this instance should be dimmed.
 */
function useIsDuplicate(queryId, interval, postId, label, blockRef) {
  const [isDuplicate, setIsDuplicate] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
  const [domIndex, setDomIndex] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(0);
  const key = registryKey(queryId, interval);

  // Determine DOM index after mount and when label changes.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    // Use a small delay so the DOM has settled after render.
    const timer = setTimeout(() => {
      const idx = getDomIndex(blockRef.current, postId);
      setDomIndex(idx);
    }, 50);
    return () => clearTimeout(timer);
  }, [blockRef, postId, label]);

  // Register this instance whenever label or domIndex changes.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    if (!postId || !label) {
      return;
    }
    registrySet(key, postId, label, domIndex);
    return () => {
      registryRemove(key, postId);
    };
  }, [key, postId, label, domIndex]);

  // Recompute duplicate status whenever the registry changes.
  const recompute = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(() => {
    if (!postId || !label) {
      setIsDuplicate(false);
      return;
    }
    setIsDuplicate(registryIsDuplicate(key, postId));
  }, [key, postId, label]);

  // Subscribe to registry changes.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    /**
     * @param {CustomEvent} e The registry change event.
     */
    const handler = e => {
      if (e.detail?.key === key) {
        recompute();
      }
    };
    document.addEventListener(REGISTRY_EVENT, handler);
    // Initial check.
    recompute();
    return () => {
      document.removeEventListener(REGISTRY_EVENT, handler);
    };
  }, [key, recompute]);
  return isDuplicate;
}

/**
 * Edit component for the GatherPress Timed Separator block.
 *
 * @since 0.1.0
 *
 * @param {Object} props Block edit props.
 * @return {import('@wordpress/element').WPElement} The editor UI.
 */
function Edit({
  attributes,
  setAttributes,
  context
}) {
  const {
    interval
  } = attributes;
  const postId = context?.postId || 0;
  const postType = context?.postType || 'gatherpress_event';
  const queryId = context?.queryId || 0;
  const blockRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useRef)(null);
  const {
    date: eventDate,
    isLoading
  } = useEventDate(postId, postType);
  const label = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useMemo)(() => {
    if (eventDate) {
      return computeLabel(eventDate, interval);
    }
    return null;
  }, [eventDate, interval]);
  const intervalExamples = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useMemo)(() => getIntervalExamples(), [interval]);
  const displayLabel = label || intervalExamples[interval] || intervalExamples.month;
  const isLive = !!label;
  const isDuplicate = useIsDuplicate(queryId, interval, postId, label, blockRef);

  /**
   * Update the block's metadata.name to reflect the selected interval.
   */
  const prevIntervalRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useRef)(interval);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    if (prevIntervalRef.current !== interval || !attributes.metadata?.name) {
      const intervalLabel = INTERVAL_LABELS[interval] || INTERVAL_LABELS.month;
      setAttributes({
        metadata: {
          ...(attributes.metadata || {}),
          name: `${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Timed Separator', 'gatherpress-timed-separator')} — ${intervalLabel}`
        }
      });
      prevIntervalRef.current = interval;
    }
  }, [interval]);
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
    ref: blockRef,
    className: ['gatherpress-timed-separator', isDuplicate ? 'gatherpress-timed-separator--dimmed' : ''].filter(Boolean).join(' '),
    'data-gp-post-id': postId || undefined
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Separator Settings', 'gatherpress-timed-separator'),
        initialOpen: true,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Separation Interval', 'gatherpress-timed-separator'),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Choose how events are grouped. A separator label will appear when the boundary of this interval changes between consecutive events.', 'gatherpress-timed-separator'),
          value: interval,
          options: INTERVAL_OPTIONS,
          onChange: value => setAttributes({
            interval: value
          })
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      ...blockProps,
      children: isLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
        className: "gatherpress-timed-separator__loading",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, {})
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
          className: "gatherpress-timed-separator__inner",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
            className: "gatherpress-timed-separator__line",
            "aria-hidden": "true"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
            className: "gatherpress-timed-separator__label",
            children: displayLabel
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
            className: "gatherpress-timed-separator__line",
            "aria-hidden": "true"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("p", {
          className: "gatherpress-timed-separator__hint",
          children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Timed Separator', 'gatherpress-timed-separator'), ' — ', INTERVAL_LABELS[interval] || INTERVAL_LABELS.month, isDuplicate && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
            children: [' · ', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hidden on frontend (duplicate)', 'gatherpress-timed-separator')]
          }), !isLive && !isDuplicate && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
            children: [' · ', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Example preview (no post context)', 'gatherpress-timed-separator')]
          })]
        })]
      })
    })]
  });
}

/***/ },

/***/ "./src/index.js"
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/block.json");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
/**
 * GatherPress Timed Separator — Block Registration
 *
 * @package GatherpressTimedSeparator
 * @since   0.1.0
 */







/**
 * Separator icon — matches the core/separator block icon.
 *
 * @type {import('@wordpress/element').WPElement}
 */

const separatorIcon = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
    d: "M4.5 12.5v4H3V7h1.5v3.987h15V7H21v9.5h-1.5v-4h-15Z"
  })
});

/**
 * Register the GatherPress Timed Separator block.
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  icon: separatorIcon,
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ },

/***/ "./src/editor.scss"
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/style.scss"
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ },

/***/ "@wordpress/block-editor"
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
(module) {

module.exports = window["wp"]["blockEditor"];

/***/ },

/***/ "@wordpress/blocks"
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
(module) {

module.exports = window["wp"]["blocks"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/data"
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["data"];

/***/ },

/***/ "@wordpress/date"
/*!******************************!*\
  !*** external ["wp","date"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["date"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ },

/***/ "@wordpress/primitives"
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["primitives"];

/***/ },

/***/ "./src/block.json"
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"gatherpress/timed-separator","version":"0.1.0","title":"GatherPress Timed Separator","category":"design","description":"A dynamic separator block for GatherPress event query loops that displays date-boundary labels (day, week, month, or year) between event posts.","example":{"attributes":{"interval":"month"}},"attributes":{"interval":{"type":"string","default":"month","enum":["day","week","month","year"]},"metadata":{"type":"object"}},"ancestor":["core/post-template"],"usesContext":["postId","postType"],"supports":{"html":false,"align":["wide","full"],"color":{"background":true,"text":true,"gradients":true},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true,"__experimentalTextTransform":true},"spacing":{"margin":true,"padding":true},"shadow":true,"__experimentalBorder":{"color":true,"radius":true,"style":true,"width":true,"__experimentalDefaultControls":{"color":true,"radius":true,"style":true,"width":true}},"interactivity":{"clientNavigation":true}},"textdomain":"gatherpress-timed-separator","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php"}');

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkgatherpress_timed_separator"] = globalThis["webpackChunkgatherpress_timed_separator"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map