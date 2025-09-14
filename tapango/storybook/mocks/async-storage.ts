// @ts-nocheck
// In-memory AsyncStorage stub for Storybook web
const store = new Map<string, string | null>();

const AsyncStorage = {
  async getItem(key: string) {
    return store.has(key) ? (store.get(key) as any) : null;
  },
  async setItem(key: string, value: any) {
    store.set(key, typeof value === 'string' ? value : JSON.stringify(value));
  },
  async removeItem(key: string) {
    store.delete(key);
  },
  async clear() {
    store.clear();
  },
  async getAllKeys() {
    return Array.from(store.keys());
  },
  async multiGet(keys: string[]) {
    return keys.map((k) => [k, store.has(k) ? (store.get(k) as any) : null]);
  },
  async multiSet(entries: [string, any][]) {
    for (const [k, v] of entries) {
      store.set(k, typeof v === 'string' ? v : JSON.stringify(v));
    }
  },
  async multiRemove(keys: string[]) {
    for (const k of keys) store.delete(k);
  },
};

export default AsyncStorage;
