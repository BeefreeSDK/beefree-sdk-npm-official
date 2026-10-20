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
 * session fails to start. The whole session request, template included, is
 * also capped at 2 MB: a larger one is refused before any truncation.
 */
export interface ReusableRows {
  entries: ReusableRow[]
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
