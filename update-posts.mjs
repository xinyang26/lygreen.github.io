import fs from 'fs/promises'
import path from 'path';
import crypto from 'crypto';
import matter from 'gray-matter';

const srcDir = './src';
const postsDir = './posts';

function getReadingTime(text) {
    const cnCharCount = (text?.match(/[\u4e00-\u9fa5]/g) || []).length;
    const enWordCount = (text?.match(/\b[a-zA-Z]+\b/g) || []).length;

    const wordsPerMinute = 300;
    const totalWordCount = cnCharCount + enWordCount;

    const time = Math.ceil(totalWordCount / wordsPerMinute);
    return time;
}

async function main() {
    const files = await fs.readdir(path.join(srcDir, postsDir));

    await Promise.all(
        files.map(async f => {
            const fullpath = path.join(srcDir, postsDir, f);
            const data = await fs.readFile(fullpath, 'utf-8');
            const markdown = matter(data);
            const oldHash = markdown.data.hash;
            const newHash = crypto.createHash('sha256').update(markdown.content).digest('hex');
            if (oldHash != newHash) {
                const fileUpdatedTime = (await fs.stat(fullpath)).mtime.toLocaleString('zh-cn');
                markdown.data.updatedTime = fileUpdatedTime;
                markdown.data.readingTime = getReadingTime(markdown.content);
                markdown.data.hash = newHash;
                await fs.writeFile(fullpath, matter.stringify(markdown.content, markdown.data));
            }

        })
    );
}

main();
