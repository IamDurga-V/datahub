import { InputRef } from 'antd';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import ViewSelectButton from '@app/entityV2/view/select/ViewSelectButton';
import ViewSelectButtonWithPopover from '@app/entityV2/view/select/ViewSelectButtonWithPopover';
import { V2_SEARCH_BAR_VIEWS } from '@app/onboarding/configV2/HomePageOnboardingConfig';
import { CommandK } from '@app/searchV2/CommandK';
import { BOX_SHADOW } from '@app/searchV2/searchBarV2/constants';
import { Icon, SearchBar, radius, transition } from '@src/alchemy-components';
import { useShowNavBarRedesign } from '@src/app/useShowNavBarRedesign';

const StyledSearchBar = styled(SearchBar)<{ $isShowNavBarRedesign?: boolean }>`
    border-width: 2px !important;

    ${(props) =>
        !props.$isShowNavBarRedesign &&
        `
        background: ${props.theme.styles['layout-header-color']};
        border-color: ${props.theme.styles['layout-header-color']};

        &:hover,
        &:focus,
        &:focus-within {
            border-color: ${props.theme.styles['primary-color']} !important;
        }

        .ant-input, .ant-input-clear-icon {
            color: ${props.theme.styles['text-color']};
            background: ${props.theme.styles['layout-header-color']};
        }
    `}
`;

const ViewSelectContainer = styled.div``;

export const Wrapper = styled.div<{ $open?: boolean; $isShowNavBarRedesign?: boolean }>`
    background: transparent;
    width: 100%;
    min-width: 500px;

    ${(props) =>
        props.$isShowNavBarRedesign &&
        `
        padding: ${radius.md};
        transition: all ${transition.easing['ease-in']} ${transition.duration.slow};
        border-radius: ${radius.lg} ${radius.lg} ${radius.none} ${radius.none};
    `}

    ${(props) =>
        props.$open &&
        props.$isShowNavBarRedesign &&
        `
        background: ${props.theme.styles['layout-body-background']};
        box-shadow: ${BOX_SHADOW};
    `}
`;

const SuffixWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
    padding: 4px 0;
    line-height: 20px;
`;

interface Props {
    value: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSearch?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onViewsClick?: () => void;
    onClear?: () => void;
    isDropdownOpened?: boolean;
    placeholder?: string;
    showCommandK?: boolean;
    viewsEnabled?: boolean;
    viewsWithPopover?: boolean;
    isViewsSelectOpened?: boolean;
    setIsViewsSelectOpened?: (value: boolean) => void;
    width?: string;
}

const SearchBarInput = forwardRef<InputRef, Props>(
    (
        {
            value,
            onChange,
            onSearch,
            onFocus,
            onBlur,
            onViewsClick,
            onClear,
            isDropdownOpened,
            placeholder,
            showCommandK,
            viewsEnabled,
            viewsWithPopover,
            width,
            isViewsSelectOpened,
            setIsViewsSelectOpened,
        },
        ref,
    ) => {
        const [isFocused, setIsFocused] = useState<boolean>(false);
        const isShowNavBarRedesign = useShowNavBarRedesign();

        const onFocusHandler = useCallback(() => {
            setIsFocused(true);
            onFocus?.();
        }, [onFocus]);

        const onBlurHandler = useCallback(() => {
            setIsFocused(false);
            onBlur?.();
        }, [onBlur]);

        const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
            if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
                e.preventDefault();
            }
        }, []);

        const onViewSelectContainerClickHandler = (event: React.MouseEvent) => {
            event.stopPropagation();
        };

        const onViewsClickHandler = (isOpen: boolean) => {
            setIsViewsSelectOpened?.(isOpen);
            onViewsClick?.();
        };

        useEffect(() => {
            if (isDropdownOpened) setIsViewsSelectOpened?.(false);
        }, [isDropdownOpened, setIsViewsSelectOpened]);

        return (
            <Wrapper $open={isDropdownOpened} $isShowNavBarRedesign={isShowNavBarRedesign}>
                <StyledSearchBar
                    placeholder={placeholder}
                    onPressEnter={onSearch}
                    onKeyDown={onKeyDown}
                    value={value}
                    onChange={(_, event) => onChange?.(event)}
                    data-testid="search-input"
                    onFocus={onFocusHandler}
                    onBlur={onBlurHandler}
                    allowClear={isDropdownOpened || isFocused}
                    clearIcon={<Icon onClick={onClear} icon="XCircle" source="phosphor" size="2xl" />}
                    ref={ref}
                    suffix={
                        <SuffixWrapper>
                            {(showCommandK && !isDropdownOpened && !isFocused && <CommandK />) || null}
                            {viewsEnabled && (
                                <ViewSelectContainer
                                    onClick={onViewSelectContainerClickHandler}
                                    id={V2_SEARCH_BAR_VIEWS}
                                >
                                    {viewsWithPopover ? (
                                        <ViewSelectButtonWithPopover
                                            isOpen={isViewsSelectOpened}
                                            onOpenChange={onViewsClickHandler}
                                        />
                                    ) : (
                                        <ViewSelectButton />
                                    )}
                                </ViewSelectContainer>
                            )}
                        </SuffixWrapper>
                    }
                    width={width ?? (isShowNavBarRedesign ? '664px' : '620px')}
                    height="44px"
                    $isShowNavBarRedesign={isShowNavBarRedesign}
                />
            </Wrapper>
        );
    },
);

export default SearchBarInput;
