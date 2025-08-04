import { Tooltip } from '@components';
import CloseIcon from '@mui/icons-material/Close';
import { FadersHorizontal } from '@phosphor-icons/react';
import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { ANTD_GRAY, REDESIGN_COLORS } from '@app/entityV2/shared/constants';
import { ViewLabel } from '@app/entityV2/view/select/styledComponents';
import { colors } from '@src/alchemy-components';

const SelectButton = styled(Button)<{ $selectedViewName: string; $isShowNavBarRedesign?: boolean }>`
    background-color: ${(props) => {
        if (props.$isShowNavBarRedesign) {
            return props.$selectedViewName ? props.theme.styles['background-color-light'] : 'transparent'; // Change
        }
        return props.$selectedViewName ? props.theme.styles['primary-color'] : 'transparent';
    }};
    border-color: ${(props) => {
        if (props.$isShowNavBarRedesign) {
            return props.$selectedViewName ? 'transparent' : props.theme.styles['border-color-base']; // Change
        }
        return props.$selectedViewName ? props.theme.styles['primary-color'] : 'transparent';
    }};
    color: ${(props) => (props.$isShowNavBarRedesign ? props.theme.styles['primary-color'] : props.theme.styles['text-color'])}; // Change
    max-width: ${(props) => (props.$isShowNavBarRedesign ? '120px' : '150px')};

    ${(props) =>
        props.$isShowNavBarRedesign &&
        `
        height: 28px;
        padding: 3px 8px;
        display: flex;
        box-shadow: none;
        line-height: 20px;

        & svg {
            color: ${(props) => props.theme.styles['text-color-secondary']}; // Change
            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
    `}

    &: hover {
        background: ${(props) => {
            if (props.$isShowNavBarRedesign) {
                return props.$selectedViewName ? props.theme.styles['background-color-light'] : 'transparent'; // Change
            }
            return props.theme.styles['primary-color'];
        }};
        color: ${(props) => (props.$isShowNavBarRedesign ? props.theme.styles['primary-color'] : props.theme.styles['text-color'])}; // Change

        border-color: ${(props) => {
            if (props.$isShowNavBarRedesign) return props.theme.styles['primary-color'];
            return props.$selectedViewName ? props.theme.styles['primary-color'] : 'transparent';
        }};
    }

    &: focus {
        background-color: ${(props) => (props.$selectedViewName ? props.theme.styles['primary-color'] : 'transparent')};
        color: ${(props) => (props.$isShowNavBarRedesign ? props.theme.styles['primary-color'] : props.theme.styles['text-color'])}; // Change
        border-color: ${(props) => (props.$selectedViewName ? props.theme.styles['primary-color'] : 'transparent')};

        ${(props) =>
            props.$isShowNavBarRedesign &&
            `
            background-color: ${props.theme.styles['background-color-light']}; // Change

            & svg {
                color: ${props.theme.styles['text-color-secondary']}; // Change
            }
        `}
    }
`;

const SelectButtonContainer = styled.div`
    position: relative;

    &&&& .close-container {
        display: none;
    }

    &:hover,
    &:focus {
        &&&& .close-container {
            display: flex;
        }
    }
`;

const CloseButtonContainer = styled.div`
    position: absolute;
    top: -10px;
    right: -5px;
    background-color: ${(props) => props.theme.styles['component-background']}; // Change
    display: flex;
    align-items: center;
    border-radius: 100%;
    padding: 5px;
`;

const CloseIconStyle = styled(CloseIcon)`
    font-size: 10px !important;
    color: ${(props) => props.theme.styles['primary-color']};
`;

const StyledViewIcon = styled(FadersHorizontal)<{ $isShowNavBarRedesign?: boolean }>`
    font-size: ${(props) => (props.$isShowNavBarRedesign ? '20px' : '18px')} !important;
    color: ${(props) => props.theme.styles['text-color']}; // Change
`;

type Props = {
    selectedViewName: string;
    isShowNavBarRedesign?: boolean;
    onClear: () => void;
    onClick?: () => void;
};

export const renderSelectedView = ({ selectedViewName, isShowNavBarRedesign, onClear, onClick }: Props) => {
    return (
        <SelectButtonContainer>
            <SelectButton
                $selectedViewName={selectedViewName}
                $isShowNavBarRedesign={isShowNavBarRedesign}
                onClick={() => onClick?.()}
            >
                <Tooltip showArrow={false} title={selectedViewName} placement="bottom">
                    <ViewLabel data-testid="views-icon">
                        {selectedViewName || <StyledViewIcon $isShowNavBarRedesign={isShowNavBarRedesign} />}
                    </ViewLabel>
                </Tooltip>
            </SelectButton>
            {selectedViewName && (
                <CloseButtonContainer
                    className="close-container"
                    onClick={(e) => {
                        e.stopPropagation();
                        onClear();
                    }}
                >
                    <CloseIconStyle />
                </CloseButtonContainer>
            )}
        </SelectButtonContainer>
    );
};
