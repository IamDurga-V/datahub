import { Button, Input, Modal } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components/macro';

type Props = {
    onCloseModal: () => void;
    onOk?: (result: string) => void;
    title?: string;
    defaultValue?: string;
};

const StyledModal = styled(Modal)`
    .ant-modal-content {
        background-color: ${(props) => props.theme.styles['component-background']};
        color: ${(props) => props.theme.styles['text-color']};
    }

    .ant-modal-title {
        color: ${(props) => props.theme.styles['text-color']};
    }
`;

const StyledInput = styled(Input)`
    background-color: ${(props) => props.theme.styles['component-background']};
    color: ${(props) => props.theme.styles['text-color']};
    border: 1px solid ${(props) => props.theme.styles['border-color-base']};

    &:hover,
    &:focus {
        border-color: ${(props) => props.theme.styles['primary-color']};
    }

    input {
        background-color: ${(props) => props.theme.styles['component-background']};
        color: ${(props) => props.theme.styles['text-color']};
    }
`;

export const EditTextModal = ({ defaultValue, onCloseModal, onOk, title }: Props) => {
    const [stagedValue, setStagedValue] = useState(defaultValue || '');
    return (
        <StyledModal
            title={title}
            visible
            onCancel={onCloseModal}
            keyboard
            footer={
                <>
                    <Button onClick={onCloseModal} type="text">
                        Cancel
                    </Button>
                    <Button
                        data-testid="edit-text-done-btn"
                        disabled={stagedValue.trim().length === 0}
                        onClick={() => onOk?.(stagedValue)}
                    >
                        Done
                    </Button>
                </>
            }
        >
            <StyledInput
                data-testid="edit-text-input"
                onChange={(e) => setStagedValue(e.target.value)}
                value={stagedValue}
            />
        </StyledModal>
    );
};
