/**
 * The folders of the end user's File Manager the agent can use in an MCP
 * session. Pass it as `fileManager` in the AI agent addon settings, or to
 * `startMcpSession({ fileManager })`.
 *
 * The agent works in the File Manager of the `uid` the editor was started
 * with: only the folders are passed. Without `fileManager`, the session has
 * no File Manager tools; `{}` gives every operation the default folder.
 *
 * A path starts with `/` (`/` alone is the whole File Manager) and matches
 * exactly, case included. Up to 20 folders per list, each max 512
 * characters. An invalid `fileManager` makes the session fail to start.
 */
export interface McpFileManager {
  /**
   * The folders the agent can list and search, with every folder inside them.
   * Left out, `['/AI Generated Images']`; `[]` turns listing and searching off.
   */
  readPaths?: string[]
  /**
   * The folders the agent can save files to, directly or in a folder that
   * already exists inside them. Left out, `['/AI Generated Images']`; `[]`
   * turns uploading off.
   */
  uploadPaths?: string[]
  /**
   * The folders the agent can delete files from, with every folder inside
   * them. Left out, `['/AI Generated Images']`; `[]` turns deleting off.
   */
  deletePaths?: string[]
}
