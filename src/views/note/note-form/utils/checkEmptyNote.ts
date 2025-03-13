export const isEmptyNote = (items: {
  [key: string]: string | null | undefined;
}) => {
  return Object.values(items).every(
    (item) => !item || item.trim().length === 0,
  );
};
