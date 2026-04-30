import { cp, mkdir, rm, writeFile } from "node:fs/promises";

const files = [
  "index.html",
  "privacy.html",
  "data-deletion.html",
  "site.webmanifest",
  "assets",
  "src/app.js",
  "dist/output.css",
];

await rm("build", { recursive: true, force: true });
await mkdir("build", { recursive: true });

for (const file of files) {
  const destination =
    file === "src/app.js"
      ? "build/src/app.js"
      : file === "dist/output.css"
        ? "build/output.css"
        : `build/${file}`;
  await cp(file, destination, { recursive: true, force: true });
}

await writeFile(
  "build/_headers",
  [
    "/*",
    "  X-Content-Type-Options: nosniff",
    "  Referrer-Policy: strict-origin-when-cross-origin",
    "",
  ].join("\n"),
);

const siteUrl = (process.env.SITE_URL || "https://shinng.netlify.app").replace(/\/$/, "");
const pages = ["index.html", "privacy.html", "data-deletion.html"];

await writeFile(
  "build/robots.txt",
  [
    "User-agent: *",
    "Allow: /",
    siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml` : "",
    "",
  ]
    .filter((line) => line !== "")
    .join("\n"),
);

if (siteUrl) {
  const today = new Date().toISOString().slice(0, 10);
  await writeFile(
    "build/sitemap.xml",
    [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...pages.map((page) => {
        const path = page === "index.html" ? "" : page;
        return [
          "  <url>",
          `    <loc>${siteUrl}/${path}</loc>`,
          `    <lastmod>${today}</lastmod>`,
          "    <changefreq>monthly</changefreq>",
          page === "index.html" ? "    <priority>1.0</priority>" : "    <priority>0.7</priority>",
          "  </url>",
        ].join("\n");
      }),
      "</urlset>",
      "",
    ].join("\n"),
  );
} else {
  await writeFile(
    "build/sitemap.README.txt",
    "Set SITE_URL before running npm run build:site to generate sitemap.xml, for example: SITE_URL=https://your-site.netlify.app npm run build:site\n",
  );
}

console.log("Static site generated in ./build");
