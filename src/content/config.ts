import { defineCollection, z } from "astro:content";
const blogCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        pubDate: z.date(),
        author: z.string(),
        tags : z.array(z.string()),
    })
});


export const collection = {
    blog: blogCollection
}
