import { FilterOutlined } from '@ant-design/icons';
import { Tooltip } from '@components';
import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled(Button)`
    && {
        margin: 0;
        margin-left: 6px;
        padding: 0;
        color: ${(props) => props.theme.styles['text-color-secondary']};
        background: transparent;

        &:hover {
            color: ${(props) => props.theme.styles['text-color']};
        }
    }
`;

const StyledFilterOutlined = styled(FilterOutlined)`
    && {
        font-size: 12px;
    }
`;

const SaveAsViewText = styled.span`
    &&& {
        margin-left: 4px;
    }
`;

const ToolTipHeader = styled.div`
    margin-bottom: 12px;
    color: ${(props) => props.theme.styles['text-color']};
`;

const ToolTipDescription = styled.div`
    color: ${(props) => props.theme.styles['text-color-secondary']};
`;

type Props = {
    onClick: () => void;
};

export const SaveAsViewButton = ({ onClick }: Props) => {
    return (
        <Tooltip
            placement="right"
            title={
                <>
                    <ToolTipHeader>Save these filters as a new View.</ToolTipHeader>
                    <ToolTipDescription>
                        Views allow you to easily save or share search filters.
                    </ToolTipDescription>
                </>
            }
        >
            <StyledButton type="link" onClick={onClick}>
                <StyledFilterOutlined />
                <SaveAsViewText>Save as View</SaveAsViewText>
            </StyledButton>
        </Tooltip>
    );
};
