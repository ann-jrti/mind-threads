"use client";

import { formatDisplayDate } from "@/utils/threadStorage";
import styles from "./ArchivedThreadsModal.module.css";

export default function ArchivedThreadsModal({ archivedThreads, onClose }) {
  const monthFormatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  });

  function getLastActivityDate(thread) {
    const latestUpdate = thread.updates?.[thread.updates.length - 1];
    const candidateDates = [
      latestUpdate?.createdAt,
      thread.updatedAt,
      thread.archivedAt,
      thread.createdAt,
    ].filter(Boolean);

    const validDate = candidateDates
      .map((value) => new Date(value))
      .find((date) => !Number.isNaN(date.getTime()));

    return validDate || new Date(0);
  }

  const monthSections = Array.from(
    archivedThreads
      .map((thread) => ({ thread, lastActivity: getLastActivityDate(thread) }))
      .sort((a, b) => b.lastActivity - a.lastActivity)
      .reduce((map, item) => {
        const key = `${item.lastActivity.getFullYear()}-${item.lastActivity.getMonth()}`;
        if (!map.has(key)) {
          map.set(key, {
            label: monthFormatter.format(item.lastActivity),
            threads: [],
          });
        }
        map.get(key).threads.push(item);
        return map;
      }, new Map())
      .values()
  );

  function getDisplayDate(update) {
    if (!update) return "";
    if (update.displayDate) return update.displayDate;
    if (update.createdAt) {
      const parsedDate = new Date(update.createdAt);
      if (!Number.isNaN(parsedDate.getTime())) {
        return formatDisplayDate(parsedDate);
      }
    }
    return "";
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>archived threads</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.content}>
          {archivedThreads.length === 0 ? (
            <p className={styles.emptyMessage}>no archived threads yet</p>
          ) : (
            <div className={styles.monthList}>
              {monthSections.map((section) => (
                <div key={section.label} className={styles.monthSection}>
                  <div className={styles.monthHeader}>
                    <span className={styles.monthName}>{section.label}</span>
                    <div className={styles.monthDivider} />
                  </div>

                  <div className={styles.threadsGrid}>
                    {section.threads.map(({ thread }) => (
                      <div key={thread.id} className={styles.threadCard}>
                        <h3 className={styles.threadTitle}>{thread.title}</h3>

                        {thread.archivedAt && (
                          <p className={styles.archivedDate}>
                            archived:{" "}
                            {formatDisplayDate(new Date(thread.archivedAt))}
                          </p>
                        )}

                        <div className={styles.threadContent}>
                          {thread.updates.length > 0 && (
                            <div className={styles.updates}>
                              <h4 className={styles.sectionTitle}>updates</h4>
                              {thread.updates.map((update) => (
                                <div key={update.id} className={styles.update}>
                                  <span className={styles.updateDate}>
                                    {getDisplayDate(update)}
                                  </span>
                                  <p className={styles.updateText}>
                                    {update.text}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}

                          {thread.actions.length > 0 && (
                            <div className={styles.actions}>
                              <h4 className={styles.sectionTitle}>actions</h4>
                              {thread.actions.map((action) => (
                                <div key={action.id} className={styles.action}>
                                  <p className={styles.actionText}>
                                    {action.text}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
