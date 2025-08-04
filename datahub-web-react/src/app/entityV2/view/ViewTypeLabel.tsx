import { GlobalOutlined, LockOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { DataHubViewType } from '@types';

const StyledLockOutlined = styled(LockOutlined)`
    color: ${(props) => props.theme.styles['text-color-secondary']};
    margin-right: 4px;
`;

const StyledGlobalOutlined = styled(GlobalOutlined)`
    color: ${(props) => props.theme.styles['text-color-secondary']};
    margin-right: 4px;
`;

const StyledText = styled(Typography.Text)`
    && {
        color: ${(props) => props.theme.styles['text-color-secondary']};
    }
`;

type Props = {
    type: DataHubViewType;
    onClick?: () => void;
};

/**
 * Label used to describe View Types
 */
export const ViewTypeLabel = ({ type, onClick }: Props) => {
    const copy =
        type === DataHubViewType.Personal ? (
            <>
                <b>Private</b> - only visible to you.
            </>
        ) : (
            <>
                <b>Public</b> - visible to everyone.
            </>
        );
    const Icon = type === DataHubViewType.Global ? StyledGlobalOutlined : StyledLockOutlined;

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div onClick={onClick}>
            <Icon />
            <StyledText type="secondary">
                {copy}
            </StyledText>
        </div>
    );
};
