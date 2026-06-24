import BlogPage from "@/components/pages/BlogPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("blog", "tr");
export const revalidate = 60; // ISR — CLAUDE.md

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd locale="tr" pageKey="blog" name="Blog" />
      <BlogPage locale="tr" />
    </>
  );
}
