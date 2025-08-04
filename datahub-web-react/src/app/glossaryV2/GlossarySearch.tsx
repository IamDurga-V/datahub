import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { SearchBar } from '@components';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDebounce } from 'react-use';
import styled from 'styled-components/macro';

import DomainSearchResultItem from '@app/domainV2/DomainSearchResultItem';
import { REDESIGN_COLORS } from '@app/entityV2/shared/constants';
import ClickOutside from '@app/shared/ClickOutside';
import { useEntityRegistry } from '@app/useEntityRegistry';

import { useGetAutoCompleteMultipleResultsQuery } from '@graphql/search.generated';
import { EntityType } from '@types';

const GlossarySearchWrapper = styled.div`
    position: relative;
    border-bottom: 1px solid ${(props) => props.theme.styles['border-color-base']};
`;

const ResultsWrapper = styled.div`
    background-color: ${(props) => props.theme.styles['component-background']};
    border-radius: 5px;
    box-shadow: ${(props) => props.theme.styles['box-shadow-navbar-redesign']};
    padding: 8px;
    position: absolute;
    max-height: 210px;
    overflow: auto;
    width: calc(100% - 24px);
    left: 12px;
    top: 45px;
    z-index: 1;
    border: 1px solid ${(props) => props.theme.styles['border-color-base']};
`;

const LoadingWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 4px 0;
    font-size: 16px;
    color: ${(props) => props.theme.styles['text-color']};
`;

const SearchResult = styled(Link)`
    color: ${(props) => props.theme.styles['text-color']};
    display: inline-block;
    height: 100%;
    padding: 6px 8px;
    width: 100%;

    &:hover {
        background-color: ${(props) => props.theme.styles['highlight-color']};
        color: ${(props) => props.theme.styles['text-color']};
    }
`;

const InputWrapper = styled.div`
    padding: 12px;
`;

const IconWrapper = styled.span`
    margin-right: 8px;
`;

function GlossarySearch() {
    const [searchInput, setSearchInput] = useState('');
    const [query, setQuery] = useState('');
    const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
    const entityRegistry = useEntityRegistry();

    useDebounce(() => setQuery(searchInput), 200, [searchInput]);
    const { data, loading } = useGetAutoCompleteMultipleResultsQuery({
        variables: {
            input: {
                types: [EntityType.GlossaryTerm, EntityType.GlossaryNode],
                query,
                limit: 50,
            },
        },
        skip: !query,
    });

    const searchResults = data?.autoCompleteForMultiple?.suggestions?.flatMap((suggestion) => suggestion.entities);

    return (
        <GlossarySearchWrapper>
            <ClickOutside onClickOutside={() => setIsSearchBarFocused(false)}>
                <InputWrapper>
                    <SearchBar
                        placeholder="Search"
                        value={searchInput}
                        onChange={setSearchInput}
                        onFocus={() => setIsSearchBarFocused(true)}
                        style={{ backgroundColor: (props) => props.theme.styles['component-background'], color: (props) => props.theme.styles['text-color']}}
                    />
                </InputWrapper>
                {isSearchBarFocused && (loading || !!searchResults?.length) && (
                    <ResultsWrapper>
                        {loading && (
                            <LoadingWrapper>
                                <LoadingOutlined style={{ color: (props) => props.theme.styles['text-color'] }} />
                            </LoadingWrapper>
                        )}
                        {!loading &&
                            searchResults?.map((result) => {
                                return (
                                    <SearchResult
                                        to={`${entityRegistry.getEntityUrl(result.type, result.urn)}`}
                                        onClick={() => setIsSearchBarFocused(false)}
                                    >
                                        <IconWrapper>
                                            {entityRegistry.getIcon(result.type, 12, IconStyleType.ACCENT)}
                                        </IconWrapper>
                                        {entityRegistry.getDisplayName(result.type, result)}
                                    </SearchResult>
                                );
                            })}
                    </ResultsWrapper>
                )}
            </ClickOutside>
        </GlossarySearchWrapper>
    );
}

export default GlossarySearch;
