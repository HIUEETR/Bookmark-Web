import type { BookmarkNode } from "../types";
import { readStorage, removeStorage, writeStorage } from "./storage";

const BOOKMARK_TREE_KEY = "bookmark-web-tree";
const BOOKMARK_NEXT_ID_KEY = "bookmark-web-next-id";

export async function getTree(): Promise<BookmarkNode[]> {
  return cloneTree(await readTree());
}

export async function getBookmark(id: string): Promise<BookmarkNode | null> {
  return findNode(await readTree(), id)?.node || null;
}

export async function getChildren(id: string): Promise<BookmarkNode[]> {
  return cloneTree(findNode(await readTree(), id)?.node.children || []);
}

export async function createBookmark(input: {
  parentId: string;
  title: string;
  url: string;
  index?: number;
}): Promise<BookmarkNode> {
  return createNode(input);
}

export async function createFolder(input: {
  parentId: string;
  title: string;
  index?: number;
}): Promise<BookmarkNode> {
  return createNode(input);
}

export async function updateBookmark(
  id: string,
  changes: { title?: string; url?: string }
): Promise<BookmarkNode> {
  const tree = await readTree();
  const found = findNode(tree, id);
  if (!found) throw new Error("Bookmark not found");
  found.node.title = changes.title ?? found.node.title;
  if ("url" in changes) found.node.url = changes.url;
  await saveTree(tree);
  return cloneTree(found.node);
}

export async function removeBookmark(id: string): Promise<void> {
  const tree = await readTree();
  removeNode(tree, id);
  await saveTree(tree);
}

export async function removeTree(id: string): Promise<void> {
  const tree = await readTree();
  removeNode(tree, id);
  await saveTree(tree);
}

export async function moveBookmark(
  id: string,
  parentId: string,
  index?: number
): Promise<BookmarkNode | void> {
  const tree = await readTree();
  const found = findNode(tree, id);
  const targetParent = findNode(tree, parentId)?.node;
  if (!found || !targetParent || !targetParent.children) return;
  const targetLength = targetParent.children.length;
  const requestedIndex = index ?? targetLength;
  const sameParent = found.node.parentId === parentId;
  found.siblings.splice(found.index, 1);
  reindex(found.siblings);
  const adjustedIndex = sameParent && found.index < requestedIndex ? requestedIndex - 1 : requestedIndex;
  const targetIndex = Math.max(0, Math.min(adjustedIndex, targetParent.children.length));
  found.node.parentId = parentId;
  targetParent.children.splice(targetIndex, 0, found.node);
  reindex(targetParent.children);
  await saveTree(tree);
  return cloneTree(found.node);
}

export async function isBookmarksEmpty(): Promise<boolean> {
  const tree = await readTree();
  const root = tree[0];
  return !root.children?.some((folder) => (folder.children?.length || 0) > 0);
}

export async function resetBookmarks(): Promise<void> {
  await removeStorage(BOOKMARK_TREE_KEY);
  await removeStorage(BOOKMARK_NEXT_ID_KEY);
}

export async function loadExampleBookmarks(): Promise<void> {
  await saveTree(getExampleTree());
  await writeStorage(BOOKMARK_NEXT_ID_KEY, 1000);
}

export async function getImportedBookmarksFolderId(): Promise<string> {
  const tree = await readTree();
  const root = tree[0];
  const existing = root.children?.find((node) => !node.url && node.title === "Imported Bookmarks");
  if (existing) return existing.id;
  const folder = await createFolder({ parentId: "0", title: "Imported Bookmarks" });
  return folder.id;
}

async function createNode(input: {
  parentId: string;
  title: string;
  url?: string;
  index?: number;
}): Promise<BookmarkNode> {
  const tree = await readTree();
  const parent = findNode(tree, input.parentId)?.node;
  if (!parent) throw new Error("Parent folder not found");
  if (!parent.children) parent.children = [];
  const node: BookmarkNode = {
    id: await nextId(),
    parentId: input.parentId,
    index: input.index ?? parent.children.length,
    title: input.title,
    url: input.url,
    dateAdded: Date.now(),
    children: input.url ? undefined : [],
  };
  parent.children.splice(input.index ?? parent.children.length, 0, node);
  reindex(parent.children);
  await saveTree(tree);
  return cloneTree(node);
}

async function readTree(): Promise<BookmarkNode[]> {
  const tree = await readStorage<BookmarkNode[] | null>(BOOKMARK_TREE_KEY, null);
  if (tree) return tree;
  const initialTree = getEmptyTree();
  await saveTree(initialTree);
  await writeStorage(BOOKMARK_NEXT_ID_KEY, 3);
  return initialTree;
}

async function saveTree(tree: BookmarkNode[]): Promise<void> {
  await writeStorage(BOOKMARK_TREE_KEY, tree);
}

async function nextId(): Promise<string> {
  const id = await readStorage(BOOKMARK_NEXT_ID_KEY, 3);
  await writeStorage(BOOKMARK_NEXT_ID_KEY, id + 1);
  return String(id);
}

function removeNode(tree: BookmarkNode[], id: string) {
  if (id === "0" || id === "1" || id === "2") throw new Error("Cannot remove root folder");
  const found = findNode(tree, id);
  if (!found) throw new Error("Bookmark not found");
  found.siblings.splice(found.index, 1);
  reindex(found.siblings);
}

function findNode(
  nodes: BookmarkNode[],
  id: string,
  siblings: BookmarkNode[] = nodes
): { node: BookmarkNode; siblings: BookmarkNode[]; index: number } | null {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.id === id) return { node, siblings, index: i };
    if (node.children) {
      const found = findNode(node.children, id, node.children);
      if (found) return found;
    }
  }
  return null;
}

function reindex(nodes: BookmarkNode[]) {
  nodes.forEach((node, index) => {
    node.index = index;
  });
}

function cloneTree<T>(tree: T): T {
  return JSON.parse(JSON.stringify(tree));
}

function getEmptyTree(): BookmarkNode[] {
  return [
    {
      id: "0",
      title: "",
      children: [
        { id: "1", parentId: "0", index: 0, title: "Bookmarks Bar", children: [] },
        { id: "2", parentId: "0", index: 1, title: "Other Bookmarks", children: [] },
      ],
    },
  ];
}

function getExampleTree(): BookmarkNode[] {
  return [
    {
      id: "0",
      title: "",
      children: [
        {
          id: "1",
          parentId: "0",
          index: 0,
          title: "Bookmarks Bar",
          children: [
            { id: "10", parentId: "1", index: 0, title: "GitHub", url: "https://github.com/", dateAdded: Date.now() - 500000 },
            { id: "11", parentId: "1", index: 1, title: "Google", url: "https://www.google.com/", dateAdded: Date.now() - 400000 },
            { id: "14", parentId: "1", index: 2, title: "GitHub Mirror", url: "https://github.com", dateAdded: Date.now() - 300000 },
            {
              id: "12",
              parentId: "1",
              index: 3,
              title: "Work Folder",
              children: [
                { id: "13", parentId: "12", index: 0, title: "Email", url: "https://mail.google.com/", dateAdded: Date.now() - 200000 },
              ],
            },
            { id: "15", parentId: "1", index: 4, title: "Empty Folder", children: [] },
          ],
        },
        {
          id: "2",
          parentId: "0",
          index: 1,
          title: "Other Bookmarks",
          children: [
            { id: "20", parentId: "2", index: 0, title: "YouTube", url: "https://youtube.com/", dateAdded: Date.now() - 100000 },
            { id: "21", parentId: "2", index: 1, title: "MDN", url: "https://developer.mozilla.org/", dateAdded: Date.now() - 90000 },
          ],
        },
      ],
    },
  ];
}
