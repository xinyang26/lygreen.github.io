import fs from 'fs/promises'
import path from 'path';

import { POSTS_DIR } from './execConfig.mjs'

const count = process.argv[2];

if (count == undefined) {
    console.log("Please input a count.");
    process.exit(-1);
}

const today = new Date(Date.now()).toLocaleString('zh-cn');

const markdown = `\
---
title: '\${title}'
description: '\${description}'
createdTime: \'${ today }\'
updatedTime: \'${ today }\'
readingTime: 0
category: \${categories}
tag: \${tags}
hash: ''
---\
`;

(() => {
    for (let i = 0; i < count; i++) {
        const categoryCount = Math.ceil(Math.random() * 5);
        const tagCount = Math.ceil(Math.random() * 5);
        
        let content = new String(markdown);
        let categories = "";
        let tags = "";
        content = content.replace("${title}", "测试标题 " + i);
        content = content.replace("${description}", "测试描述 " + i);
        for (let j = 0; j < categoryCount; j++) {
            categories += "\n  - 测试分类 " + Math.ceil(Math.random() * 99);
        }
        for (let j = 0; j < categoryCount; j++) {
            tags += "\n  - 测试标签 " + Math.ceil(Math.random() * 99);
        }
        content = content.replace("${categories}", categories);
        content = content.replace("${tags}", tags);

        fs.writeFile(path.join(POSTS_DIR, "test-" + i + ".md"), content);
    }
})();
