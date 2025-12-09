/**
 * Thread storage utilities for managing thread data
 */

export const THREADS_STORAGE_KEY = "mind-threads:threads";
export const ARCHIVED_THREADS_KEY = "mind-threads:archived";

function formatTwoDigits(value) {
  return String(value).padStart(2, "0");
}

export function formatDisplayDate(date = new Date()) {
  const day = formatTwoDigits(date.getDate());
  const month = formatTwoDigits(date.getMonth() + 1);
  const hours = formatTwoDigits(date.getHours());
  const minutes = formatTwoDigits(date.getMinutes());

  return `${day}/${month} ${hours}:${minutes}`;
}

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
  const timestamp = new Date();
  const createdAt = timestamp.toISOString();

  return {
    ...thread,
    updates: [
      ...thread.updates,
      {
        id: Date.now(),
        text,
        createdAt,
        displayDate: formatDisplayDate(timestamp),
      },
    ],
    updatedAt: createdAt,
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
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ],
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Toggle an action's completed status
 * @param {Object} thread - The thread object
 * @param {number} actionId - The ID of the action to toggle
 * @returns {Object} - The updated thread object
 */
export function toggleActionInThread(thread, actionId) {
  return {
    ...thread,
    actions: thread.actions.map((action) =>
      action.id === actionId
        ? { ...action, completed: !action.completed }
        : action
    ),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Update an action's text in a thread
 * @param {Object} thread - The thread object
 * @param {number} actionId - The ID of the action to update
 * @param {string} newText - The new text for the action
 * @returns {Object} - The updated thread object
 */
export function updateActionInThread(thread, actionId, newText) {
  return {
    ...thread,
    actions: thread.actions.map((action) =>
      action.id === actionId ? { ...action, text: newText } : action
    ),
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
