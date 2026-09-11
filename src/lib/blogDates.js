function toValidDate(value) {
  if (!value) return null;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function resolveBlogDates(post = {}) {
  const originalPublication =
    toValidDate(post.publishedAt) ||
    toValidDate(post.createdAt) ||
    toValidDate(post._createdAt);

  if (!originalPublication) {
    return {
      originalPublicationDate: undefined,
      modificationDate: undefined,
    };
  }

  return {
    originalPublicationDate: originalPublication.toISOString(),
    // _updatedAt is Sanity's document-operation timestamp. It can change
    // during bulk imports/migrations, so it is not used as the public blog
    // update date.
    modificationDate: originalPublication.toISOString(),
  };
}

export function getVisibleBlogDate(post = {}) {
  const dates = resolveBlogDates(post);

  if (!dates.originalPublicationDate) return null;

  const wasModified = false;
  const visibleValue = dates.originalPublicationDate;
  const date = new Date(visibleValue);

  return {
    ...dates,
    wasModified,
    label: wasModified ? "Updated On" : "Published On",
    formatted: date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    dateTime: date.toISOString().split("T")[0],
  };
}
