export async function readStorage<T>(key: string, fallback: T): Promise<T> {
  try {
    const saved = localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T) : fallback;
  } catch {
    return fallback;
  }
}

export async function writeStorage<T>(key: string, value: T): Promise<void> {
  localStorage.setItem(key, JSON.stringify(value));
}

export async function removeStorage(key: string): Promise<void> {
  localStorage.removeItem(key);
}
