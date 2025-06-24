import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

import Post from '../../.script/post.mjs'

const SRC_DIR = "./src";
const POSTS_PER_PAGE = 3;

export default {
    async paths() {

        const posts = await getDirPosts(path.join(SRC_DIR, "./posts"));
        sortPostsByCreatedTime(posts);
        const count = posts.length;

        return (() => {
            const quotient = Math.trunc(count / POSTS_PER_PAGE);
            const remainder = count % POSTS_PER_PAGE;
            const totalPage = quotient + (remainder == 0 ? 0 : 1)

            const data: Array<any> = [];

            for (let i = 1; i <= totalPage; i++) {
                const dataPosts: Post[] = [];
                let showPostCount = 0;

                if (i == totalPage && remainder != 0) {
                    showPostCount = remainder;
                } else {
                    showPostCount = POSTS_PER_PAGE;
                }
                for (let j = 0; j < showPostCount; j++) {
                    
                    dataPosts.push(posts[(i - 1) * POSTS_PER_PAGE + j]);
                }

                const obj = {
                    params: {
                        page: i,
                        posts: dataPosts,
                        totalPage: totalPage,
                    },
                }

                data.push(obj);
            }
            return data;
        })();
    }
}

async function getDirPosts(directory: string) {
    const files = (await fs.readdir(directory)).filter(file => {
        return file.endsWith(".md") && !file.endsWith("-demo.md");
    });
    const posts = await Promise.all(files.map(async f => {
        const fullpath = path.join(directory, f);
        const stats = await fs.stat(fullpath);
        const data = await fs.readFile(fullpath, 'utf8');
        const markdown = matter(data);
        const fullpathWithoutExt = path.parse(fullpath);
        const post: Post = {
            title: markdown.data.title,
            description: markdown.data.description,
            url: path.relative(SRC_DIR, path.join(fullpathWithoutExt.dir, fullpathWithoutExt.name)).replace('\\', '/'),
            createdTime: stats.birthtime.toISOString(),
            updatedTime: stats.mtime.toISOString(),
            readingTime: markdown.data.readingTime,
        };
        return post;
    }));
    return posts;
}

function sortPostsByCreatedTime(posts: Post[]) {
    posts.sort((a, b) => {
        // ISO 8601 格式 时间的字符串可以直接比较
        if (a.createdTime == b.createdTime) {
            return 0;
        }
        return a.createdTime > b.createdTime ? -1 : 1;
    });
}
