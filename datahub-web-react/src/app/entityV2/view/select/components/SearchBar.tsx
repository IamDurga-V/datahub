import { SearchOutlined } from '@ant-design/icons';
import { colors } from '@components';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { Input } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { ANTD_GRAY, REDESIGN_COLORS } from '@app/entityV2/shared/constants';
import { useShowNavBarRedesign } from '@app/useShowNavBarRedesign';

const StyledInput = styled(Input)<{ $isShowNavBarRedesign?: boolean; $minWidth?: string; $fullWidth?: boolean }>`
    ${(props) => !props.$isShowNavBarRedesign && 'max-width: 330px;'}
    background-color: ${(props) =>
        props.$isShowNavBarRedesign ? props.theme.styles['component-background'] : props.theme.styles['background-color-light']}; // Change
    border-radius: ${(props) => (props.$isShowNavBarRedesign ? '8px' : '7px')};

    ${(props) => !props.$isShowNavBarRedesign && 'border: unset;'}

    ${(props) => props.$isShowNavBarRedesign && props.$minWidth && `min-width: ${props.$minWidth};`}
    ${(props) =>
        props.$isShowNavBarRedesign &&
        `
        ${props.$fullWidth && 'width: 100%;'}
        height: 40px;
        border: 1px solid;
        border-color: ${props.theme.styles['border-color-base']}; // Change
        box-shadow: 0px 1px 2px 0px rgba(33, 23, 95, 0.07);

        &&:hover {
            border-color: ${props.theme.styles['primary-color']};
        }

        &.ant-input-affix-wrapper-focused {
            border-color: ${props.theme.styles['primary-color']};
        }
        
        & .ant-input::placeholder {
            color: ${props.theme.styles['text-color-secondary']}; // Change
        }

        & .ant-input-prefix {
            margin-right: 8px;
            svg {
                color: ${props.theme.styles['text-color-secondary']}; // Change
            }
        }
    `}

    & .ant-input {
        background-color: transparent;
        ${(props) => !props.$isShowNavBarRedesign && `color: ${props.theme.styles['text-color']};`} // Change
        ${(props) => props.$isShowNavBarRedesign && `color: ${props.theme.styles['text-color']};`} // Change
        ${(props) => props.$isShowNavBarRedesign && 'font-size: 14px;'}
    }
`;

const SearchOutlinedStyle = styled(SearchOutlined)`
    color: ${(props) => props.theme.styles['text-color-secondary']}; // Change
`;

const Wrapper = styled.div<{ $isShowNavBarRedesign?: boolean; $fullWidth?: boolean }>`
    ${(props) => props.$fullWidth && 'width: 100%;'}
    .search-manage-container {
        ${(props) => props.$fullWidth && 'width: 100%;'}
        display: flex;
        gap: 1rem;
        align-items: center;
        .manage {
            color: ${(props) => (props.$isShowNavBarRedesign ? props.theme.styles['text-color'] : props.theme.styles['primary-color'])}; // Change
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
            white-space: nowrap;
        }
    }
`;

interface Props {
    onClickManageViews: () => void;
    onChangeSearch: (text: any) => void;
    minWidth?: string;
    fullWidth?: boolean;
}

export default function SearchBar({ onClickManageViews, onChangeSearch, minWidth, fullWidth }: Props) {
    const isShowNavBarRedesign = useShowNavBarRedesign();

    return (
        <Wrapper $fullWidth={fullWidth} $isShowNavBarRedesign={isShowNavBarRedesign}>
            <div className="search-manage-container">
                <StyledInput
                    className="style-input-container"
                    placeholder={isShowNavBarRedesign ? 'Search views...' : 'Search'}
                    onChange={onChangeSearch}
                    allowClear
                    prefix={isShowNavBarRedesign ? <MagnifyingGlass size={20} /> : <SearchOutlinedStyle />}
                    data-testid="search-overlay-input"
                    $isShowNavBarRedesign={isShowNavBarRedesign}
                    $fullWidth={fullWidth}
                    $minWidth={minWidth}
                />
                <div className="manage" onClick={() => onClickManageViews()} role="none">
                    Manage all
                </div>
            </div>
        </Wrapper>
    );
}
