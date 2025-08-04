import { Skeleton } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { ANTD_GRAY } from '@app/entityV2/shared/constants';

const Header = styled.div`
    width: 100%;
    padding-left: 40px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-right: 40px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${(props) => props.theme.styles['border-color-base']}; // Change
    background-color: ${(props) => props.theme.styles['component-background']}; // Change
`;

const Body = styled.div`
    background-color: ${(props) => props.theme.styles['component-background']}; // Change
`;

const HeaderSkeleton = styled(Skeleton.Input)`
    && {
        padding: 0px 12px 12px 0px;
        height: 60px;
        border-radius: 8px;
        width: 540px;
        background-color: ${(props) => props.theme.styles['background-color-light']}; // Change
    }
`;

const CardWrapper = styled.div`
    padding: 20px 40px;
`;

const CardSkeleton = styled(Skeleton.Input)`
    && {
        padding: 0px 12px 12px 0px;
        height: 60px;
        border-radius: 8px;
        width: 100%;
        background-color: ${(props) => props.theme.styles['background-color-light']}; // Change
    }
`;

export const TableLoadingSkeleton = () => {
    return (
        <>
            <Header>
                <HeaderSkeleton active size="large" />
            </Header>
            <Body>
                <CardWrapper>
                    <CardSkeleton active size="large" />
                </CardWrapper>
                <CardWrapper>
                    <CardSkeleton active size="large" />
                </CardWrapper>
                <CardWrapper>
                    <CardSkeleton active size="large" />
                </CardWrapper>
            </Body>
        </>
    );
};
