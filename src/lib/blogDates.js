function toValidDate(value) {
  if (!value) return null;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function resolveBlogDates(post = {}) {
  const originalPublication =
    toValidDate(post.createdAt) ||
    toValidDate(post.publishedAt) ||
    toValidDate(post._createdAt);

  if (!originalPublication) {
    return {
      originalPublicationDate: undefined,
      modificationDate: undefined,
    };
  }

  const editorialModification = toValidDate(post.publishedAt);
  const systemModification = toValidDate(post._updatedAt);
  const modification =
    (editorialModification > originalPublication && editorialModification) ||
    (systemModification > originalPublication && systemModification) ||
    originalPublication;

  return {
    originalPublicationDate: originalPublication.toISOString(),
    modificationDate: modification.toISOString(),
  };
}
