import { Affix, Row, Typography } from 'antd';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

import DataProfileView from '@app/entityV2/dataset/profile/stats/snapshot/SnapshotStatsView';

import { DatasetProfile } from '@types';

const HeaderRow = styled(Row)`
    padding-top: 24px;
    padding-bottom: 28px;
    background-color: ${(props) => props.theme.styles['component-background']}; // Change
    color: ${(props) => props.theme.styles['text-color']}; // Change
`;

export type Props = {
    profile: DatasetProfile;
    toggleView: ReactNode;
};

export default function LatestStatsView({ profile, toggleView }: Props) {
    const reportedAtDate = new Date(profile.timestampMillis);
    return (
        <>
            <Affix offsetTop={127}>
                <HeaderRow justify="space-between" align="middle">
                    <div>
                        <Typography.Title level={2} style={{ color: 'inherit' }}>
                            Latest Stats
                        </Typography.Title>
                        <Typography.Text style={{ color: 'inherit' }}>
                            Reported on {reportedAtDate.toLocaleDateString()} at {reportedAtDate.toLocaleTimeString()}
                        </Typography.Text>
                    </div>
                    {toggleView}
                </HeaderRow>
            </Affix>
            <DataProfileView profile={profile} />
        </>
    );
}
