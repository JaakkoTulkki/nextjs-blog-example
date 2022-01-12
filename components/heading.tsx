import React from 'react';
import {Heading, majorScale} from "evergreen-ui";

export const BigHeading = ({children}) =>
    <Heading fontSize="clamp(2rem, 8vw, 6rem)" lineHeight="clamp(2rem, 8vw, 6rem)" marginY={majorScale(3)}>
        {children}
    </Heading>