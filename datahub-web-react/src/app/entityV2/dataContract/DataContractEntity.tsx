import { FileOutlined } from '@ant-design/icons';
import * as React from 'react';

import { Entity, EntityCapabilityType, IconStyleType, PreviewType } from '@app/entityV2/Entity';
import { getDataForEntityType } from '@app/entityV2/shared/containers/profile/utils';
import { TYPE_ICON_CLASS_NAME } from '@src/app/shared/constants';
import { DataContract, EntityType } from '@src/types.generated';

/**
 *  Definition of datahub DataContract Entity
 */
export class DataContractEntity implements Entity<DataContract> {
    type: EntityType = EntityType.DataContract;

    icon = (fontSize?: number, styleType?: IconStyleType, color?: string) => {
        if (styleType === IconStyleType.TAB_VIEW) {
            return <FileOutlined className={TYPE_ICON_CLASS_NAME} style={{ fontSize, color: color || 'white' }} />; // Change
        }

        if (styleType === IconStyleType.HIGHLIGHT) {
            return <FileOutlined className={TYPE_ICON_CLASS_NAME} style={{ fontSize, color: color || '#d6246c' }} />;
        }

        if (styleType === IconStyleType.SVG) {
            return (
                <path d="M832 64H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32zm-600 72h560v208H232V136zm560 480H232V408h560v208zm0 272H232V680h560v208zM304 240a40 40 0 1080 0 40 40 0 10-80 0zm0 272a40 40 0 1080 0 40 40 0 10-80 0zm0 272a40 40 0 1080 0 40 40 0 10-80 0z" />
            );
        }

        return (
            <FileOutlined
                className={TYPE_ICON_CLASS_NAME}
                style={{
                    fontSize,
                    color: color || '#BFBFBF',
                }}
            />
        );
    };

    isSearchEnabled = () => true;

    isBrowseEnabled = () => false;

    isLineageEnabled = () => false;

    getAutoCompleteFieldName = () => 'name';

    getGraphName = () => 'dataContract';

    getPathName = () => 'dataContracts';

    getEntityName = () => 'Data Contract';

    getCollectionName = () => 'Data Contracts';

    renderProfile = () => <span>Not Implemented</span>;

    getSidebarSections = () => [];

    getSidebarTabs = () => [];

    getOverridePropertiesFromEntity = () => {};

    renderPreview = () => {
        return <span>Not Implemented</span>;
    };

    renderSearch = () => {
        return <span>Not Implemented</span>;
    };

    displayName = () => {
        return 'Data Contract';
    };

    getGenericEntityProperties = (data: DataContract) => {
        return getDataForEntityType({
            data,
            entityType: this.type,
        });
    };

    supportedCapabilities = () => {
        return new Set([]);
    };
}
