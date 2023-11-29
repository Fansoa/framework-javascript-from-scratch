
class CachingService {
  savedTree=null

  getStructureByComponentKey(key, node = this.savedTree) {
    if (!node) {
        return null;
    }

    if (node.componentKey === key) {
        return node;
    }

    if (node.children && Array.isArray(node.children)) {
        for (const child of node.children) {
            const result = this.getStructureByComponentKey(key, child);
            if (result !== null) {
                return result;
            }
        }
    }

    return null;
  }
}

export const cache = new CachingService();