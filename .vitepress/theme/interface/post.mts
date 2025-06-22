export interface Post {
    title: string,
    description: string,
    url: string,
    createdTime: string,
    updatedTime: string,
    timeFormat?: string,
    readingTime: number,
    category?: string[],
    tag?: string[],
}