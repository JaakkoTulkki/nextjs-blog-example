import React from 'react';
import {majorScale, Pane} from "evergreen-ui";
import Container from "./container";
import NextLink from 'next/link'


const Nav = () => {
    return <nav>
        <Pane width="100vm" paddingY={majorScale(1)} borderBottom height={majorScale(9)}>
            <Container height="100%">
                <Pane display="flex" justifyContent="space-between" alignItems="center" height="100%">
                    <NextLink href="/blog">
                        <a>Open Blog Platform</a>
                    </NextLink>
                </Pane>
            </Container>
        </Pane>
    </nav>
};

export default Nav;