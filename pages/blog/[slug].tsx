import DefaultErrorPage from 'next/error'
import {getPosts} from "../../shared/getPosts";
import { useRouter } from 'next/router'
import {Pane} from "evergreen-ui";
import Head from "next/head";
import Container from "../../components/container";
import matter from "gray-matter";
import {serialize} from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import {BigHeading} from "../../components/heading";


export default function BlogPost({source, post}) {
    console.log(post);
    const router = useRouter()
    if(router.isFallback) {
        return <div>Loading</div>;
    }
    if(!post.data) {
        return <DefaultErrorPage statusCode={404}/>
    }
    return <Pane>
        <Head>
            <title>{`Open Blog | ${post.data.title}`}</title>
            <meta name="description" content={post.data.summary} />
        </Head>
        <main>
            <Container>
                <BigHeading>{post.data.title}</BigHeading>
                <Pane><MDXRemote {...source} ></MDXRemote></Pane>
            </Container>
        </main>
    </Pane>;
}

export async function getStaticPaths() {
    const posts = getPosts();
    const paths = posts.map((post) => {
        return {params: {slug: post.data.slug}};
    })
    return {paths, fallback: true};
}

export async function getStaticProps({params}) {
    // console.log(params);
    const posts = getPosts();
    const post = posts.find(post => post.data.slug === params.slug);
    if(typeof post === 'undefined') {
        return {
            props: {
                post: {}
            }
        }
    }
    const {content} = matter(post as any);
    const mdxSource = await serialize(content)
    return {
        props: {post, source: mdxSource},
    }
}