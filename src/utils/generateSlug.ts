// src/utils/generateSlug.ts
import slugify from "slugify";

export function generateSlug(name: string) {
  return slugify(name, {
    lower: true,   // make all lowercase
    strict: true,  // remove special characters
    trim: true,
  });
}
