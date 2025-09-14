var r = !!(
  typeof window < 'u' &&
  window.document &&
  window.document.createElement
);
const n = new Map(),
  o = {
    async getItem(e) {
      return n.has(e) ? n.get(e) : null;
    },
    async setItem(e, t) {
      n.set(e, typeof t == 'string' ? t : JSON.stringify(t));
    },
    async removeItem(e) {
      n.delete(e);
    },
    async clear() {
      n.clear();
    },
    async getAllKeys() {
      return Array.from(n.keys());
    },
    async multiGet(e) {
      return e.map((t) => [t, n.has(t) ? n.get(t) : null]);
    },
    async multiSet(e) {
      for (const [t, s] of e)
        n.set(t, typeof s == 'string' ? s : JSON.stringify(s));
    },
    async multiRemove(e) {
      for (const t of e) n.delete(t);
    },
  };
export { o as A, r as c };
