import { Form } from 'antd';
import styled from 'styled-components';

import { Button, colors } from '@src/alchemy-components';
import radius from '@src/alchemy-components/theme/foundations/radius';
import spacing from '@src/alchemy-components/theme/foundations/spacing';
import { ANTD_GRAY, REDESIGN_COLORS } from '@src/app/entityV2/shared/constants';

export const StyledTableContainer = styled.div`
    table tr.acryl-selected-table-row {
        background-color: ${(props) => props.theme.styles['background-color-light']}; // Change
    }
    margin: 0px 12px 12px 12px;
`;

export const LinkedAssetsContainer = styled.div<{ hasButton?: boolean; width?: string }>(({ hasButton, theme }) => ({
    border: `1px solid ${theme.styles['border-color-base']}`, // Change
    borderRadius: radius.lg,
    padding: spacing.xxsm,
    boxShadow: `0px 1px 2px 0px ${theme.styles['box-shadow']}`, // Change
    backgroundColor: theme.styles['component-background'], // Change
    width: 'auto',
    maxHeight: '40vh',
    overflow: 'auto',

    '&:hover': hasButton
        ? {
            border: `1px solid ${theme.styles['primary-color']}`,
            cursor: 'pointer',
        }
        : {},
}));

export const FiltersContainer = styled.div`
    display: flex;
    gap: 16px;
`;

export const StyledFilterContainer = styled.div`
    button {
        box-shadow: none !important;
        height: 36px !important;
        font-size: 14px !important;
        border-radius: 8px !important;
        color: ${(props) => props.theme.styles['text-color']}; // Change
    }
`;
export const SearchFilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0px 10px;
    margin-bottom: 8px;
    margin-top: 8px;
    gap: 12px;
`;

export const ModalTitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const ModalHeading = styled.span`
    font-weight: 700;
    font-size: 16px;
    color: ${(props) => props.theme.styles['text-color']}; // Change
`;

export const ModalDescription = styled.p`
    font-weight: 500;
    font-size: 14px;
    color: ${(props) => props.theme.styles['text-color-secondary']}; // Change
`;

export const FormItem = styled(Form.Item)`
    .ant-form-item-label > label {
        color: ${(props) => props.theme.styles['text-color-secondary']} !important; // Change
        font-size: 12px;
    }
    .ant-form-item-control textarea {
        font-weight: 400;
        font-size: 14px;
    }
`;

export const IconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 1px solid ${(props) => props.theme.styles['border-color-base']}; // Change
    background-color: ${(props) => props.theme.styles['component-background']}; // Change
    height: 22px;
    width: 22px;
`;

export const ResolverNameContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 4px;
`;

export const ResolverInfoContainer = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
    color: ${(props) => props.theme.styles['text-color']}; // Change
`;

export const ResolverTitleContainer = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: ${(props) => props.theme.styles['text-color-secondary']}; // Change
`;

export const ResolverDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const ResolverSubTitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;
export const ResolverSubTitle = styled.div`
    font-size: 12px;
    font-weight: 700;
    color: ${(props) => props.theme.styles['text-color']}; // Change
`;

export const ResolverDetails = styled.div`
    font-size: 14px;
    font-weight: 400;
    color: ${(props) => props.theme.styles['text-color-secondary']}; // Change
    width: 250px;
`;

export const AssigneeAvatarStackContainer = styled.div`
    display: flex;
`;

export const CategoryType = styled.div`
    color: ${(props) => props.theme.styles['text-color-secondary']}; // Change
    text-transform: capitalize;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100px;
`;

export const CreateButton = styled(Button)`
    height: 40px;
`;

export const SiblingSelectionDropdownLink = styled.div`
    margin-bottom: 4px;
    padding: 4px 8px;
    font-size: 0.75rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: ${(props) => props.theme.styles['text-color']}; // Change
    border-radius: 8px;
    &:disabled {
        opacity: 0.6;
        background-color: transparent;
    }
`;
