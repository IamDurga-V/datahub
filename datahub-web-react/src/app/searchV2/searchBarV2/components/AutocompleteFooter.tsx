import { ArrowDown, ArrowElbowDownLeft, ArrowUp } from 'phosphor-react';
import React from 'react';
import styled from 'styled-components';

import KeyIcon from '@app/searchV2/searchBarV2/components/KeyIcon';
import { Text } from '@src/alchemy-components';

const Container = styled.div`
    position: sticky;
    bottom: 0;

    border-top: 1px solid ${(props) => props.theme.styles['border-color-base']};
    border-radius: 0 0 ${(props) => props.theme.styles['border-radius-navbar-redesign']} ${(props) => props.theme.styles['border-radius-navbar-redesign']};

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;

    background-color: ${(props) => props.theme.styles['component-background']};
    height: 36px;
    width: 100%;

    padding: 8px 16px;
`;

const KeySuggestion = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
`;

interface Props {
    isSomethingSelected?: boolean;
}

export default function AutocompleteFooter({ isSomethingSelected }: Props) {
    return (
        <Container>
            <KeySuggestion>
                <KeyIcon icon={ArrowUp} />
                <KeyIcon icon={ArrowDown} />
                <Text color="gray" size="sm" weight="semiBold">
                    Navigate
                </Text>
            </KeySuggestion>

            <KeySuggestion>
                <KeyIcon icon={ArrowElbowDownLeft} />
                <Text color="gray" size="sm" weight="semiBold">
                    {isSomethingSelected ? 'Select' : 'Search All'}
                </Text>
            </KeySuggestion>
        </Container>
    );
}
