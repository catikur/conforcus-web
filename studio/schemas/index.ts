import author from "./author";
import post from "./post";
import reference from "./reference";
import testimonial from "./testimonial";
import solution from "./solution";
import jobPosting from "./jobPosting";
import siteSettings from "./siteSettings";
import teamMember from "./teamMember";
import page from "./page";
import redirect from "./redirect";
import { seoType, faqItemType } from "./objects";

export const schemaTypes = [
  seoType,
  faqItemType,
  post,
  author,
  reference,
  testimonial,
  solution,
  jobPosting,
  siteSettings,
  teamMember,
  page,
  redirect,
];
