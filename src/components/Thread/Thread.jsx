"use client";

import TextInputModal from "../Board/TextInputModal";
import Actions from "./Actions";
import useThread from "./useThread";
import { ListChevronsDownUp, ListChevronsUpDown } from "lucide-react";

import styles from "./Thread.module.css";

function renderTextWithLinks(parts, stylesRef) {
  return parts.map((part, index) => {
    if (part.type === "link") {
      return (
        <a
          key={index}
          href={part.href}
          target="_blank"
          rel="noopener noreferrer"
          className={stylesRef.link}
          onClick={(e) => e.stopPropagation()}
        >
          {part.content}
        </a>
      );
    }
    return <span key={index}>{part.content}</span>;
  });
}

export default function Thread({ thread, onUpdate, onArchive }) {
  const { state, data, actions, utils } = useThread(
    thread,
    onUpdate,
    onArchive
  );

  return (
    <div className={styles.thread}>
      <div className={styles.header}>
        <h3 className={styles.title}>{data.title}</h3>
        <button
          className={styles.addBtn}
          onClick={actions.openModal}
          aria-label="Add update"
        >
          +
        </button>
      </div>

      {data.hasMultipleUpdates && (
        <div className={styles.toggleRow}>
          <button
            className={styles.uncollapseBtn}
            onClick={actions.handleToggleCollapse}
            aria-label={
              state.isCollapsed ? "Uncollapse updates" : "Collapse updates"
            }
          >
            {state.isCollapsed ? (
              <ListChevronsUpDown color="black" width="18" strokeWidth="1" />
            ) : (
              <ListChevronsDownUp color="black" width="18" strokeWidth="1" />
            )}
          </button>
        </div>
      )}

      <div className={styles.updates}>
        {data.hasUpdates && state.isCollapsed && data.latestUpdate && (
          <div key={data.latestUpdate.id} className={styles.update}>
            <button
              className={styles.editBtn}
              onClick={() => actions.handleEditClick(data.latestUpdate)}
              aria-label="Edit update"
            >
              <p className={styles.updateText}>
                <span className={styles.dateText}>
                  {utils.getDisplayDate(data.latestUpdate)}
                </span>
                {renderTextWithLinks(
                  utils.getTextWithLinks(data.latestUpdate.text),
                  styles
                )}
              </p>
            </button>
          </div>
        )}

        {data.hasUpdates &&
          !state.isCollapsed &&
          data.updates.map((update) => (
            <div key={update.id} className={styles.update}>
              <button
                className={styles.editBtn}
                onClick={() => actions.handleEditClick(update)}
                aria-label="Edit update"
              >
                <p className={styles.updateText}>
                  <span className={styles.dateText}>
                    {utils.getDisplayDate(update)}
                  </span>
                  <span>
                    {renderTextWithLinks(
                      utils.getTextWithLinks(update.text),
                      styles
                    )}
                  </span>
                </p>
              </button>
            </div>
          ))}
      </div>

      <Actions
        onArchive={actions.handleArchive}
        thread={thread}
        onUpdate={onUpdate}
      />

      {state.isModalOpen && (
        <TextInputModal
          title="add update"
          type="update"
          placeholder="..."
          submitLabel="add"
          onSubmit={actions.handleAddUpdate}
          onCancel={actions.closeModal}
        />
      )}

      {state.isEditing && (
        <TextInputModal
          title="edit update"
          placeholder="..."
          submitLabel="update"
          initialValue={state.editingText}
          type="update"
          onSubmit={actions.handleEditUpdate}
          onCancel={actions.handleCancelEdit}
        />
      )}
    </div>
  );
}
