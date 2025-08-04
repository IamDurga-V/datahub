import React from 'react';
import styled, { useTheme } from 'styled-components';

import { REDESIGN_COLORS } from '@app/entityV2/shared/constants';
import { ViewItem } from '@app/entityV2/view/menu/item/ViewItem';
import { UserDefaultViewIcon } from '@app/entityV2/view/shared/UserDefaultViewIcon';
import { useShowNavBarRedesign } from '@src/app/useShowNavBarRedesign';

type Props = {
    key: string;
    onClick: () => void;
};

/**
 * Set the User's default view item
 */
export const SetUserDefaultItem = ({ key, onClick }: Props) => {
    const isShowNavBarRedesign = useShowNavBarRedesign();
    const theme = useTheme();

    return (
        <ViewItem
            key={key}
            onClick={onClick}
            dataTestId="view-dropdown-set-user-default"
            tip="Make this View your personal default. You will have this View applied automatically."
            title="Make my default"
            icon={
                <UserDefaultViewIcon
                    color={isShowNavBarRedesign ? theme?.styles['primary-color'] : theme.styles['primary-color']}
                />
            }
        />
    );
};
