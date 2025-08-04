import { RocketOutlined } from '@ant-design/icons';
import { Button as AntButton } from 'antd';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import analytics, { EventType } from '@app/analytics';
import { useUserContext } from '@app/context/useUserContext';
import { SuggestedText } from '@app/searchV2/suggestions/SearchQuerySugggester';
import useGetSearchQueryInputs from '@app/searchV2/useGetSearchQueryInputs';
import { navigateToSearchUrl } from '@app/searchV2/utils/navigateToSearchUrl';

import { FacetFilterInput, SearchSuggestion } from '@types';

const NoDataContainer = styled.div`
    margin: 40px auto;
    font-size: 16px;
    color: ${(props) => props.theme.styles['text-color-secondary']};
    text-align: center;
    background-color: ${(props) => props.theme.styles['component-background']};
`;

const Section = styled.div`
    margin-bottom: 16px;
    color: ${(props) => props.theme.styles['text-color']};
`;

const StyledButton = styled(AntButton)`
    && {
        margin-top: 16px;
        background-color: ${(props) => props.theme.styles['component-background']};
        color: ${(props) => props.theme.styles['text-color']};
        border-color: ${(props) => props.theme.styles['border-color-base']};

        &:hover {
            color: ${(props) => props.theme.styles['primary-color']};
            border-color: ${(props) => props.theme.styles['primary-color']};
        }
    }
`;

function getRefineSearchText(filters: FacetFilterInput[], viewUrn?: string | null) {
    if (filters.length && viewUrn) return 'clearing all filters and selected view';
    if (filters.length) return 'clearing all filters';
    if (viewUrn) return 'clearing the selected view';
    return '';
}

interface Props {
    suggestions: SearchSuggestion[];
}

export default function EmptySearchResults({ suggestions }: Props) {
    const { query, filters, viewUrn } = useGetSearchQueryInputs();
    const history = useHistory();
    const userContext = useUserContext();
    const suggestText = suggestions.length > 0 ? suggestions[0].text : '';
    const refineSearchText = getRefineSearchText(filters, viewUrn);

    const onClickExploreAll = useCallback(() => {
        analytics.event({ type: EventType.SearchResultsExploreAllClickEvent });
        navigateToSearchUrl({ query: '*', history });
    }, [history]);

    const searchForSuggestion = () => {
        navigateToSearchUrl({ query: suggestText, history });
    };

    const clearFiltersAndView = () => {
        navigateToSearchUrl({ query, history });
        userContext.updateLocalState({
            ...userContext.localState,
            selectedViewUrn: undefined,
        });
    };

    return (
        <NoDataContainer>
            <Section>No results found for &quot;{query}&quot;</Section>
            {refineSearchText && (
                <>
                    Try <SuggestedText onClick={clearFiltersAndView}>{refineSearchText}</SuggestedText>{' '}
                    {suggestText && (
                        <>
                            or searching for{' '}
                            <SuggestedText onClick={searchForSuggestion}>{suggestText}</SuggestedText>
                        </>
                    )}
                </>
            )}
            {!refineSearchText && suggestText && (
                <>
                    Did you mean{' '}
                    <SuggestedText onClick={searchForSuggestion}>{suggestText}</SuggestedText>
                </>
            )}
            {!refineSearchText && !suggestText && (
                <StyledButton onClick={onClickExploreAll}>
                    <RocketOutlined /> Explore all
                </StyledButton>
            )}
        </NoDataContainer>
    );
}
