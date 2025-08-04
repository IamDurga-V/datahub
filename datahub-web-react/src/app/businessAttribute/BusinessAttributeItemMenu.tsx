import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Modal, message } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { MenuIcon } from '@app/entity/shared/EntityDropdown/EntityDropdown';
import { MenuItemStyle } from '@app/entity/view/menu/item/styledComponent';

import { useDeleteBusinessAttributeMutation } from '@graphql/businessAttribute.generated';

type Props = {
    urn: string;
    title: string | undefined;
    onDelete?: () => void;
    onEdit?: () => void;
};

// CHANGE: We're creating a styled component for the Dropdown's Menu
const StyledMenu = styled(Menu)`
    &&& {
        background-color: ${(props) => props.theme.styles['component-background']};
        border-color: ${(props) => props.theme.styles['border-color-base']};
        color: ${(props) => props.theme.styles['text-color']};
    }
    &&& .ant-dropdown-menu-item {
        color: ${(props) => props.theme.styles['text-color']};
    }
    &&& .ant-dropdown-menu-item:hover {
        background-color: ${(props) => props.theme.styles['highlight-color']};
    }
    &&& .ant-dropdown-menu-item-selected {
        background-color: ${(props) => props.theme.styles['highlight-color']};
    }
`;

export default function BusinessAttributeItemMenu({ title, urn, onDelete, onEdit }: Props) {
    const [deleteBusinessAttributeMutation] = useDeleteBusinessAttributeMutation();

    const deletePost = () => {
        deleteBusinessAttributeMutation({
            variables: {
                urn,
            },
        })
            .then(({ errors }) => {
                if (!errors) {
                    message.success('Deleted Business Attribute!');
                    onDelete?.();
                }
            })
            .catch(() => {
                message.destroy();
                message.error({
                    content: `Failed to delete Business Attribute!: An unknown error occurred.`,
                    duration: 3,
                });
            });
    };

    const onConfirmDelete = () => {
        Modal.confirm({
            title: `Delete Business Attribute '${title}'`,
            content: `Are you sure you want to remove this Business Attribute?`,
            onOk() {
                deletePost();
            },
            onCancel() {},
            okText: 'Yes',
            maskClosable: true,
            closable: true,
        });
    };

    const items = [
        {
            key: 'delete',
            label: (
                <MenuItemStyle onClick={onConfirmDelete}>
                    <DeleteOutlined /> &nbsp;Delete
                </MenuItemStyle>
            ),
        },
    ];

    // This is the item for editing, it's not being rendered in the previous version
    // but we'll include it here just in case you want to use it
    if (onEdit) {
        items.push({
            key: 'edit',
            label: (
                <MenuItemStyle onClick={onEdit}>
                    <EditOutlined /> &nbsp;Edit
                </MenuItemStyle>
            ),
        });
    }

    return (
        <Dropdown trigger={['click']} overlay={<StyledMenu items={items} />}>
            <MenuIcon data-testid={`dropdown-menu-${urn}`} fontSize={20} />
        </Dropdown>
    );
}
