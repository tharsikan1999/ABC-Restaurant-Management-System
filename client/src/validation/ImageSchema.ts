import * as z from "zod";

export const ImageSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 800 * 1024, "Max file size is 800KB")
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/svg+xml"].includes(file.type),
      "Only JPG, PNG, or SVG formats are allowed"
    ),
});
