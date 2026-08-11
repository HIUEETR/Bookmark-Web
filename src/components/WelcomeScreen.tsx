import { useRef, useState } from "react";
import { getImportedBookmarksFolderId, loadExampleBookmarks } from "../lib/bookmarks";
import { importNodes, parseBookmarkFile } from "../lib/importExport";
import { useI18n } from "../context/I18nContext";
import { IconDownload, IconUpload } from "./Icons";

type WelcomeScreenProps = {
  onReady: (folderIds?: string[]) => Promise<void> | void;
};

export function WelcomeScreen({ onReady }: WelcomeScreenProps) {
  const { t } = useI18n();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleImport(file: File) {
    setLoading(true);
    setError(null);
    try {
      const nodes = parseBookmarkFile(await file.text(), file.name);
      const parentId = await getImportedBookmarksFolderId();
      const importedNodes = await importNodes(nodes, parentId);
      const importedFolderIds = importedNodes.filter((node) => node.children && node.children.length > 0).map((node) => node.id);
      await onReady([parentId, ...importedFolderIds]);
    } catch {
      setError(t.welcome.importFailed);
    } finally {
      setLoading(false);
    }
  }

  async function handleExample() {
    setLoading(true);
    setError(null);
    try {
      await loadExampleBookmarks();
      await onReady();
    } catch {
      setError(t.welcome.exampleFailed);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="welcome-page">
      <section className="welcome-card" aria-labelledby="welcome-title">
        <div className="welcome-kicker">Bookmark Web</div>
        <h1 id="welcome-title" className="welcome-title">{t.welcome.title}</h1>
        <p className="welcome-description">{t.welcome.description}</p>

        <div className="welcome-actions">
          <button className="btn btn-primary welcome-primary" onClick={() => inputRef.current?.click()} disabled={loading}>
            <IconUpload />{t.welcome.import}
          </button>
          <button className="btn btn-ghost" onClick={() => void handleExample()} disabled={loading}>
            <IconDownload />{t.welcome.example}
          </button>
        </div>

        <input
          ref={inputRef}
          className="visually-hidden"
          type="file"
          accept=".json,.html,.htm"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void handleImport(file);
            event.target.value = "";
          }}
        />

        {loading && <p className="welcome-status">{t.welcome.processing}</p>}
        {error && <p className="welcome-error" role="alert">{error}</p>}

        <div className="welcome-notes">
          <div>
            <strong>{t.welcome.supportedFormatsTitle}</strong>
            <span>{t.welcome.supportedFormats}</span>
          </div>
          <div>
            <strong>{t.welcome.localStorageTitle}</strong>
            <span>{t.welcome.localStorageNote}</span>
          </div>
          <div>
            <strong>{t.welcome.freeDeployTitle}</strong>
            <span>{t.welcome.freeDeployNote}</span>
          </div>
        </div>
      </section>
    </div>
  );
}