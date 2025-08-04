import { Sidebar } from '@phosphor-icons/react';
import React from 'react';
import styled from 'styled-components';

import { useNavBarContext } from '@app/homeV2/layout/navBarRedesign/NavBarContext';
import { colors } from '@src/alchemy-components';

const Toggler = styled.button<{ $isCollapsed?: boolean }>`
    cursor: pointer;
    margin: 0 0 0 auto;
    padding: 4px;
    border-radius: 6px;
    border: none;
    display: flex;
    transition: left 250ms ease-in-out;
    transition: background 300ms ease-in;
    background: ${(props) => props.theme.styles['component-background']};

    &: hover {
        background: ${(props) => props.theme.styles['highlight-color']};
    }

    & svg {
        height: 20px;
        width: 20px;
        color: ${(props) => props.theme.styles['text-color']};
    }
`;

export default function NavBarToggler() {
    const { toggle } = useNavBarContext();

    return (
        <Toggler onClick={toggle} aria-label="Navbar toggler">
            <Sidebar />
        </Toggler>
    );
}
