import BlogPage from "@/components/pages/BlogPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("blog", "en");
export const revalidate = 60; // ISR — CLAUDE.md

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd locale="en" pageKey="blog" name="Blog" />
      <BlogPage locale="en" />
    </>
  );
}
