import "server-only";
import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId, sanityConfigured } from "./sanity";

const builder = sanityConfigured ? imageUrlBuilder({ projectId, dataset }) : null;

// Portable Text içi görseller için URL oluşturucu (yapılandırılmamışsa null).
export function urlFor(source: unknown) {
  return builder ? builder.image(source as never) : null;
}
