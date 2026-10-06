import type { BeePluginFont } from './bee'

/**
 * Saved rows an MCP session can search and place in the template.
 * Sent to the MCP worker when the session starts; a library over 1000 rows
 * or 1.5 MB is truncated, keeping the rows in the order they are listed.
 */
export interface McpReusableRows {
  entries: McpReusableRow[]
}

/**
 * A saved row, as the builder produces it (e.g. from `onSaveRow`).
 * Properties not listed here are kept as they are.
 */
export interface McpReusableRow {
  metadata: McpReusableRowMetadata
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

export interface McpReusableRowMetadata {
  /** Shown to the agent and searched. Max 200 characters. */
  name: string
  /** A category name or id. Max 200 characters. */
  category?: string | number
  /** Max 64 characters. */
  uuid?: string
  /** Max 200 characters. */
  slug?: string
  /** Max 200 characters. */
  description?: string
  /** Up to 12 tags, max 32 characters each. */
  tags?: string[]
  [k: string]: unknown
}
