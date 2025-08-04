import { PlusOutlined } from '@ant-design/icons';
import { Button, Empty, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components/macro';

import { ANTD_GRAY } from '@app/entity/shared/constants';

const StyledEmpty = styled(Empty)`
    padding: 80px 40px;
    .ant-empty-footer {
        .ant-btn:not(:last-child) {
            margin-right: 8px;
        }
    }
`;

const StyledButton = styled(Button)`
    margin-right: 8px;
`;

const IconContainer = styled.span`
    color: ${(props) => props.theme.styles['text-color']};
    font-size: 40px;
`;

interface Props {
    title?: string;
    description?: string;
    onAddTerm: () => void;
    onAddtermGroup: () => void;
}

function EmptyGlossarySection(props: Props) {
    const { title, description, onAddTerm, onAddtermGroup } = props;

    return (
        <>
            <StyledEmpty
                description={
                    <>
                        <IconContainer>
                            <span style={{ color: (props) => props.theme.styles['text-color'] }}>
                                {props.icon}
                            </span>
                        </IconContainer>
                        <Typography.Title level={4}>
                            <span style={{ color: (props) => props.theme.styles['text-color'] }}>
                                {title}
                            </span>
                        </Typography.Title>
                        <Typography.Paragraph type="secondary">
                            <span style={{ color: (props) => props.theme.styles['text-color-secondary'] }}>
                                {description}
                            </span>
                        </Typography.Paragraph>
                    </>
                }
                image={Empty.PRESENTED_IMAGE_SIMPLE}
            >
                <StyledButton data-testid="add-term-button" onClick={onAddTerm}>
                    <PlusOutlined /> Add Term
                </StyledButton>
                <StyledButton data-testid="add-term-group-button" onClick={onAddtermGroup}>
                    <PlusOutlined /> Add Term Group
                </StyledButton>
            </StyledEmpty>
        </>
    );
}

export default EmptyGlossarySection;
