import styled from 'styled-components';

import { ANTD_GRAY, REDESIGN_COLORS } from '@app/entityV2/shared/constants';

export const ControlPanel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    background: ${(props) => props.theme.styles['component-background']}; // Change
    border-radius: 8px;
    border: 1px solid ${(props) => props.theme.styles['border-color-base']}; // Change
    box-shadow: 0 4px 4px 0 ${(props) => props.theme.styles['box-shadow']}; // Change
    padding: 16px;
    gap: 2px;

    height: fit-content;
    max-width: 255px;
    overflow: hidden;
`;

export const ControlPanelTitle = styled.div`
    font-size: 14px;
    font-weight: 700;
    color: ${(props) => props.theme.styles['text-color']}; // Change
`;

export const ControlPanelSubtext = styled.div`
    color: ${(props) => props.theme.styles['text-color-secondary']}; // Change
    font-size: 10px;
    font-weight: 500;
    margin-bottom: 8px;
`;
