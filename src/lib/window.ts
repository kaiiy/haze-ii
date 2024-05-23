type WindowSize = {
  width: number;
  height: number;
};

const subscribeWindowSizeChange = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};

export type { WindowSize };
export { subscribeWindowSizeChange };
