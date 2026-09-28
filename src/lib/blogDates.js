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
  const explicitModification = toValidDate(post.updatedOn);

  if (!originalPublication) {
    return {
      originalPublicationDate: undefined,
      modificationDate: undefined,
    };
  }

  return {
    originalPublicationDate: originalPublication.toISOString(),
    modificationDate:
      explicitModification && explicitModification > originalPublication
        ? explicitModification.toISOString()
        : undefined,
  };
}

export function getVisibleBlogDate(post = {}) {
  const dates = resolveBlogDates(post);

  if (!dates.originalPublicationDate) return null;

  const wasModified = Boolean(dates.modificationDate);
  const visibleValue = wasModified
    ? dates.modificationDate
    : dates.originalPublicationDate;
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
