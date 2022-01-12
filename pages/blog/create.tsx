import React from 'react';
import Container from "../../components/container";
import {BigHeading} from "../../components/heading";
import {Pane} from "evergreen-ui";
import dynamic from 'next/dynamic'
import HeadComponent from "../../components/head";

const Editor = dynamic(() => import('../../components/editor'), {ssr: false})

export default function CreateBlogPost() {
    return <>
        <HeadComponent desc={'create your post'} title="Create a Blog post" />
        <Container>
            <BigHeading>Create Your Own Blog Post</BigHeading>
            <Pane display="flex" alignItems="center">
                <Editor/>
            </Pane>
        </Container>
    </>;
}