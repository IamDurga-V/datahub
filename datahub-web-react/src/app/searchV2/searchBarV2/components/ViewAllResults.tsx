import { ArrowElbowDownLeft, MagnifyingGlass } from '@phosphor-icons/react';
import React from 'react';
import styled from 'styled-components/macro';
import { useTheme } from 'styled-components';

import KeyIcon from '@app/searchV2/searchBarV2/components/KeyIcon';
import { Text } from '@src/alchemy-components';

const LeftInternalContainer = styled.span`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

interface Props {
    searchText?: string;
}

export default function ViewAllResults({ searchText }: Props) {
    const theme = useTheme();

    return (
        <Container>
            <LeftInternalContainer>
                <MagnifyingGlass size={16} color={theme.styles['icon-color-muted']} />
                <Text color="gray">
                    View all results for&nbsp;
                    <Text type="span" color="gray" weight="semiBold">
                        {searchText}
                    </Text>
                </Text>
            </LeftInternalContainer>
            <KeyIcon icon={ArrowElbowDownLeft} />
        </Container>
    );
}
