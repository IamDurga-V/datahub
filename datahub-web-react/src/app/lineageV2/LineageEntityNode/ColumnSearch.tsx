import { Input } from 'antd';
import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

import { onClickPreventSelect } from '@app/lineageV2/common';

const SearchInput = styled(Input)`
    border-radius: 4px;
    border: 0.5px solid ${(props) => props.theme.styles['border-color-base']}; // Change
    background-color: ${(props) => props.theme.styles['component-background']}; // Change
    color: ${(props) => props.theme.styles['text-color']}; // Change
    cursor: text;
    font-size: 10px;
    height: 22px;
    padding: 8px;
    width: 100%;

    :focus,
    :hover {
        border: 0.5px solid ${(props) => props.theme.styles['primary-color']}; // Change
        box-shadow: none;
        outline: none;
    }
`;

interface Props {
    searchText: string;
    setSearchText: Dispatch<SetStateAction<string>>;
}

export default function ColumnSearch({ searchText, setSearchText }: Props) {
    // Add nodrag class to prevent node from being selected on click
    // See https://reactflow.dev/api-reference/types/node-props#notes
    return (
        <SearchInput
            defaultValue={searchText}
            placeholder="Find column"
            onChange={(e) => setSearchText(e.target.value.trim())}
            onClick={onClickPreventSelect}
        />
    );
}
