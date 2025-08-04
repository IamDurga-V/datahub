import { Tooltip } from '@components';
import { Col, Pagination, Row, Typography } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { scrollToTop } from '@app/shared/searchUtils';
import { useEntityRegistry } from '@app/useEntityRegistry';

import { useGetUserGroupsLazyQuery } from '@graphql/user.generated';
import { CorpGroup, EntityRelationship, EntityType } from '@types';

const GroupsViewWrapper = styled.div`
    height: calc(100vh - 173px);
    overflow-y: auto;

    .user-group-pagination {
        justify-content: center;
        bottom: 24px;
        position: absolute;
        width: 100%;
        left: 50%;
        -webkit-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        transform: translateX(-50%);
    }
    .ant-pagination-item a,
    .ant-pagination-jump-next .ant-pagination-item-link,
    .ant-pagination-jump-prev .ant-pagination-item-link,
    .ant-pagination-prev .ant-pagination-item-link,
    .ant-pagination-next .ant-pagination-item-link {
        color: ${(props) => props.theme.styles['text-color-secondary']};
    }
`;

const GroupItemColumn = styled(Col)`
    padding: 10px;
`;

const GroupItem = styled.div`
    border: 1px solid ${(props) => props.theme.styles['border-color-base']}; // Change
    background-color: ${(props) => props.theme.styles['component-background']}; // Change
    padding: 10px;
    min-height: 107px;
    max-height: 107px;
    border-radius: 5px;
    
    .title-row {
        padding: 9px 11px 9px 11px;
    }
    .description-row {
        padding: 2px 13px;
    }
    overflow: hidden;
`;

const GroupTitle = styled.span`
    font-size: 14px;
    line-height: 22px;
    font-weight: bold;
    color: ${(props) => props.theme.styles['text-color']}; // Change
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const GroupMember = styled.span`
    font-weight: 500;
    font-size: 12px;
    line-height: 23px;
    color: ${(props) => props.theme.styles['text-color-secondary']}; // Change
    padding-left: 7px;
`;

const GroupDescription = styled(Typography.Text)`
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    color: ${(props) => props.theme.styles['text-color-secondary']}; // Change
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
`;

export default function UserGroups({ urn, initialRelationships, pageSize }: Props) {
    const [page, setPage] = useState(1);
    const entityRegistry = useEntityRegistry();

    const [getGroups, { data: groupsData }] = useGetUserGroupsLazyQuery();

    const onChangeGroupsPage = (newPage: number) => {
        scrollToTop();
        setPage(newPage);
        const start = (newPage - 1) * pageSize;
        getGroups({ variables: { urn, start, count: pageSize } });
    };

    const relationships = groupsData ? groupsData.corpUser?.relationships?.relationships : initialRelationships;
    const total = relationships?.length || 0;
    const userGroups = relationships?.map((rel) => rel.entity as CorpGroup) || [];

    return (
        <GroupsViewWrapper>
            <Row justify="start">
                {userGroups &&
                    userGroups.map((item) => {
                        return (
                            <GroupItemColumn xl={8} lg={8} md={12} sm={12} xs={24} key={item.urn}>
                                <Link to={entityRegistry.getEntityUrl(EntityType.CorpGroup, item.urn)}>
                                    <GroupItem>
                                        <Row className="title-row">
                                            <GroupTitle>{item.info?.displayName || item.name}</GroupTitle>
                                            <GroupMember>
                                                {item.relationships?.total}
                                                {item.relationships?.total === 1 ? ' member' : ' members'}
                                            </GroupMember>
                                        </Row>
                                        <Row className="description-row">
                                            <GroupDescription ellipsis={{ tooltip: item.info?.description }}>
                                                {item.info?.description}
                                            </GroupDescription>
                                        </Row>
                                    </GroupItem>
                                </Link>
                            </GroupItemColumn>
                        );
                    })}
            </Row>
            <Row className="user-group-pagination">
                <Pagination
                    current={page}
                    pageSize={pageSize}
                    total={total}
                    showLessItems
                    onChange={onChangeGroupsPage}
                    showSizeChanger={false}
                />
            </Row>
        </GroupsViewWrapper>
    );
}
