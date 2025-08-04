import React from 'react';
import styled from 'styled-components';

import { ANTD_GRAY } from '@app/entityV2/shared/constants';

type Props = {
    icon: any;
    onClick?: () => void;
    enabled?: boolean;
};

const IconContainer = styled.div<{ enabled?: boolean }>`
    width: 28px;
    height: 28px;
    background-color: ${(props) => props.theme.styles['background-color-light']}; // Change
    cursor: pointer;
    border-radius: 50%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & svg {
        font-size: 14px;
        color: ${(props) => props.theme.styles['text-color-secondary']}; // Change
    }
    border: 1px solid ${(props) => props.theme.styles['border-color-base']}; // Change
    :hover {
        border: 1px solid ${({ enabled, theme }) => (enabled ? theme.styles['highlight-border-color'] : theme.styles['border-color-base'])}; // Change
    }
`;

const CardActionCircle = ({ icon, onClick, enabled }: Props) => {
    return (
        <IconContainer enabled={enabled} onClick={onClick}>
            {icon}
        </IconContainer>
    );
};

export default CardActionCircle;