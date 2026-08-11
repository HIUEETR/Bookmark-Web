const en = {
  common: {
    close: "Close",
    delete: "Delete",
    deleteSelected: "Delete selected",
    working: "Working...",
  },
  app: {
    title: "Bookmark",
    loading: "Loading bookmarks...",
  },
  welcome: {
    title: "Offline bookmark manager",
    description: "Data is stored only in this browser and never uploaded to any server. Import a browser bookmark file first, then organize, search, export, and back up your bookmarks right in the page.",
    import: "Import bookmark file",
    example: "Use sample data",
    processing: "Processing bookmark data...",
    importFailed: "Import failed. Please make sure the file is an HTML bookmark file exported from a browser, or a JSON file exported from this project.",
    exampleFailed: "Failed to load sample data. Refresh the page and try again.",
    supportedFormatsTitle: "Supported formats",
    supportedFormats: "HTML exported from Chrome / Edge / Firefox, or JSON exported from this project.",
    localStorageTitle: "Local storage",
    localStorageNote: "Data persists after refresh; clearing browser site data will delete local bookmarks.",
    freeDeployTitle: "Free to deploy",
    freeDeployNote: "This is a pure static page and can be deployed to GitHub Pages.",
  },
  header: {
    resetData: "Reset data",
    addColumn: "Add Column",
    clearEmpty: "Clear Empty",
    deleteSelected: "Delete ({{count}})",
    moveTo: "Move to...",
    import: "Import",
    exportJson: "Export JSON",
    exportHtml: "Export HTML",
    undo: "Undo ({{count}})",
    duplicates: "Duplicates",
    broken: "Check Links",
    trash: "Trash",
    systemLocale: "Auto",
    toggleTheme: "Toggle theme",
  },
  selection: {
    count: "{{count}} selected",
    dropHint: "Drop on a column or choose Move to...",
  },
  column: {
    newFolder: "New folder",
    renameFolder: "Rename folder",
    deleteFolder: "Delete folder",
    removeColumn: "Remove column",
    goBack: "Go back",
    dragHandle: "Drag to reorder columns",
    resizeHandle: "Resize column",
  },
  tree: {
    rename: "Rename",
    root: "(root)",
  },
  search: {
    placeholder: "Search title, URL, or path...",
    noResults: "No results",
  },
  stats: {
    bookmarks: "Bookmarks",
    folders: "Folders",
    emptyFolders: "Empty",
    duplicates: "Duplicates",
  },
  details: {
    title: "Bookmark details",
    name: "Name",
    url: "URL",
    path: "Path",
    dateAdded: "Added",
    edit: "Edit",
    copyUrl: "Copy URL",
  },
  modal: {
    emptyFolders: {
      title: "Empty Folders",
      subtitle: "Select folders to delete. Nothing is selected by default.",
      noFolders: "No empty folders found",
      cancel: "Cancel",
      delete: "Delete ({{count}})",
    },
    prompt: {
      newFolder: "New Folder",
      rename: "Rename",
      cancel: "Cancel",
      ok: "OK",
    },
    confirm: {
      resetTitle: "Clear local data",
      resetMessage: "This will permanently delete all bookmarks, layout, and trash data stored in this browser. This cannot be undone.",
      resetConfirm: "Clear",
      typeToConfirm: 'Type "{{value}}" to confirm',
    },
    bookmarkEdit: {
      title: "Edit bookmark",
      name: "Title",
      url: "URL",
      invalidUrl: "Enter a valid URL",
    },
    folderPicker: {
      title: "Choose destination folder",
      search: "Search folders...",
    },
  },
  duplicates: {
    title: "Duplicate bookmarks",
    subtitle: "By default the last item in each group is kept (you can change this). Checked items will be deleted.",
    none: "No duplicate bookmarks found",
    keepLast: "Keep (last)",
  },
  broken: {
    title: "Link checker",
    subtitle: "Checks selected bookmarks, or up to 50 bookmarks from the library. Some sites hide status, so unknown does not always mean broken.",
    check: "Run check",
    empty: "Run a check to see results",
    ok: "OK",
    broken: "Broken",
    unknown: "Unknown",
  },
  trash: {
    title: "Trash",
    empty: "No recent deletes",
    restore: "Restore",
    restored: "Item restored",
  },
  toast: {
    folderCreated: "Folder created",
    folderRenamed: "Folder renamed",
    bookmarkRenamed: "Bookmark updated",
    folderDeleted: "Folder deleted",
    bookmarkMoved: "Bookmark moved",
    bookmarksMoved: "Bookmarks moved",
    deletedEmpty: "Deleted {{count}} empty folder(s)",
    deletedItems: "Deleted {{count}} item(s)",
    exported: "Bookmarks exported",
    imported: "Bookmarks imported",
    undoSuccessful: "Undo successful",
    deleteFailed: "Failed to delete folders",
    importFailed: "Failed to import bookmarks",
    deleteItemsFailed: "Failed to delete items",
    moveFailed: "Failed to move bookmarks",
    undoFailed: "Failed to undo",
    operationFailed: "Operation failed",
  },
  undo: {
    batch: "{{count}} bookmarks",
  },
  confirm: {
      resetTitle: "Clear local data",
      resetMessage: "This will permanently delete all bookmarks, layout, and trash data stored in this browser. This cannot be undone.",
      resetConfirm: "Clear",
    deleteFolderTitle: "Delete folder",
    deleteSelectedTitle: "Delete selected items",
    deleteFolder: 'Delete folder "{{name}}"?',
    deleteFolderWithContents: 'Delete "{{name}}" and all of its contents? This cannot be undone from the browser, but a restore copy will be saved in Trash.',
    deleteSelected: "Delete {{count}} selected item(s)? A restore copy will be saved in Trash.",
    deleteSelectedFolders: "Delete {{count}} selected empty folder(s)?",
  },
};

export default en;

type DeepStringify<T> = T extends string
  ? string
  : T extends object
    ? { [K in keyof T]: DeepStringify<T[K]> }
    : T;

export type Translations = DeepStringify<typeof en>;


