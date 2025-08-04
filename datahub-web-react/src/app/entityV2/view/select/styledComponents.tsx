import { RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styled from 'styled-components';

import { ANTD_GRAY, REDESIGN_COLORS } from '@app/entityV2/shared/constants';
import { VIEW_CARD_MIN_WIDTH } from '@app/entityV2/view/select/constants';
import { colors, typography } from '@src/alchemy-components';

export const NoMarginButton = styled(Button)`
    && {
        margin: 0px;
    }
`;

export const StyledRightOutlined = styled(RightOutlined)`
    && {
        font-size: 8px;
        color: ${(props) => props.theme.styles['text-color-secondary']}; // Change
    }
`;

export const ViewContainer = styled.div<{
    $selected?: boolean;
    $isShowNavBarRedesign?: boolean;
    $fixedWidth?: boolean;
}>`
    ${(props) =>
        !props.$isShowNavBarRedesign &&
        `
        display: grid;
        grid-template-columns: 0.5fr 90px 20px;
        gap: 10px;
    `}
    cursor: pointer;
    align-items: center;

    ${(props) =>
        props.$isShowNavBarRedesign &&
        `
        padding: 8px;
        border-radius: 8px;
        display: flex;
        background-color: ${props.theme.styles['component-background']};
        gap: 8px;
        ${
            props.$fixedWidth
                ? `width: ${VIEW_CARD_MIN_WIDTH}px;`
                : `
            width: 100%;
            min-width: ${VIEW_CARD_MIN_WIDTH}px;
            max-width: ${VIEW_CARD_MIN_WIDTH * 2}px;
        `
        }

        height: 72px;
        border: 1px solid ${props.$selected ? props.theme.styles['primary-color'] : props.theme.styles['border-color-base']}; // Change

        :hover {
            border: 1px solid ${props.theme.styles['primary-color']};
            box-shadow: 0px 1px 2px 0px rgba(33, 23, 95, 0.07); // Change
        }
    `}
`;

export const ViewIcon = styled.div<{ $selected?: boolean }>`
    border: 1px solid ${(props) => props.theme.styles['border-color-base']}; // Change
    display: flex;
    align-items: center;
    border-radius: 10px;
    padding: 20px;
    position: relative;
    border: ${(props) => (props.$selected ? `1px solid ${props.theme.styles['text-color-secondary']} !important` : '')}; // Change
    background: ${(props) => (props.$selected ? props.theme.styles['primary-color'] : props.theme.styles['component-background'])}; // Change
    &.static {
        border: 1px solid ${(props) => props.theme.styles['text-color-secondary']}; // Change
    }
`;

export const ViewIconNavBarRedesign = styled.div<{ $selected?: boolean }>`
    background-color: ${(props) => (props.$selected ? props.theme.styles['primary-color'] : props.theme.styles['component-background'])}; // Change
    border-radius: 200px;
    height: 32px;
    width: 32px;
    padding: 0 6px 0 4px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        color: ${(props) => (props.$selected ? props.theme.styles['layout-header-color'] : props.theme.styles['text-color'])}; // Change
    }
`;

export const ViewContent = styled.div<{ $isShowNavBarRedesign?: boolean; $fixedWidth?: boolean }>`
    color: ${(props) => props.theme.styles['text-color']}; // Change
    ${(props) => !props.$isShowNavBarRedesign && 'min-width: 100px;'}
    ${(props) =>
        props.$isShowNavBarRedesign &&
        `
        min-width: 160px;
        ${!props.$fixedWidth && 'width: 100%;'}
    `}
`;

export const ViewLabel = styled.div<{ $isShowNavBarRedesign?: boolean }>`
    ${(props) => props.$isShowNavBarRedesign && `color: ${props.theme.styles['text-color-secondary']};`} // Change
    font-size: 14px;
    font-weight: 400;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 18px;
`;

export const CardViewLabel = styled(ViewLabel)<{ $isShowNavBarRedesign?: boolean }>`
    ${(props) =>
        props.$isShowNavBarRedesign &&
        `
        font-family: ${typography.fonts.body};
        font-size: 16px;
        font-weight: 700;
    `}
`;

export const ViewDescription = styled.div<{ $isShowNavBarRedesign?: boolean }>`
    font-weight: 400;
    ${(props) => !props.$isShowNavBarRedesign && 'opacity: 0.5;'}
    ${(props) =>
        props.$isShowNavBarRedesign &&
        `
        font-size: 14px;
        font-weight: 500;
        color: ${props.theme.styles['text-color-secondary']};
        font-family: ${typography.fonts.body};
    `}
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;
