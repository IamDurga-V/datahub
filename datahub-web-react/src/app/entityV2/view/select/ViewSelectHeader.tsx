import React from 'react';
import styled from 'styled-components';

import { ANTD_GRAY, REDESIGN_COLORS } from '@app/entityV2/shared/constants';
import SearchBar from '@app/entityV2/view/select/components/SearchBar';
import ViewTypeSelect from '@app/entityV2/view/select/components/viewTypeSelect/ViewTypeSelect';
import { colors } from '@src/alchemy-components';
import { useShowNavBarRedesign } from '@src/app/useShowNavBarRedesign';

const ViewHeader = styled.div<{ $isShowNavBarRedesign?: boolean }>`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    .select-container {
        display: flex;
        gap: 1rem;
        align-items: center;
        .select-view-icon {
            color: ${(props) => (props.$isShowNavBarRedesign ? props.theme.styles['text-color'] : props.theme.styles['text-color'])}; // Change
            display: flex;
            gap: 0.5rem;
            background: ${(props) => (props.$isShowNavBarRedesign ? props.theme.styles['component-background'] : props.theme.styles['component-background'])}; // Change
            border-radius: 30px;
            padding: ${(props) => (props.$isShowNavBarRedesign ? '4px' : '2px')};
            > div {
                padding: ${(props) => (props.$isShowNavBarRedesign ? '3px' : '5px 4px')};
                display: flex;
                align-item: center;
                border-radius: 100px;
                cursor: pointer;
                &.active {
                    background: ${(props) => props.theme.styles['primary-color']};
                    color: ${(props) => props.theme.styles['layout-header-color']}; // Change
                }
            }
        }
        .select-view-label {
            font-size: 14px;
            font-weight: 700;
            color: ${(props) => props.theme.styles['text-color']}; // Change
        }
    }
    .search-manage-container {
        display: flex;
        gap: 1rem;
        align-items: center;
        .manage {
            color: ${(props) => (props.$isShowNavBarRedesign ? props.theme.styles['text-color'] : props.theme.styles['primary-color'])}; // Change
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
        }
    }
`;

type Props = {
    privateView: boolean;
    publicView: boolean;
    onClickViewTypeFilter: (type: string) => void;
    onClickManageViews: () => void;
    onChangeSearch: (text: any) => void;
};

export const ViewSelectHeader = ({
    publicView,
    privateView,
    onClickViewTypeFilter,
    onChangeSearch,
    onClickManageViews,
}: Props) => {
    const isShowNavBarRedesign = useShowNavBarRedesign();

    return (
        <ViewHeader $isShowNavBarRedesign={isShowNavBarRedesign}>
            <ViewTypeSelect
                publicViews={publicView}
                privateViews={privateView}
                onTypeSelect={onClickViewTypeFilter}
                showV2={isShowNavBarRedesign}
            />
            <SearchBar onChangeSearch={onChangeSearch} onClickManageViews={onClickManageViews} minWidth="431px" />
        </ViewHeader>
    );
};
