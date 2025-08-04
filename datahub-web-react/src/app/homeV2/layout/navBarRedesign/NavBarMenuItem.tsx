import { Menu, MenuItemProps, Tooltip } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { getColor } from '@components/theme/utils';

import { NavBarMenuBaseItem } from '@app/homeV2/layout/navBarRedesign/types';
import { Badge, Text, colors } from '@src/alchemy-components';

const StyledMenuItem = styled(Menu.Item)<{ isCollapsed?: boolean }>`
    &&& {
        position: relative;
        padding: 4px 8px;
        margin: 8px 0;
        margin-bottom: 0;
        height: 36px;
        min-height: 36px;
        border-radius: 6px;
        border: 0;
        display: flex;
        align-items: center;
        ${(props) => props.isCollapsed && 'width: 36px;'}
        @media (max-height: 935px) {
            margin: 4px 0;
        }
        @media (max-height: 890px) {
            margin: 2px 0;
        }
        @media (max-height: 835px) {
            margin: 0;
        }
    }

    && svg {
        color: ${(props) => props.theme.styles['text-color']};
        width: 20px;
        height: 20px;
    }

    && .ant-menu-title-content {
        width: 100%;
        color: ${(props) => props.theme.styles['text-color-secondary']};
        font-family: Mulish;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 36px;
        display: flex;
        gap: 8px;
        align-items: center;
        height: 36px;
        line-height: 24px;
    }

    &:hover,
    &.ant-menu-item-active {
        background: ${(props) => props.theme.styles['highlight-color']};
        box-shadow: 0px 0px 0px 1px rgba(139, 135, 157, 0.08);
    }

    &&.ant-menu-item-selected {
        background: ${(props) => props.theme.styles['highlight-color']};
        box-shadow: 0px 0px 0px 1px rgba(108, 71, 255, 0.08);
    }
`;

const Icon = styled.div<{ $isSelected?: boolean; $size?: number }>`
    width: ${(props) => props.$size ?? 20}px;
    height: ${(props) => props.$size ?? 20}px;

    && svg {
        ${(props) =>
            props.$isSelected
                ? `fill: url(#menu-item-selected-gradient) ${props.theme.styles['primary-color']};`
                : `color: ${props.theme.styles['text-color-secondary']};`}
        width: ${(props) => props.$size ?? 20}px;
        height: ${(props) => props.$size ?? 20}px;
    }
`;

const StyledText = styled(Text)<{ $isSelected?: boolean }>`
    ${(props) =>
        props.$isSelected &&
        `
        color: ${props.theme.styles['text-color']};
    `}
`;

const ItemTitleContentWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const PillDot = styled.div<{ $isSelected?: boolean }>`
    position: absolute;
    width: 10px;
    height: 10px;
    background: ${(props) => props.theme.styles['primary-color']};
    border-radius: 6px;
    border: 2px solid ${(props) => (props.$isSelected ? props.theme.styles['component-background'] : props.theme.styles['border-color-base'])};
    top: 6px;
    left: 22px;
`;

type Props = {
    item: NavBarMenuBaseItem;
    isCollapsed?: boolean;
    isSelected?: boolean;
    iconSize?: number;
} & MenuItemProps;

export default function NavBarMenuItem({ item, isCollapsed, isSelected, iconSize, ...props }: Props) {
    const history = useHistory();

    const onClick = () => {
        if (item.link) return history.push(item.link);
        if (item.onClick) return item.onClick();
        return null;
    };

    const component = (
        <Tooltip title={isCollapsed ? item.title : null} placement="right" showArrow={false}>
            <StyledMenuItem
                isCollapsed={isCollapsed}
                onClick={onClick}
                aria-label={item.title}
                {...props}
                data-testid={item.dataTestId}
            >
                {item.icon || item.selectedIcon ? (
                    <Icon $size={iconSize} $isSelected={isSelected}>
                        {isSelected ? item.selectedIcon || item.icon : item.icon}
                    </Icon>
                ) : null}
                {isCollapsed ? (
                    <>{item?.badge?.show && <PillDot $isSelected={isSelected} />}</>
                ) : (
                    <ItemTitleContentWrapper>
                        <StyledText size="md" type="div" weight="semiBold" $isSelected={isSelected}>
                            {item.title}
                        </StyledText>
                        {item?.badge?.show && <Badge count={item.badge.count} clickable={false} color="primary" />}
                    </ItemTitleContentWrapper>
                )}
            </StyledMenuItem>
        </Tooltip>
    );

    if (item.href) {
        return <a href={item.href}>{component}</a>;
    }

    return component;
}
