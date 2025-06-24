import { statSync } from  'fs'
import path from 'path';

const srcDir = path.resolve(import.meta.dirname, "../../../src");

// console.log(srcDir);

export function getReadingTime(text: string | undefined) {
    const cnCharCount = (text?.match(/[\u4e00-\u9fa5]/g) || []).length;
    const enWordCount = (text?.match(/\b[a-zA-Z]+\b/g) || []).length;

    const wordsPerMinute = 300;
    const totalWordCount = cnCharCount + enWordCount;

    const time = Math.ceil(totalWordCount / wordsPerMinute);
    return time;
}

/**
 * 获取创建时间
 * @param filename 文件名（相对于 src 目录）
 * @returns 时间戳
 */
export function getCreatedTime(filename: string) : Date {
    return statSync(path.resolve(srcDir, filename)).birthtime;
}

/**
 * 获取修改时间
 * @param filename 文件名（相对于 src 目录）
 * @returns 时间戳
 */
export function getUpdatedTime(filename: string) : Date {
    return statSync(path.resolve(srcDir, filename)).mtime;
}
