import React from 'react';
import styled from 'styled-components/macro';

import { ANTD_GRAY } from '@app/entity/shared/constants';
import { Editor } from '@app/entityV2/shared/tabs/Documentation/components/editor/Editor';
import { toRelativeTimeString } from '@app/shared/time/timeUtils';

import { Post } from '@types';

const Card = styled.div`
    border: 1px solid ${(props) => props.theme.styles['border-color-base']};
    border-radius: 8px;
    background-color: ${(props) => props.theme.styles['component-background']};
    overflow: auto;
`;

const Text = styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    padding: 20px;
    &&&&& .remirror-editor.ProseMirror {
        padding: 0px;
        color: ${(props) => props.theme.styles['text-color']};
    }
`;

const Title = styled.div`
    font-size: 20px;
    word-break: break-word;
    margin-bottom: 10px;
    font-weight: 600;
    color: ${(props) => props.theme.styles['text-color']};
`;

const Time = styled.div`
    font-size: 12px;
    color: ${(props) => props.theme.styles['text-color-secondary']};
`;

type Props = {
    announcement: Post;
};

export const AnnouncementCard = ({ announcement }: Props) => {
    const timestamp = announcement?.lastModified?.time;
    return (
        <Card>
            <Text>
                <Title>{announcement?.content?.title}</Title>
                <Editor className="test-editor" content={announcement?.content?.description || ''} readOnly />
                {timestamp && <Time>{toRelativeTimeString(timestamp)}</Time>}
            </Text>
        </Card>
    );
};
