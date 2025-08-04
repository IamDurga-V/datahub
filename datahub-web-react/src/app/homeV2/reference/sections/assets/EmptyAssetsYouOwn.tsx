import React from 'react';
import styled from 'styled-components';

import { ANTD_GRAY } from '@app/entity/shared/constants';

const Text = styled.div`
    font-size: 14px;
    color: ${(props) => props.theme.styles['text-color-secondary']};
`;

export const EmptyAssetsYouOwn = () => {
    return (
        <Text>
            You do not own any assets yet.
            <br />
            <a target="_blank" rel="noreferrer noopener" href="https://docs.datahub.com/docs/ownership/ownership-types">
                Learn more
            </a>{' '}
            about ownership.
        </Text>
    );
};
