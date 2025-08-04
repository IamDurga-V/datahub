import { MagnifyingGlass } from '@phosphor-icons/react';
import React from 'react';
import styled, { useTheme } from 'styled-components/macro';

import { Text } from '@src/alchemy-components';

const RecommendedOptionWrapper = styled.div`
    margin-left: 0;
    display: flex;
    align-items: center;
    gap: 8px;
`;

interface Props {
    text: string;
}

export default function RecentSearch({ text }: Props) {
    const theme = useTheme();

    return (
        <RecommendedOptionWrapper>
            <MagnifyingGlass size={20} color={theme.styles['text-color-secondary']} />
            <Text weight="semiBold">{text}</Text>
        </RecommendedOptionWrapper>
    );
}
