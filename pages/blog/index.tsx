import React from 'react';
import path from "path";
import * as fs from "fs";
import matter from "gray-matter";
import {Post} from "../../shared/interfaces";
import {Pane, Heading, Paragraph, Button, majorScale} from 'evergreen-ui';
import Container from "../../components/container";
import Link from 'next/link';
import {getPosts} from "../../shared/getPosts";
import HeadComponent from "../../components/head";

export default function Blog({posts}: { posts: Post[] }) {
    return <Pane>
        <HeadComponent title={'List of posts'} desc={'list of blog posts'}/>
        <main>
            <Container>
                <Pane display="flex" justifyContent="space-between" alignItems="center">
                    <Pane>
                        <h1>Posts</h1>
                    </Pane>
                    <Pane>
                        <Link href={`/blog/create`}><a><Button>Create Your Own Post</Button></a></Link>
                    </Pane>
                </Pane>
                {posts.map((post => {
                    return <Pane key={post.data.title} padding={majorScale(4)} border borderRadius={2} marginY={majorScale(1)}>
                        <Heading size={500}>{post.data.title}</Heading>
                        <Paragraph paddingBottom={majorScale(2)}>{post.data.summary}</Paragraph>
                        <Pane>
                            <Link href={`/blog/${post.data.slug}`}>
                                <a><Button>Read the full post</Button></a>
                            </Link>
                        </Pane>
                    </Pane>
                }))}
            </Container>
        </main>
    </Pane>
}

export async function getServerSideProps() {
    const posts = getPosts();
    console.log(posts);
    return {
        props: {
            posts
        },
    }
}