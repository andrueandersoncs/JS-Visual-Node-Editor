const getId = (() => {
  let id = 0;
  return () => `${id++}`;
})();

export default getId;
