import React from 'react';
import styled from 'styled-components/macro';

import { Text } from '@src/alchemy-components';

interface Props {
    text: string;
}

const StyledText = styled(Text)`
    color: ${(props) => props.theme.styles['text-color-muted']};
`;

export default function SectionHeader({ text }: Props) {
    return <StyledText weight="semiBold">{text}</StyledText>;
}
