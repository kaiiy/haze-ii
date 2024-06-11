const navigateWithDelay = (navigate: (to: string) => void, to: string) => {
  const timer = setTimeout(() => {
    navigate(to);
  }, 100);
  return () => clearTimeout(timer);
};

export { navigateWithDelay };
