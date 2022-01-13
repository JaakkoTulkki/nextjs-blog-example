import React, {useEffect, useRef, useState} from 'react';
import {Button, majorScale, Pane} from "evergreen-ui";
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import slugify from "slugify";
import { useRouter } from 'next/router'
import {type} from "os";

function createMd(data) {
    const date = new Date(data.time).toISOString().slice(0, 10);
    const title = data.blocks[0].data.text;
    const slug = slugify(title, {lower: true});
    const author = 'Anonymous';
    const text = data.blocks.slice(1).reduce((acc, d) => {
        return `${acc} ${d.data.text}`;
    }, '').replaceAll('<br>', '<br />');

    const summary = text.slice(0, 20) + "...";
    return {
        date,
        title,
        slug,
        summary,
        author,
        text,
    };
}

const Editor = () => {
    const router = useRouter();
    const editorJs = useRef(null);
    const [saving, setSaving] = useState(false);
    const save = async () => {
        if(editorJs.current) {
            setSaving(true);
            const data = await editorJs.current.save();
            editorJs.current.readOnly.toggle();
            const payload = createMd(data);
            try {
                const res  = await fetch('/api/blog', {method: 'POST', body: JSON.stringify(payload)})
                const json = await res.json();
                router.push('/blog');
            } catch (e) {
                console.log(e);
            }
            editorJs.current.readOnly.toggle();
            setSaving(false);
        }
    };
    useEffect(() => {
        editorJs.current = new EditorJS({
            holder: 'editorjs',
            autofocus: true,
            readOnly: false,
            tools: {
                header: Header,
            },
            data: {
                blocks: [
                    {
                        type: "header",
                        data: {
                            text: "Title",
                            level: 2
                        }
                    },
                    {
                        type: 'paragraph',
                        data: {
                            text: 'Text here...'
                        }
                    },
                ],
            },
        });
        return () => {
            if(editorJs.current && typeof editorJs.current === 'function') {
                editorJs.current.destroy();
            }
        }
    }, []);
    return <Pane width="100%" position="relative">
        <div id="editorjs" style={{boxShadow: '8px 4px 4px #9f9f9f', width: '100%', backgroundColor: '#F5F5F5'}}/>

        <Pane textAlign="right" marginTop={majorScale(2)}>
            <Button disabled={saving} onClick={save}>{saving? 'Saving...' : 'Save'}</Button>
        </Pane>
    </Pane>;
}

export default Editor;