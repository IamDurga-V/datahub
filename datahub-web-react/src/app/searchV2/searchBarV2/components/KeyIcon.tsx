import { Icon } from '@phosphor-icons/react';
import React from 'react';
import styled from 'styled-components';

interface Props {
    icon: Icon;
}

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    height: 24px;
    width: 32px;
    border: 1px solid ${(props) => props.theme.styles['border-color-base']};
    border-radius: 4px;
    padding: 4px 8px;

    & svg {
        color: ${(props) => props.theme.styles['text-color-secondary']};
    }
`;

export default function KeyIcon({ icon }: Props) {
    const IconComponent = icon;
    return (
        <IconContainer>
            <IconComponent size={16} />
        </IconContainer>
    );
}
