import type { BookmarkStats } from "../types";
import { useI18n } from "../context/I18nContext";

interface StatsPanelProps {
  stats: BookmarkStats;
  onDuplicates: () => void;
  onEmptyFolders: () => void;
}

const MAX_DOMAINS = 4;

export function StatsPanel({ stats, onDuplicates, onEmptyFolders }: StatsPanelProps) {
  const { t } = useI18n();
  return (
    <>
      <div className="stats-panel">
        <div className="stat-card">
          <span>{t.stats.bookmarks}</span>
          <strong>{stats.bookmarks}</strong>
        </div>
        <div className="stat-card">
          <span>{t.stats.folders}</span>
          <strong>{stats.folders}</strong>
        </div>
        <button className="stat-card stat-action" onClick={onEmptyFolders} title={t.header.clearEmpty}>
          <span>{t.stats.emptyFolders}</span>
          <strong>{stats.emptyFolders}</strong>
        </button>
        <button className="stat-card stat-action" onClick={onDuplicates} title={t.header.duplicates}>
          <span>{t.stats.duplicates}</span>
          <strong>{stats.duplicateUrls}</strong>
        </button>
      </div>
      {stats.topDomains.length > 0 && (
        <div className="domain-list">
          <span className="domain-title">{t.stats.topDomains}</span>
          {stats.topDomains.slice(0, MAX_DOMAINS).map((item) => (
            <span key={item.domain} className="domain-item">
              <span className="domain-name">{item.domain}</span>
              <span className="domain-count">{item.count}</span>
            </span>
          ))}
        </div>
      )}
    </>
  );
}
