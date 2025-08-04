import { Tooltip } from '@components';
import React from 'react';
import styled from 'styled-components';

import { pluralize } from '@app/shared/textUtil';

type Props = {
    icon: any;
    count: number;
    label: string;
    onClick?: (e: React.MouseEvent) => void;
    enabled?: boolean;
    countLabel: string;
    active?: boolean;
    highlightedText?: string;
};

// Change `computeColor` to use theme properties
const computeColor = (enabled?: boolean, active?: boolean, theme?: any) => {
    let color = theme.styles['disabled-color']; // Line 14: Replaced '#b0a2c2'
    if (enabled) {
        if (active) {
            color = theme.styles['text-color']; // Line 17: Replaced 'white'
        } else {
            color = theme.styles['text-color-secondary']; // Line 19: Replaced '#81879F'
        }
    }
    return color;
};

export const PillContainer = styled.div<{ enabled?: boolean; active?: boolean; isHighlightedTextPresent: boolean }>`
    height: 24px;
    padding-left: 8px;
    padding-right: ${({ isHighlightedTextPresent }) => (isHighlightedTextPresent ? '0px' : '8px')};
    background-color: ${({ active, theme }) => (active ? `${theme.styles['primary-color']}` : `${theme.styles['component-background']}`)}; // Line 29: Replaced '#f7f7f7'
    cursor: pointer;
    border-radius: 20px;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 6px;
    color: ${(props) => computeColor(props.enabled, props.active, props.theme)}; // Line 36: Added 'props.theme' argument
    font-size: 10px;
    font-weight: 400;

    & svg {
        font-size: 12px;
        color: ${(props) => computeColor(props.enabled, props.active, props.theme)}; // Line 41: Added 'props.theme' argument
        fill: ${(props) => computeColor(props.enabled, props.active, props.theme)}; // Line 42: Added 'props.theme' argument
    }

    :hover {
        color: ${({ enabled, theme }) => (enabled ? `${theme.styles['text-color']}` : `${theme.styles['disabled-color']}`)}; // Line 46: Replaced 'white' and '#b0a2c2'
        background-color: ${({ enabled, theme }) => (enabled ? `${theme.styles['primary-color']}` : `${theme.styles['component-background']}`)}; // Line 47: Replaced '#f7f7f7'

        svg {
            color: ${({ enabled, theme }) => (enabled ? `${theme.styles['text-color']}` : `${theme.styles['disabled-color']}`)}; // Line 50: Replaced 'white' and '#b0a2c2'
            fill: ${({ enabled, theme }) => (enabled ? `${theme.styles['text-color']}` : `${theme.styles['disabled-color']}`)}; // Line 51: Replaced 'white' and '#b0a2c2'
        }

        >div: last-child {
            color: white;
            background-color: rgba(255, 255, 255, 0.2);
        }
    }
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

const CountContainer = styled.div<{ active?: boolean }>`
    background-color: ${({ active, theme }) => (active ? 'rgba(255, 255, 255, 0.2)' : `${theme.styles['background-color-light']}`)}; // Line 68: Replaced '#eee'
    border-radius: 20px;
    height: 24px;
    min-width: 35px;
    padding: 4px 8px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const HighlightedText = styled.div`
    max-width: 100px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

// pluralize

const SearchPill = ({ icon, onClick, enabled, label, count, countLabel, active, highlightedText }: Props) => {
    const isHighlightedTextPresent = !!highlightedText;
    return (
        <Tooltip
            title={`${count} ${pluralize(count, countLabel, countLabel === 'match' ? 'es' : 's')}`}
            showArrow={false}
        >
            <PillContainer
                active={active}
                enabled={enabled}
                onClick={onClick}
                isHighlightedTextPresent={isHighlightedTextPresent}
            >
                {isHighlightedTextPresent ? (
                    <>
                        <Container>
                            {icon} {label}
                            <HighlightedText>{highlightedText}</HighlightedText>
                        </Container>
                        <CountContainer active={active}>{count}</CountContainer>
                    </>
                ) : (
                    <>
                        {icon} {label} {count}
                    </>
                )}
            </PillContainer>
        </Tooltip>
    );
};

export default SearchPill;