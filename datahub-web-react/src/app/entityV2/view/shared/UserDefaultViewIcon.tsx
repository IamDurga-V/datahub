import React from 'react';
import styled, { useTheme } from 'styled-components';

import { DefaultViewIcon } from '@app/entityV2/view/shared/DefaultViewIcon';

type Props = {
    title?: React.ReactNode;
    size?: number;
    color?: string;
};

export const UserDefaultViewIcon = ({ title, color, size }: Props) => {
    const theme = useTheme(); // Change
    return <DefaultViewIcon title={title} color={color || theme.styles['primary-color']} size={size} />; // Change
};
