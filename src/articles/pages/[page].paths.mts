
import path from 'path';

import Post from '../../.script/post.mjs'
import { getDirPosts, sortPostsByCreatedTime } from '../../.script/util.mts';

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

