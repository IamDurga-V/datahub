import styled from 'styled-components';

import { ANTD_GRAY, LINEAGE_COLORS } from '@app/entityV2/shared/constants';

export const ExpandContractButton = styled.div<{ expandOnHover?: boolean }>`
    background-color: ${(props) => props.theme.styles['component-background']}; // Change
    border: 1px solid ${(props) => props.theme.styles['border-color-base']}; // Change
    border-radius: 10px;
    color: ${(props) => props.theme.styles['primary-color']}; // Change
    cursor: pointer;
    display: flex;
    font-size: 18px;
    padding: 3px;
    position: absolute;
    top: 50%;

    max-width: 25px;
    overflow: hidden;
    transition: max-width 0.3s ease-in-out;

    :hover {
        ${(props) => props.expandOnHover && `max-width: 50px;`}
    }
`;

export const UpstreamWrapper = styled(ExpandContractButton)`
    right: calc(100% - 5px);
    transform: translateY(-50%) rotate(180deg);
`;

export const DownstreamWrapper = styled(ExpandContractButton)`
    left: calc(100% - 5px);
    transform: translateY(-50%);
`;

export const Button = styled.span`
    border-radius: 20%;
    line-height: 0;
    color: ${(props) => props.theme.styles['text-color']}; // Change

    :hover {
        background-color: ${(props) => props.theme.styles['highlight-color']}; // Change
    }
`;
