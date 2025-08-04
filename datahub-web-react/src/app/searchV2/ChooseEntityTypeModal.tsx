import { Button, Modal, Select } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

import { useEntityRegistry } from '@app/useEntityRegistry';

import { EntityType } from '@types';

type Props = {
    onCloseModal: () => void;
    onOk?: (results: string[]) => void;
    title?: string;
    defaultValues?: string[];
};

const { Option } = Select;

const StyledSelect = styled(Select)`
    width: 100%;
    background-color: ${(props) => props.theme.styles['input-background-color']};
    color: ${(props) => props.theme.styles['text-color']};
    border: 1px solid ${(props) => props.theme.styles['border-color-base']};
`;

export const ChooseEntityTypeModal = ({ defaultValues, onCloseModal, onOk, title }: Props) => {
    const entityRegistry = useEntityRegistry();
    const entityTypes = entityRegistry.getSearchEntityTypes();

    const [stagedValues, setStagedValues] = useState(defaultValues || []);

    const addEntityType = (newType: string) => {
        setStagedValues([...stagedValues, newType]);
    };

    const removeEntityType = (type: string) => {
        setStagedValues(stagedValues.filter((stagedValue) => stagedValue !== type));
    };

    return (
        <Modal
            title={title}
            visible
            onCancel={onCloseModal}
            keyboard
            footer={
                <>
                    <Button onClick={onCloseModal} type="text">
                        Cancel
                    </Button>
                    <Button disabled={stagedValues.length === 0} onClick={() => onOk?.(stagedValues)}>
                        Done
                    </Button>
                </>
            }
        >
            <StyledSelect
                mode="multiple"
                placeholder="Datasets, Dashboards, Charts, and more..."
                onSelect={(newValue) => addEntityType(newValue)}
                onDeselect={(newValue) => removeEntityType(newValue)}
                value={stagedValues.map((stagedEntityType) => ({
                    value: stagedEntityType,
                    label: entityRegistry.getCollectionName(stagedEntityType as EntityType),
                }))}
                dropdownMatchSelectWidth={false}
            >
                {entityTypes.map((type) => (
                    <Option key={type} value={type}>
                        {entityRegistry.getCollectionName(type)}
                    </Option>
                ))}
            </StyledSelect>
        </Modal>
    );
};
