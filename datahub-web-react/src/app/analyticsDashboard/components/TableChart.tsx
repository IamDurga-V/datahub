import { Button, Table } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import { navigateToSearchUrl } from '@app/search/utils/navigateToSearchUrl';
import { useEntityRegistry } from '@app/useEntityRegistry';

import { Cell, EntityType, FacetFilterInput, TableChart as TableChartType } from '@types';

type Props = {
    chartData: TableChartType;
};

type TableCellProps = {
    cell: Cell;
};

const StyledTable = styled(Table)`
    padding-top: 16px;
    width: 100%;
    .ant-table-container {
        border: 1px solid ${(props) => props.theme.styles['border-color-base']};
        background-color: ${(props) => props.theme.styles['component-background']};
        color: ${(props) => props.theme.styles['text-color']};
        border-radius: 8px;
    }
    .ant-table-thead > tr > th {
        background-color: ${(props) => props.theme.styles['component-background']};
        border-color: ${(props) => props.theme.styles['border-color-base']};
        color: ${(props) => props.theme.styles['text-color']};
    }
    .ant-table-tbody > tr > td {
        background-color: ${(props) => props.theme.styles['component-background']};
        border-color: ${(props) => props.theme.styles['border-color-base']};
        color: ${(props) => props.theme.styles['text-color']};
    }
`;

const TableLink = styled(Button)`
    &&& {
        padding: 0px;
        font-weight: 400;
        margin-top: -6px;
        margin-bottom: -6px;
        color: ${(props) => props.theme.styles['link-color']};
    }
`;

const TableCell = ({ cell }: TableCellProps) => {
    const history = useHistory();
    const entityRegistry = useEntityRegistry();
    const onClickQuery = (query: string, types: Array<EntityType>, filters: Array<FacetFilterInput>) => {
        navigateToSearchUrl({
            query,
            type: (types && types.length > 0 && types[0]) || undefined,
            filters: filters || [],
            history,
        });
    };

    if (cell.linkParams?.searchParams) {
        return (
            <TableLink
                type="link"
                onClick={() =>
                    onClickQuery(
                        cell.linkParams?.searchParams?.query || '',
                        cell.linkParams?.searchParams?.types || [],
                        cell.linkParams?.searchParams?.filters || [],
                    )
                }
            >
                {cell.value}
            </TableLink>
        );
    }
    if (cell.linkParams?.entityProfileParams) {
        return (
            <TableLink
                type="link"
                href={entityRegistry.getEntityUrl(
                    cell.linkParams?.entityProfileParams?.type,
                    cell.linkParams?.entityProfileParams?.urn,
                )}
            >
                {cell.value}
            </TableLink>
        );
    }
    return <span>{cell.value}</span>;
};

export const TableChart = ({ chartData }: Props) => {
    const columns = chartData.columns.map((column) => ({
        title: column,
        key: column,
        dataIndex: column,
        render: (cell) => <TableCell cell={cell} />,
    }));
    const tableData = chartData.rows.map(
        (row) => row.cells?.reduce((acc, cell, i) => ({ ...acc, [chartData.columns[i]]: cell }), {}) || {},
    );
    return <StyledTable columns={columns} dataSource={tableData} pagination={false} size="small" />;
};
