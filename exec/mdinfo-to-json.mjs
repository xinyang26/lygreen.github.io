import fs from 'fs/promises'
import path from 'path';
import matter from 'gray-matter';

import { SRC_DIR, POSTS_DIR, PUBLIC_DIR } from "./execConfig.mjs";

const JSON_DIR = path.join(PUBLIC_DIR, './json')
const POSTS_PER_PAGE = 3;

/**
 * @typedef {Object} Post
 * @property {string | undefined} title
 * @property {string | undefined} description
 * @property {string | undefined} createdTime
 * @property {string | undefined} updatedTime
 * @property {number | undefined} readingTime
 * @property {string[] | undefined} category
 * @property {string[] | undefined} tag
 * @property {string | undefined} originBasename
 * @property {string | undefined} url
 */

/**
 * @typedef {Object} PostsPageInfo
 * @property {number} postsPerPage
 * @property {number} totalPages
 * @property {number} length
 */

/**
 * 
 * @param {Post[]} posts 
 */
function sortPostsByCreatedTime(posts) {
    posts.sort((a, b) => {
        const aTime = new Date(a.createdTime);
        const bTime = new Date(b.createdTime);
        if (aTime == bTime) {
            return 0;
        }
        return aTime > bTime ? -1 : 1;
    });
}

/**
 * 
 * @param {string} dir 
 */
async function clearFiles(dir) {
    const files = await fs.readdir(dir);
    await Promise.all(
        files.map((f) => {
            fs.unlink(path.join(dir, f));
        })
    );
}

/**
 * 
 * @param {string} path 
 */
async function createFolder(path) {
    try {
        await fs.access(path);
    } catch(e) {
        await fs.mkdir(path);
    }
}

(async () => {
    await createFolder(JSON_DIR);

    await clearFiles(JSON_DIR);

    const files = await fs.readdir(POSTS_DIR);
    
    const posts = await Promise.all(files.map(async (f) => {
        const realPath = path.join(POSTS_DIR, f);
        const buffer = await fs.readFile(realPath);
        const markdown = matter(buffer);
        const htmlBasename = path.join(path.basename(f, path.extname(f)) + '.html');
        const url = path.join(path.relative(SRC_DIR, POSTS_DIR), htmlBasename).replace('\\', '/');

        const post = {
            title: markdown.data.title,
            description: markdown.data.description,
            createdTime: markdown.data.createdTime,
            updatedTime: markdown.data.updatedTime,
            readingTime: markdown.data.readingTime,
            category: markdown.data.category,
            tag: markdown.data.tag,
            originBasename: f,
            url: url
        }
        return post;
    }));

    sortPostsByCreatedTime(posts);

    const quotient = Math.trunc(posts.length / POSTS_PER_PAGE);
    const remainder = posts.length % POSTS_PER_PAGE;
    const total = quotient + (remainder == 0 ? 0 : 1);

    /** @type {PostsPageInfo} */
    const postsPageInfo = {
        postsPerPage: POSTS_PER_PAGE,
        totalPages: total,
        length: posts.length,
    }
    
    await fs.writeFile(
        path.join(JSON_DIR, './posts-page-info.json'),
        JSON.stringify(postsPageInfo, null, 2)
        );
    for (let i = 0; i < total; i++) {
        const jsonFilename = path.join(JSON_DIR, './posts-page-' + (i + 1) + '.json');
        const postsPerPage = posts.splice(0, POSTS_PER_PAGE);

        await fs.writeFile(jsonFilename, JSON.stringify(postsPerPage, null, 2));
    }
})();
