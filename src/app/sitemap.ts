import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://matheussantos.tech";
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/links`, changeFrequency: "yearly", priority: 0.5 },
  ];
}
