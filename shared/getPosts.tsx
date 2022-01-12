import path from "path";
import fs from "fs";
import matter from "gray-matter";
import {Post} from "./interfaces";

export function getPosts(): Post[] {
    const postsDir = path.join(process.cwd(), 'posts');
    const postNames = fs.readdirSync(postsDir);
    const posts = postNames.map(filename => {
        return matter(fs.readFileSync(path.join(postsDir, filename), 'utf-8'));
    }).map((post) => {
        delete post.orig;
        return post;
    })
    return posts;
}