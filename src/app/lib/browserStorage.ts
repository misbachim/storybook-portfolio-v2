const KEY = "redux";

export function loadState() {
  try {
    if (typeof window === 'undefined') return undefined;
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch {
    return undefined;
  }
}

export async function saveState(state: unknown) {
  try {
    if (typeof window === 'undefined') return;
    const serializedState = JSON.stringify(state);
    localStorage.setItem(KEY, serializedState);
  } catch {
    // Ignore
  }
}
