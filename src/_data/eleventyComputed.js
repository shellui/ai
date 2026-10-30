export default {
  metaTitle: (data) =>
    data.page?.url === "/" || !data.title
      ? "AI agents in your web shell, by Shellui"
      : `${data.title} · Shellui for AI`,
  metaDescription: (data) => data.description || data.site.description,
  canonical: (data) => {
    const path = data.page?.url || "/";
    return new URL(path, data.site.url).href;
  },
};
