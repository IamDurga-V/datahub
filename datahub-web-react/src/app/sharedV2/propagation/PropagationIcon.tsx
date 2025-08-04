import { ThunderboltFilled } from '@ant-design/icons';
import styled from 'styled-components';

import { REDESIGN_COLORS } from '@app/entityV2/shared/constants';

export const PropagateThunderbolt = styled(ThunderboltFilled)<{ fontSize?: number }>`
    && {
        color: ${(props) => props.theme.styles['primary-color-light']};
    }
    font-size: ${(props) => props.fontSize || 16}px;
    &:hover {
        color: ${(props) => props.theme.styles['primary-color']};
    }
    margin-right: 4px;
`;

export const PropagateThunderboltFilled = styled(ThunderboltFilled)<{ fontSize?: number }>`
    && {
        color: ${(props) => props.theme.styles['primary-color']};
    }
    font-size: ${(props) => props.fontSize || 16}px;
    margin-right: 4px;
`;
