import { createContentLoader } from "vitepress"
import { Post } from "../interface/post.outdate.mts"
import { getCreatedTime, getReadingTime, getUpdatedTime } from "../util/util.outdate.mts"
import path from "path"

declare const data: Post[]
export { data }

export default createContentLoader("posts/!(*-demo).md", {
    includeSrc: true,
    transform(rawData) {
        return rawData.map((page) => {
            const fp = path.parse(page.url);
            const p = path.join('./', fp.dir, fp.name + ".md");
            const relativeUrl = path.join('./', page.url).replace('\\', '/');

            let post: Post = {
                title: page.frontmatter.title ?? "",
                description: page.frontmatter.description ?? "",
                category: page.frontmatter.category ?? [],
                tag: page.frontmatter.tag ?? [],
                url: relativeUrl,
                createdTime: getCreatedTime(p).toISOString(),
                updatedTime: getUpdatedTime(p).toISOString(),
                readingTime: getReadingTime(page.src),
            }

            return post;
        })
    }
})
