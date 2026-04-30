# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased](https://github.com/carstingaxion/gatherpress-timed-separator/compare/0.1.0...HEAD)

## [0.1.0](https://github.com/carstingaxion/gatherpress-timed-separator/compare/0.1.0...0.1.0) - 2026-04-30

- Initial release.
- Configurable interval: group posts by day, week, month, or year.
- Works with any post type using the published date as the default source.
- First-class GatherPress integration: reads event start datetime via the Core Event API or raw post meta.
- Automatic deduplication: consecutive posts in the same date period share a single separator label.
- Live editor preview: labels reflect actual queried post dates and update instantly on interval change.
- Duplicate dimming in the editor: separator instances hidden on the frontend appear visually faded.
- Full i18n support: all date labels are locale-aware via `wp_date()` and `dateI18n()`.
- Block editor design controls: alignment, colors, gradients, typography, spacing, shadows, and borders.
- Client navigation support via the Interactivity API.
