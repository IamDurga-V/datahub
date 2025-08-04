import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { SearchFilterLabel } from '@app/searchV2/SearchFilterLabel';
import { TRUNCATED_FILTER_LENGTH } from '@app/searchV2/utils/constants';

import { FacetFilterInput, FacetMetadata } from '@types';

const GRAPH_DEGREE_FILTER_FIELD = 'degree';

const isGraphDegreeFilter = (field: string) => {
    return GRAPH_DEGREE_FILTER_FIELD === field;
};

type Props = {
    facet: FacetMetadata;
    selectedFilters: Array<FacetFilterInput>;
    onFilterSelect: (selected: boolean, field: string, value: string) => void;
    defaultDisplayFilters: boolean;
};

const SearchFilterWrapper = styled.div`
    padding: 0 25px 15px 25px;
    color: ${(props) => props.theme.styles['text-color']};
`;

const Title = styled.div`
    align-items: center;
    font-weight: bold;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    color: ${(props) => props.theme.styles['text-color']};
`;

const CheckBox = styled(Checkbox)`
    margin: 5px 0;
`;

const ExpandButton = styled(Button)`
    &&& {
        padding: 4px;
        font-size: 12px;
        color: ${(props) => props.theme.styles['text-color-secondary']};
        background-color: transparent;
    }
`;

const StyledUpOutlined = styled(UpOutlined)`
    font-size: 10px;
    color: ${(props) => props.theme.styles['text-color-secondary']};
`;

const StyledDownOutlined = styled(DownOutlined)`
    font-size: 10px;
    color: ${(props) => props.theme.styles['text-color-secondary']};
`;

export const SimpleSearchFilter = ({ facet, selectedFilters, onFilterSelect, defaultDisplayFilters }: Props) => {
    const [areFiltersVisible, setAreFiltersVisible] = useState(defaultDisplayFilters);
    const [expanded, setExpanded] = useState(false);

    const isFacetSelected = (field, value) => {
        return selectedFilters.find((f) => f.field === field && f.values?.includes(value)) !== undefined;
    };

    const filteredAggregations = facet.aggregations.filter(
        (agg) => agg.count > 0 || isFacetSelected(facet.field, agg.value) || isGraphDegreeFilter(facet.field),
    );

    const isFilterSelected = !!filteredAggregations.find((agg) => isFacetSelected(facet.field, agg.value));
    useEffect(() => {
        if (isFilterSelected) {
            setAreFiltersVisible(true);
        }
    }, [isFilterSelected]);

    const shouldTruncate = filteredAggregations.length > TRUNCATED_FILTER_LENGTH;

    return (
        <SearchFilterWrapper key={facet.field}>
            <Title onClick={() => setAreFiltersVisible((prevState) => !prevState)}>
                {facet?.displayName}
                {areFiltersVisible ? (
                    <StyledUpOutlined />
                ) : (
                    <StyledDownOutlined data-testid={`expand-facet-${facet.field}`} />
                )}
            </Title>
            {areFiltersVisible && (
                <>
                    {facet.aggregations
                        .filter(
                            (agg) =>
                                agg.count > 0 ||
                                isFacetSelected(facet.field, agg.value) ||
                                isGraphDegreeFilter(facet.field),
                        )
                        .map((aggregation, i) => {
                            if (i >= TRUNCATED_FILTER_LENGTH && !expanded) {
                                return null;
                            }
                            return (
                                <span key={`${facet.field}-${aggregation.value}`}>
                                    <CheckBox
                                        data-testid={`facet-${facet.field}-${aggregation.value}`}
                                        checked={isFacetSelected(facet.field, aggregation.value)}
                                        onChange={(e: CheckboxChangeEvent) =>
                                            onFilterSelect(e.target.checked, facet.field, aggregation.value)
                                        }
                                    >
                                        <SearchFilterLabel
                                            field={facet.field}
                                            value={aggregation.value}
                                            count={aggregation.count}
                                            entity={aggregation.entity}
                                        />
                                    </CheckBox>
                                    <br />
                                </span>
                            );
                        })}
                    {shouldTruncate && (
                        <ExpandButton type="text" onClick={() => setExpanded(!expanded)}>
                            {expanded ? '- Less' : '+ More'}
                        </ExpandButton>
                    )}
                </>
            )}
        </SearchFilterWrapper>
    );
};
