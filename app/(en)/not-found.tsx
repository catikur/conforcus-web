import type { Metadata } from "next";
import NotFoundView, { notFoundMetadata } from "@/components/pages/NotFoundView";

export const metadata: Metadata = {
  title: notFoundMetadata.title.en,
  robots: notFoundMetadata.robots,
};

export default function NotFound() {
  return <NotFoundView locale="en" />;
}
