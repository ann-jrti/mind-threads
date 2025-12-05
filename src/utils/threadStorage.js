/**
 * Thread storage utilities for managing thread data
 */

export const THREADS_STORAGE_KEY = "mind-threads:threads";
export const ARCHIVED_THREADS_KEY = "mind-threads:archived";

/**
 * Create a new thread object with default structure
 * @param {string} title - The thread title
 * @returns {Object} - The new thread object
 */
export function createThread(title) {
  return {
    id: Date.now(),
    title,
    updates: [],
    actions: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Add an update to a thread
 * @param {Object} thread - The thread object
 * @param {string} text - The update text
 * @returns {Object} - The updated thread object
 */
export function addUpdateToThread(thread, text) {
  return {
    ...thread,
    updates: [
      ...thread.updates,
      {
        id: Date.now(),
        text,
        createdAt: new Date().toISOString(),
      },
    ],
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Update an existing update in a thread
 * @param {Object} thread - The thread object
 * @param {number} updateId - The ID of the update to update
 * @param {string} newText - The new text for the update
 * @returns {Object} - The updated thread object
 */
export function updateUpdateInThread(thread, updateId, newText) {
  return {
    ...thread,
    updates: thread.updates.map((update) =>
      update.id === updateId
        ? { ...update, text: newText, updatedAt: new Date().toISOString() }
        : update
    ),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Archive a thread
 * @param {Object} thread - The thread object to archive
 * @returns {Object} - The archived thread object with archivedAt timestamp
 */
export function archiveThread(thread) {
  return {
    ...thread,
    archivedAt: new Date().toISOString(),
  };
}

/**
 * Add an action to a thread
 * @param {Object} thread - The thread object
 * @param {string} text - The action text
 * @returns {Object} - The updated thread object
 */
export function addActionToThread(thread, text) {
  return {
    ...thread,
    actions: [
      ...thread.actions,
      {
        id: Date.now(),
        text,
        createdAt: new Date().toISOString(),
      },
    ],
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Remove an action from a thread
 * @param {Object} thread - The thread object
 * @param {number} actionId - The ID of the action to remove
 * @returns {Object} - The updated thread object
 */
export function removeActionFromThread(thread, actionId) {
  return {
    ...thread,
    actions: thread.actions.filter((action) => action.id !== actionId),
    updatedAt: new Date().toISOString(),
  };
}
