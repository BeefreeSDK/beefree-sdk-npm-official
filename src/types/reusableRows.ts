import type { BeePluginFont } from './bee'

/**
 * Saved rows an MCP session can search and place in the template.
 * Set it as `mcpReusableRows` in the config, or as `reusableRows` in the
 * AI agent addon settings, which takes precedence for the agent's sessions.
 *
 * Sent to the MCP worker when the session starts. A library over 1000 rows
 * or about 1.5 MB of row data is truncated, keeping the rows in the order
 * they are listed, and the builder reports it through `onWarning`
 * (code 5120). A row that breaks the limits below is not truncated: the
 * session fails to start.
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

export interface ReusableRowMetadata {
  /** Shown to the agent and searched. Non-empty, max 200 characters. */
  name: string
  /** A category name or id. As a string, non-empty and max 200 characters. */
  category?: string | number
  /** Non-empty, max 64 characters. */
  uuid?: string
  /** Max 200 characters. */
  slug?: string
  /** Max 200 characters. */
  description?: string
  /** Up to 12 tags, each non-empty and max 32 characters. */
  tags?: string[]
  [k: string]: unknown
}
