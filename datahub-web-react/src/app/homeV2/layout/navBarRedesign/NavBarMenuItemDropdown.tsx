import { Dropdown, MenuItemProps } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import NavBarMenuItem from '@app/homeV2/layout/navBarRedesign/NavBarMenuItem';
import { NavBarMenuDropdownItem } from '@app/homeV2/layout/navBarRedesign/types';
import { Text, colors } from '@src/alchemy-components';

const StyledDropdownContentWrapper = styled.div`
    background-color: ${(props) => props.theme.styles['component-background']};
    border-radius: ${(props) => props.theme.styles['border-radius-navbar-redesign']};
    box-shadow: ${(props) => props.theme.styles['box-shadow-navbar-redesign']};
    padding: 8px;
`;

const StyledDropDownOption = styled.div<{ $disabled?: boolean }>`
    padding: 8px;
    border-radius: ${(props) => props.theme.styles['border-radius-navbar-redesign']};
    ${(props) =>
        props.$disabled
            ? `color: ${props.theme.styles['disabled-color']} !important;`
            : `
            cursor: pointer;
            &:hover {
                background-color: ${props.theme.styles['highlight-color']};
            }
    `}
`;

type Props = {
    item: NavBarMenuDropdownItem;
    isCollapsed?: boolean;
    isSelected?: boolean;
} & MenuItemProps;

export default function NavBarMenuItemDropdown({ item, isCollapsed, isSelected, ...props }: Props) {
    const history = useHistory();

    const dropdownItems = item.items?.filter((subItem) => !subItem.isHidden);

    const onItemClick = (key) => {
        const clickedItem = item.items?.filter((dropdownItem) => dropdownItem.key === key)?.[0];
        if (!clickedItem) return null;

        if (clickedItem.disabled) return null;

        if (clickedItem.onClick) return clickedItem.onClick();

        if (clickedItem.link && clickedItem.isExternalLink)
            return window.open(clickedItem.link, '_blank', 'noopener,noreferrer');
        if (clickedItem.link && !clickedItem.isExternalLink) return history.push(clickedItem.link);

        return null;
    };

    return (
        <Dropdown
            dropdownRender={() => {
                return (
                    <StyledDropdownContentWrapper>
                        {dropdownItems?.map((dropdownItem) => {
                            return (
                                <StyledDropDownOption
                                    key={dropdownItem.key}
                                    $disabled={dropdownItem.disabled}
                                    role="menuitem"
                                    aria-label={dropdownItem.title}
                                    aria-disabled={dropdownItem.disabled}
                                    onClick={() => onItemClick(dropdownItem.key)}
                                >
                                    <Text>{dropdownItem.title}</Text>
                                    {dropdownItem.description && (
                                        <Text size="sm" color="gray">
                                            {dropdownItem.description}
                                        </Text>
                                    )}
                                </StyledDropDownOption>
                            );
                        })}
                    </StyledDropdownContentWrapper>
                );
            }}
        >
            <NavBarMenuItem item={item} isCollapsed={isCollapsed} isSelected={isSelected} {...props} />
        </Dropdown>
    );
}
