import { defineField, defineType } from "sanity";

function isValidPath(value: string | undefined) {
  if (!value) return "Required";
  if (!value.startsWith("/")) return "Must start with /";
  if (/[^a-zA-Z0-9\-_/:]/.test(value)) return "Invalid characters";
  return true;
}

export default defineType({
  name: "redirect",
  title: "Redirect / Yönlendirme",
  type: "document",
  validation: (Rule) =>
    Rule.custom((doc) => {
      const d = doc as { source?: string; destination?: string } | undefined;
      if (d?.source && d?.destination && d.source === d.destination) {
        return "Source and destination cannot be the same";
      }
      return true;
    }),
  fields: [
    defineField({
      name: "source",
      title: "Source path",
      type: "string",
      validation: (Rule) => Rule.required().custom(isValidPath),
    }),
    defineField({
      name: "destination",
      title: "Destination",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "permanent",
      title: "Permanent (301)",
      description: "301 (permanent) or 302 (temporary)",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "isEnabled",
      title: "Enabled",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: { select: { title: "source", subtitle: "destination" } },
});
