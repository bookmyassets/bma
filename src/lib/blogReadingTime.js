export const getPlainText = (value) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(getPlainText).join(" ");
  if (typeof value === "object") {
    if (typeof value.text === "string") return value.text;
    if (Array.isArray(value.children))
      return value.children.map(getPlainText).join(" ");
    if (Array.isArray(value.rows))
      return value.rows.map(getPlainText).join(" ");
    if (Array.isArray(value.cells))
      return value.cells.map(getPlainText).join(" ");
  }
  return "";
};

export const getReadingTime = (body) => {
  const words = getPlainText(body).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};
