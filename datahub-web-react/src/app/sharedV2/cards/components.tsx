import styled from 'styled-components';

import { ANTD_GRAY, ANTD_GRAY_V2, REDESIGN_COLORS } from '@app/entity/shared/constants';

export const Card = styled.div`
    background-color: ${(props) => props.theme.styles['component-background']};
    border: 2px solid ${(props) => props.theme.styles['border-color-base']};
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;

    :hover {
        border: 2px solid ${(props) => props.theme.styles['primary-color-dark']};
        cursor: pointer;
    }
`;
