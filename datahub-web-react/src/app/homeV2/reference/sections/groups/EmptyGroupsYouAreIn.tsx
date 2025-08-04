import React from 'react';
import styled from 'styled-components';

import { ANTD_GRAY } from '@app/entity/shared/constants';

const Text = styled.div`
    font-size: 14px;
    color: ${(props) => props.theme.styles['text-color-secondary']};
`;

export const EmptyGroupsYouAreIn = () => {
    return <Text>You are not part of any groups yet.</Text>;
};
