const DEFAULT_Z_INDEX_BASE = 2000;

let zIndexSeed = 0;

export function nextZIndex(base = DEFAULT_Z_INDEX_BASE): number {
  zIndexSeed += 1;
  return zIndexSeed + base;
}

const useZIndex = (base = DEFAULT_Z_INDEX_BASE) => ({
  nextZIndex: () => nextZIndex(base),
});

export default useZIndex;
