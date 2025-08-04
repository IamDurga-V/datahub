import { Typography } from 'antd';
import styled from 'styled-components';

import colors from '@src/alchemy-components/theme/foundations/colors';

export const SectionBase = styled.div`
    padding: 16px 30px 0;
`;

export const SectionHeader = styled(Typography.Title)`
    &&&& {
        padding: 0px;
        margin: 0px;
        margin-bottom: 12px;
    }
`;

export const DetailsContainer = styled.div`
    margin-top: 12px;

    pre {
        background-color: ${(props) => props.theme.styles['component-background']};
        color: ${(props) => props.theme.styles['text-primary']};
        border: 1px solid ${(props) => props.theme.styles['border-color-base']};
        border-radius: 8px;
        padding: 16px;
        margin: 0;
        color: ${colors.gray[1700]};
        overflow-y: auto;
    }
`;

export const ScrollableDetailsContainer = styled(DetailsContainer)`
    pre {
        max-height: 300px;
    }
`;
