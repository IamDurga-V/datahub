import { Icon, colors, typography } from '@components';
import { Dropdown } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React from 'react';
import styled from 'styled-components';

export const MenuItem = styled.div`
    display: flex;
    padding: 5px 50px 5px 5px;
    font-size: 14px;
    font-weight: 500;
    color: ${(props) => props.theme.styles['text-secondary']};
    font-family: ${(props) => props.theme.styles['font-family-body']};
`;

const ActionIcons = styled.div`
    display: flex;
    justify-content: end;
    gap: 12px;

    div {
        border: 1px solid ${(props) => props.theme.styles['border-default']};
        border-radius: 200px;
        width: 24px;
        height: 24px;
        padding: 4px;
        color: ${(props) => props.theme.styles['text-primary']};

        :hover {
            cursor: pointer;
        }
    }
`;


interface Props {
    dropdownItems?: ItemType[];
    extraActions?: React.ReactNode;
}

export default function BaseActionsColumn({ dropdownItems, extraActions }: Props) {
    return (
        <ActionIcons onClick={(e) => e.stopPropagation()}>
            {extraActions}
            <Dropdown menu={{ items: dropdownItems }} trigger={['click']}>
                <Icon icon="DotsThreeVertical" source="phosphor" />
            </Dropdown>
        </ActionIcons>
    );
}
