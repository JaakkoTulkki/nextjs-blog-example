import path from "path";
import fs from "fs";

function createPostContents({title, date, slug, summary, author, text}) {
    return `---
title: ${title}
publishedOn: "${date}"
author: ${author}
summary: ${summary}
slug: ${slug}
---

${text}
`;
}

export default async function handler(req, res) {
    if(req.method.toLowerCase() === 'post') {
        const {
            date,
            title,
            slug,
            summary,
            author,
            text,
        } = JSON.parse(req.body);
        const postsDir = path.join(process.cwd(), 'posts');
        const newFileName = path.join(postsDir, `${slug}.mdx`);
        fs.writeFile(newFileName, createPostContents({date, title, slug, summary, author, text}), function (err) {
            if(err) throw err;
            res.status(200).json(req.body);
        })
    }
    if(req.method.toLowerCase() === 'get') {
        res.status(200).send('Nothing to see here');
        return;
    }
}