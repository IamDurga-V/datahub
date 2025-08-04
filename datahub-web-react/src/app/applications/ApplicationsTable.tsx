import { NetworkStatus } from '@apollo/client';
import { Table } from '@components';
import { message } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';

import {
    ApplicationActionsColumn,
    ApplicationDescriptionColumn,
    ApplicationNameColumn,
    ApplicationOwnersColumn,
} from '@app/applications/ApplicationsTableColumns';
import { ConfirmationModal } from '@app/sharedV2/modals/ConfirmationModal';
import { AlignmentOptions } from '@src/alchemy-components/theme/config';
import { useEntityRegistry } from '@src/app/useEntityRegistry';
import { GetSearchResultsForMultipleQuery } from '@src/graphql/search.generated';
import { EntityType } from '@src/types.generated';

import { useDeleteApplicationMutation } from '@graphql/application.generated';

const StyledTable = styled(Table)`
    // CHANGE: Table styling for dark mode
    .ant-table-container {
        border: 1px solid ${(props) => props.theme.styles['border-color-base']} !important;
        background-color: ${(props) => props.theme.styles['component-background']} !important;
        color: ${(props) => props.theme.styles['text-color']} !important;
        border-radius: 8px !important;
    }
    .ant-table-thead > tr > th {
        background-color: ${(props) => props.theme.styles['component-background']} !important;
        border-color: ${(props) => props.theme.styles['border-color-base']} !important;
        color: ${(props) => props.theme.styles['text-color']} !important;
    }
    .ant-table-tbody > tr > td {
        background-color: ${(props) => props.theme.styles['component-background']} !important;
        border-color: ${(props) => props.theme.styles['border-color-base']} !important;
        color: ${(props) => props.theme.styles['text-color']} !important;
    }
    .ant-table-cell-fix-right {
        background-color: ${(props) => props.theme.styles['component-background']} !important;
    }
`;

const StyledModal = styled(Modal)`
    // CHANGE: Modal styling for dark mode
    &&& .ant-modal-content {
        background-color: ${(props) => props.theme.styles['component-background']} !important;
        color: ${(props) => props.theme.styles['text-color']} !important;
    }
    &&& .ant-modal-header {
        background-color: ${(props) => props.theme.styles['component-background']} !important;
        border-color: ${(props) => props.theme.styles['border-color-base']} !important;
    }
`;

interface Props {
    searchQuery: string;
    searchData: GetSearchResultsForMultipleQuery | undefined;
    loading: boolean;
    networkStatus: NetworkStatus;
    refetch: () => Promise<any>;
}

const ApplicationsTable = ({ searchQuery, searchData, loading: propLoading, networkStatus, refetch }: Props) => {
    const entityRegistry = useEntityRegistry();
    const [deleteApplicationMutation] = useDeleteApplicationMutation();

    const applicationsData = useMemo(() => {
        return searchData?.searchAcrossEntities?.searchResults || [];
    }, [searchData]);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [applicationUrnToDelete, setApplicationUrnToDelete] = useState('');
    const [applicationDisplayName, setApplicationDisplayName] = useState('');

    const filteredApplications = useMemo(() => {
        return applicationsData
            .filter((result) => {
                const application = result.entity;
                const displayName = entityRegistry.getDisplayName(EntityType.Application, application);
                if (!searchQuery) return true;
                return displayName.toLowerCase().includes(searchQuery.toLowerCase());
            })
            .sort((a, b) => {
                const nameA = entityRegistry.getDisplayName(EntityType.Application, a.entity);
                const nameB = entityRegistry.getDisplayName(EntityType.Application, b.entity);
                return nameA.localeCompare(nameB);
            });
    }, [applicationsData, searchQuery, entityRegistry]);

    const isLoading = propLoading || networkStatus === NetworkStatus.refetch;

    const showDeleteConfirmation = useCallback(
        (applicationUrn: string) => {
            const applicationData = applicationsData.find((result) => result.entity.urn === applicationUrn);
            if (!applicationData) {
                message.error('Failed to find application information');
                return;
            }

            const fullDisplayName = entityRegistry.getDisplayName(EntityType.Application, applicationData.entity);

            setApplicationUrnToDelete(applicationUrn);
            setApplicationDisplayName(fullDisplayName);
            setShowDeleteModal(true);
        },
        [entityRegistry, applicationsData],
    );

    const handleDeleteApplication = useCallback(() => {
        deleteApplicationMutation({
            variables: {
                urn: applicationUrnToDelete,
            },
        })
            .then(() => {
                message.success(`Application "${applicationDisplayName}" has been deleted`);
                refetch();
            })
            .catch((e: any) => {
                message.error(`Failed to delete application: ${e.message}`);
            });

        setShowDeleteModal(false);
        setApplicationUrnToDelete('');
        setApplicationDisplayName('');
    }, [deleteApplicationMutation, refetch, applicationUrnToDelete, applicationDisplayName]);

    const handleDeleteClose = useCallback(() => {
        setShowDeleteModal(false);
        setApplicationUrnToDelete('');
        setApplicationDisplayName('');
    }, []);

    const columns = useMemo(
        () => [
            {
                title: 'Application',
                key: 'application',
                render: (record) => {
                    const application = record.entity;
                    const displayName = entityRegistry.getDisplayName(EntityType.Application, application);
                    return (
                        <ApplicationNameColumn
                            applicationUrn={application.urn}
                            displayName={displayName}
                            searchQuery={searchQuery}
                        />
                    );
                },
            },
            {
                title: 'Description',
                key: 'description',
                render: (record) => {
                    return (
                        <ApplicationDescriptionColumn
                            key={`description-${record.entity.urn}`}
                            applicationUrn={record.entity.urn}
                            description={record.entity.properties?.description}
                        />
                    );
                },
            },
            {
                title: 'Owners',
                key: 'owners',
                render: (record) => {
                    return (
                        <ApplicationOwnersColumn
                            key={`owners-${record.entity.urn}`}
                            applicationUrn={record.entity.urn}
                            owners={record.entity.ownership}
                        />
                    );
                },
            },
            {
                title: '',
                key: 'actions',
                alignment: 'right' as AlignmentOptions,
                render: (record) => {
                    return (
                        <ApplicationActionsColumn
                            applicationUrn={record.entity.urn}
                            onDelete={() => {
                                showDeleteConfirmation(record.entity.urn);
                            }}
                        />
                    );
                },
            },
        ],
        [entityRegistry, searchQuery, showDeleteConfirmation],
    );

    const tableData = useMemo(() => {
        return filteredApplications.map((application) => ({
            ...application,
            key: application.entity.urn,
        }));
    }, [filteredApplications]);

    return (
        <>
            <StyledTable columns={columns} data={tableData} isLoading={isLoading} isScrollable rowKey="key" />
            <ConfirmationModal
                isOpen={showDeleteModal}
                handleClose={handleDeleteClose}
                handleConfirm={handleDeleteApplication}
                modalTitle="Delete Application"
                modalText={`Are you sure you want to delete the application "${applicationDisplayName}"? This action cannot be undone.`}
                closeButtonText="Cancel"
                confirmButtonText="Delete"
            />
        </>
    );
};
export default ApplicationsTable;
