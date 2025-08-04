import React from 'react';
import styled from 'styled-components';

import { ANTD_GRAY } from '@app/entity/shared/constants';

const Text = styled.div`
    font-size: 14px;
    color: ${(props) => props.theme.styles['text-color-secondary']};
`;

export const EmptyGlossaryNodesYouOwn = () => {
    return (
        <Text>
            You have not created any glossary terms or groups yet. <br />
            <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://docs.datahub.com/docs/glossary/business-glossary/"
            >
                Learn more
            </a>{' '}
            about glossary items.
        </Text>
    );
};
