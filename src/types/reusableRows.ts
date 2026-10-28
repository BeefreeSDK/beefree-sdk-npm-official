import type { BeePluginFont } from './bee'

/**
 * Saved rows an MCP session can search and place in the template.
 * Pass it as `reusableRows` in the AI agent addon settings, or to
 * `startMcpSession({ reusableRows })`.
 *
 * Sent to the MCP worker when the session starts. A library over 1000 rows
 * or about 1.5 MB of row data is truncated, keeping the rows in the order
 * they are listed, and the builder reports it through `onWarning`
 * (code 1770). A row that breaks the limits below is not truncated: the
 * session fails to start. The whole session request is capped at 3.5 MB, and
 * everything in it but `reusableRows` (template, merge tags, brand rules...)
 * at 2 MB: beyond either, it is refused before any truncation. An empty
 * `entries` array counts as no library.
 */
export interface ReusableRows {
  entries: ReusableRow[]
  /**
   * The metadata field that holds your own key for each row, such as
   * `'customUUID'`. Max 64 characters. When set, every row must carry it,
   * with a unique value of at most 128 characters that does not start with
   * `rr_`, and the agent places a row by that key, also when it finds the key
   * in a template or email in its context. Without it, rows are identified by
   * their content.
   */
  rowIdentifierLabel?: string
}

/**
 * A saved row, as the builder produces it (e.g. from `onSaveRow`).
 * Properties not listed here are kept as they are.
 */
export interface ReusableRow {
  metadata: ReusableRowMetadata
  /** At least one column. */
  columns: Record<string, unknown>[]
  /** A synced row can be placed, but the agent never modifies it afterwards. */
  synced?: boolean
  /** Max 64 characters. */
  type?: string
  /** The fonts the row uses, added to the template when the row is placed. */
  webFonts?: BeePluginFont[]
  [k: string]: unknown
}

/**
 * The metadata the agent reads. Any other field (the builder's `uuid`, your
 * own ids or dates...) is kept as it is, but neither checked nor searched.
 */
export interface ReusableRowMetadata {
  /** Shown to the agent and searched. Non-empty, max 200 characters. */
  name: string
  /** A category name or id. As a string, non-empty and max 200 characters. */
  category?: string | number
  /**
   * One line on what the row is for. Highly recommended: the agent searches
   * it, and it is often what settles a choice between rows. Max 200 characters.
   */
  description?: string
  /**
   * An array of strings, or one comma-separated string (`'promo, blue'`), as
   * saved rows often store them: the row keeps the format you chose. Up to 12
   * tags, each non-empty and max 32 characters. In a string, the spaces around
   * each tag and the empty entries are ignored.
   */
  tags?: string[] | string
  [k: string]: unknown
}
