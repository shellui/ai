import { createHash } from "node:crypto";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { IdAttributePlugin } from "@11ty/eleventy";

const root = path.dirname(fileURLToPath(import.meta.url));
const hashAssets = process.env.ELEVENTY_RUN_MODE === "build";

const HASHABLE_EXT = new Set([
  ".avif", ".css", ".gif", ".ico", ".jpeg", ".jpg", ".js", ".mjs",
  ".otf", ".png", ".svg", ".ttf", ".webp", ".woff", ".woff2",
]);
const TEXT_EXT = new Set([".css", ".html", ".js", ".json", ".mjs", ".svg", ".txt", ".xml"]);
const WELL_KNOWN_URLS = new Set(["/apple-touch-icon.png", "/favicon.ico"]);

function buildCss() {
  fs.mkdirSync(path.join(root, "_site/assets/css"), { recursive: true });
  execSync(
    "npx @tailwindcss/cli -i ./src/assets/css/input.css -o ./_site/assets/css/site.css --minify",
    { stdio: "inherit", cwd: root },
  );
}

function contentHash(buffer) {
  return createHash("sha256").update(buffer).digest("hex").slice(0, 8);
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function replaceAssetUrl(content, from, to) {
  if (!from || from === to) return content;
  return content.replace(new RegExp(`${escapeRegExp(from)}(?!\\?v=)`, "g"), to);
}

function walkFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walkFiles(full));
    else files.push(full);
  }
  return files;
}

function toPublicUrl(outputDir, file) {
  return `/${path.relative(outputDir, file).split(path.sep).join("/")}`;
}

function isHashedName(filename) {
  return /\.[a-f0-9]{8}\.[^.]+$/.test(filename);
}

function rewriteContents(file, manifest) {
  if (manifest.size === 0) return;
  if (!TEXT_EXT.has(path.extname(file).toLowerCase())) return;
  let content = fs.readFileSync(file, "utf8");
  const before = content;
  const entries = [...manifest.entries()].sort((a, b) => b[0].length - a[0].length);
  for (const [from, to] of entries) {
    content = replaceAssetUrl(content, from, to);
  }
  if (content !== before) fs.writeFileSync(file, content);
}

function fingerprintAssets(outputDir) {
  const manifest = new Map();
  for (const file of walkFiles(outputDir)) {
    const ext = path.extname(file).toLowerCase();
    if (!HASHABLE_EXT.has(ext)) continue;
    if (isHashedName(path.basename(file))) continue;
    const publicUrl = toPublicUrl(outputDir, file);
    if (WELL_KNOWN_URLS.has(publicUrl)) continue;
    const buffer = fs.readFileSync(file);
    const hash = contentHash(buffer);
    const hashedName = `${path.basename(file, ext)}.${hash}${ext}`;
    const hashedPath = path.join(path.dirname(file), hashedName);
    fs.writeFileSync(hashedPath, buffer);
    fs.unlinkSync(file);
    manifest.set(publicUrl, toPublicUrl(outputDir, hashedPath));
  }
  for (const file of walkFiles(outputDir)) {
    rewriteContents(file, manifest);
  }
}

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(IdAttributePlugin);
  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/js/");

  eleventyConfig.addPassthroughCopy({
    CNAME: "CNAME",
    img: "img",
    "favicon.ico": "favicon.ico",
    "apple-touch-icon.png": "apple-touch-icon.png",
    "src/assets/js": "assets/js",
    "node_modules/alpinejs/dist/cdn.min.js": "assets/js/alpine.min.js",
    "node_modules/@tailwindplus/elements/dist/index.js": "assets/js/elements.js",
  });

  eleventyConfig.addFilter("absoluteUrl", (url, base) => {
    if (!url) return "";
    if (/^https?:\/\//i.test(url)) return url;
    const origin = String(base || "").replace(/\/$/, "");
    const pathPart = String(url).startsWith("/") ? url : `/${url}`;
    return `${origin}${pathPart}`;
  });

  eleventyConfig.on("eleventy.before", () => {
    buildCss();
  });

  eleventyConfig.on("eleventy.after", () => {
    buildCss();
    if (hashAssets) {
      fingerprintAssets(path.join(root, "_site"));
    }
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
}
