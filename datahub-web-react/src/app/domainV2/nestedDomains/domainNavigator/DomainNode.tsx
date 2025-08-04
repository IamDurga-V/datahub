import { Tooltip, colors, typography } from '@components';
import React, { useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';

import { useDomainsContext as useDomainsContextV2 } from '@app/domainV2/DomainsContext';
import useListDomains from '@app/domainV2/useListDomains';
import { REDESIGN_COLORS } from '@app/entityV2/shared/constants';
import { DomainColoredIcon } from '@app/entityV2/shared/links/DomainColoredIcon';
import { BodyContainer, BodyGridExpander } from '@app/shared/components';
import useToggle from '@app/shared/useToggle';
import { RotatingTriangle } from '@app/sharedV2/sidebar/components';
import { useEntityRegistry } from '@app/useEntityRegistry';
import { Typography } from 'antd';


import { Domain } from '@types';

const Count = styled.div`
    color: ${(props) => props.theme.styles['text-color-secondary']};
    font-size: 12px;
    padding: 0 8px;
    margin-left: 8px;
    border-radius: 20px;
    background-color: ${(props) => props.theme.styles['background-color-light']};
    height: 22px;
    min-width: 28px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`;

const NameWrapper = styled(Typography.Text)<{ $isSelected: boolean; $addLeftPadding: boolean }>`
    flex: 1;
    padding: 2px;
    ${(props) => props.$isSelected && `color: ${props.theme.styles['primary-color']};`}
    ${(props) => props.$addLeftPadding && 'padding-left: 20px;'}

    &:hover {
        cursor: pointer;
    }
    display: flex !important;
    align-items: center;
    justify-content: space-between;
    transition: font-weight 0.3s ease-out;
    width: 100%;
`;

const DisplayName = styled.span<{ $isSelected: boolean }>`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${(props) => (props.$isSelected ? props.theme.styles['primary-color'] : props.theme.styles['text-color'])};
    transition: font-weight 0.3s ease-out;
`;

const ButtonWrapper = styled.span<{ $addLeftPadding: boolean; $isSelected: boolean }>`
    margin-right: 4px;
    font-size: 16px;

    svg {
        font-size: 16px !important;
        color: ${(props) =>
            props.$isSelected ? props.theme.styles['primary-color'] : props.theme.styles['text-color-secondary']} !important;
    }

    .ant-btn {
        height: 16px;
        width: 16px;
    }
`;

const RowWrapper = styled.div<{ $isSelected: boolean; isOpen?: boolean }>`
    align-items: center;
    display: flex;
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.styles['border-color-base']};
    padding: 12px;
    ${(props) => props.isOpen && `background-color: ${(props) => props.theme.styles['component-background']};`}
    ${(props) => props.$isSelected && `background-color: ${(props) => props.theme.styles['highlight-color']};`}
    &:hover {
        background-color: ${(props) => props.theme.styles['highlight-color']};
        ${ButtonWrapper} {
            svg {
                color: ${(props) => props.theme.styles['primary-color']} !important;
            }
        }
        ${DisplayName} {
            color: ${(props) => props.theme.styles['primary-color']};
        }
    }
`;

const StyledExpander = styled(BodyGridExpander)<{ paddingLeft: number }>`
    padding-left: 0px;
    background: ${(props) => props.theme.styles['component-background']};
    display: flex;
    width: 100%;
    overflow: auto;
    ${RowWrapper} {
        padding-left: ${(props) => props.paddingLeft + 12}px;
    }
`;

const Text = styled.div`
    display: flex;
    gap: 9px;
    align-items: center;
    font-size: 14px;
    width: 80%;
`;

interface Props {
    domain: Domain;
    numDomainChildren: number;
    isCollapsed?: boolean;
    domainUrnToHide?: string;
    selectDomainOverride?: (domain: Domain) => void;
    unhideSidebar?: () => void;
    $paddingLeft?: number;
}

export default function DomainNode({
    domain,
    numDomainChildren,
    domainUrnToHide,
    isCollapsed,
    selectDomainOverride,
    unhideSidebar,
    $paddingLeft = 0,
}: Props) {
    const shouldHideDomain = domainUrnToHide === domain.urn;
    const history = useHistory();
    const entityRegistry = useEntityRegistry();
    const { entityData } = useDomainsContextV2();
    const { isOpen, isClosing, toggle, toggleOpen, toggleClose } = useToggle({
        initialValue: false,
        closeDelay: 250,
    });
    const { sortedDomains } = useListDomains({ parentDomain: domain.urn, skip: !isOpen || shouldHideDomain });
    const isOnEntityPage = entityData && entityData.urn === domain.urn;
    const displayName = entityRegistry.getDisplayName(domain.type, isOnEntityPage ? entityData : domain);
    const isInSelectMode = !!selectDomainOverride;
    const isDomainNodeSelected = !!isOnEntityPage && !isInSelectMode;
    const shouldAutoOpen = useMemo(
        () => !isInSelectMode && entityData?.parentDomains?.domains?.some((parent) => parent.urn === domain.urn),
        [isInSelectMode, entityData, domain.urn],
    );
    const paddingLeft = $paddingLeft + 16;

    useEffect(() => {
        if (shouldAutoOpen) toggleOpen();
    }, [shouldAutoOpen, toggleOpen]);

    useEffect(() => {
        if (isCollapsed) {
            toggleClose();
        }
    }, [isCollapsed, toggleClose]);

    function handleSelectDomain() {
        if (selectDomainOverride && !isCollapsed) {
            selectDomainOverride(domain);
        } else if (unhideSidebar && isCollapsed) {
            unhideSidebar();
        } else {
            history.push(entityRegistry.getEntityUrl(domain.type, domain.urn));
        }
    }

    if (shouldHideDomain) return null;

    const finalNumChildren = sortedDomains?.length ?? numDomainChildren;
    const hasDomainChildren = !!finalNumChildren;

    return (
        <>
            <RowWrapper
                data-testid="domain-list-item"
                $isSelected={isDomainNodeSelected && !isCollapsed}
                isOpen={isOpen && !isClosing}
            >
                {!isCollapsed && hasDomainChildren && (
                    <ButtonWrapper
                        $addLeftPadding={!isCollapsed && !hasDomainChildren}
                        $isSelected={isDomainNodeSelected && !isCollapsed}
                    >
                        <RotatingTriangle
                            isOpen={isOpen && !isClosing}
                            onClick={toggle}
                            dataTestId="open-domain-item"
                        />
                    </ButtonWrapper>
                )}
                <Tooltip placement="right" title={displayName} mouseEnterDelay={0.7} mouseLeaveDelay={0}>
                    <NameWrapper
                        onClick={handleSelectDomain}
                        $isSelected={isDomainNodeSelected}
                        $addLeftPadding={!isCollapsed && !hasDomainChildren}
                    >
                        <Text>
                            <Tooltip
                                placement="right"
                                title={isCollapsed && displayName}
                                mouseEnterDelay={0.7}
                                mouseLeaveDelay={0}
                            >
                                <DomainColoredIcon domain={domain} size={30} fontSize={14} />
                            </Tooltip>
                            <DisplayName $isSelected={isDomainNodeSelected && !isCollapsed}>
                                {!isCollapsed && displayName}
                            </DisplayName>
                        </Text>
                        {!isCollapsed && hasDomainChildren && <Count>{finalNumChildren}</Count>}
                    </NameWrapper>
                </Tooltip>
            </RowWrapper>
            <StyledExpander isOpen={isOpen && !isClosing} paddingLeft={paddingLeft}>
                <BodyContainer style={{ width: '100%' }}>
                    {sortedDomains?.map((childDomain) => (
                        <DomainNode
                            key={domain.urn}
                            domain={childDomain as Domain}
                            numDomainChildren={childDomain.children?.total || 0}
                            domainUrnToHide={domainUrnToHide}
                            selectDomainOverride={selectDomainOverride}
                            unhideSidebar={unhideSidebar}
                            $paddingLeft={paddingLeft}
                        />
                    ))}
                </BodyContainer>
            </StyledExpander>
        </>
    );
}
