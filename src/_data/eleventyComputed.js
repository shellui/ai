export default {
  metaTitle: (data) =>
    data.title ? `${data.title} · shellui.ai` : "shellui.ai — Let your AI ship with Shellui",
  metaDescription: (data) => data.description || data.site.description,
  canonical: (data) => {
    const path = data.page?.url || "/";
    return new URL(path, data.site.url).href;
  },
};
