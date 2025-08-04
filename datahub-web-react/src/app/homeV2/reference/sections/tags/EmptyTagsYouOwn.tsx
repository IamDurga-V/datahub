import React from 'react';
import styled from 'styled-components';

import { ANTD_GRAY } from '@app/entity/shared/constants';

const Text = styled.div`
    font-size: 14px;
    color: ${(props) => props.theme.styles['text-color-secondary']};
`;

export const EmptyTagsYouOwn = () => {
    return (
        <Text>
            You have not created any tags yet.
            <br />
            <a target="_blank" rel="noreferrer noopener" href="https://docs.datahub.com/docs/tags">
                Learn more
            </a>{' '}
            about tags.
        </Text>
    );
};
