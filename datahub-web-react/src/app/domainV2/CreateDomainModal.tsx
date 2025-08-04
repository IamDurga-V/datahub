import { Collapse, Form, Input, Modal, Tag, Typography, message } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

import analytics, { EventType } from '@app/analytics';
import { useDomainsContext as useDomainsContextV2 } from '@app/domainV2/DomainsContext';
import DomainParentSelect from '@app/entityV2/shared/EntityDropdown/DomainParentSelect';
import { ModalButtonContainer } from '@app/shared/button/styledComponents';
import { validateCustomUrnId } from '@app/shared/textUtil';
import { useEnterKeyListener } from '@app/shared/useEnterKeyListener';
import { useIsNestedDomainsEnabled } from '@app/useAppConfig';
import { Button } from '@src/alchemy-components';

import { useCreateDomainMutation } from '@graphql/domain.generated';

const SuggestedNamesGroup = styled.div`
    margin-top: 8px;
`;

const ClickableTag = styled(Tag)`
    :hover {
        cursor: pointer;
    }
    && {
        color: ${(props) => props.theme.styles['text-color']};
    }
`;

const FormItem = styled(Form.Item)`
    .ant-form-item-label {
        padding-bottom: 2px;
    }
`;

const FormItemWithMargin = styled(FormItem)`
    margin-bottom: 16px;
`;

const FormItemNoMargin = styled(FormItem)`
    margin-bottom: 0;
`;

const FormItemLabel = styled(Typography.Text)`
    font-weight: 600;
    color: ${(props) => props.theme.styles['text-color']};
`;

const AdvancedLabel = styled(Typography.Text)`
    color: ${(props) => props.theme.styles['text-color']};
`;

const StyledModal = styled(Modal)`
    &&& .ant-modal-content {
        background-color: ${(props) => props.theme.styles['component-background']};
        color: ${(props) => props.theme.styles['text-color']};
    }
    &&& .ant-modal-header {
        background-color: ${(props) => props.theme.styles['component-background']};
        border-color: ${(props) => props.theme.styles['border-color-base']};
        color: ${(props) => props.theme.styles['text-color']};
    }
    &&& .ant-collapse {
        background-color: ${(props) => props.theme.styles['component-background']};
    }
    &&& .ant-collapse-header {
        background-color: ${(props) => props.theme.styles['component-background']};
        color: ${(props) => props.theme.styles['text-color']};
    }
    &&& .ant-collapse-content {
        background-color: ${(props) => props.theme.styles['component-background']};
        color: ${(props) => props.theme.styles['text-color']};
    }
    &&& .ant-collapse-item {
        border-color: ${(props) => props.theme.styles['border-color-base']};
    }
    &&& .ant-collapse-arrow {
        color: ${(props) => props.theme.styles['text-color-secondary']};
    }
`;

type Props = {
    onClose: () => void;
    onCreate: (
        urn: string,
        id: string | undefined,
        name: string,
        description: string | undefined,
        parentDomain?: string,
    ) => void;
};

const SUGGESTED_DOMAIN_NAMES = ['Engineering', 'Marketing', 'Sales', 'Product'];

const ID_FIELD_NAME = 'id';
const NAME_FIELD_NAME = 'name';
const DESCRIPTION_FIELD_NAME = 'description';

export default function CreateDomainModal({ onClose, onCreate }: Props) {
    const isNestedDomainsEnabled = useIsNestedDomainsEnabled();
    const [createDomainMutation] = useCreateDomainMutation();
    const { entityData } = useDomainsContextV2();
    const [selectedParentUrn, setSelectedParentUrn] = useState<string>(
        (isNestedDomainsEnabled && entityData?.urn) || '',
    );
    const [createButtonEnabled, setCreateButtonEnabled] = useState(false);
    const [form] = Form.useForm();

    const onCreateDomain = () => {
        createDomainMutation({
            variables: {
                input: {
                    id: form.getFieldValue(ID_FIELD_NAME),
                    name: form.getFieldValue(NAME_FIELD_NAME),
                    description: form.getFieldValue(DESCRIPTION_FIELD_NAME),
                    parentDomain: selectedParentUrn || undefined,
                },
            },
        })
            .then(({ data, errors }) => {
                if (!errors) {
                    analytics.event({
                        type: EventType.CreateDomainEvent,
                        parentDomainUrn: selectedParentUrn || undefined,
                    });
                    message.success({
                        content: `Created domain!`,
                        duration: 3,
                    });
                    onCreate(
                        data?.createDomain || '',
                        form.getFieldValue(ID_FIELD_NAME),
                        form.getFieldValue(NAME_FIELD_NAME),
                        form.getFieldValue(DESCRIPTION_FIELD_NAME),
                        selectedParentUrn || undefined,
                    );
                    form.resetFields();
                }
            })
            .catch((e) => {
                message.destroy();
                message.error({ content: `Failed to create Domain!: \n ${e.message || ''}`, duration: 3 });
            });
        onClose();
    };

    useEnterKeyListener({
        querySelectorToExecuteClick: '#createDomainButton',
    });

    return (
        <StyledModal
            title={
                <Typography.Text style={{ color: (props) => props.theme.styles['text-color'] }}>
                    Create New Domain
                </Typography.Text>
            }
            open
            onCancel={onClose}
            footer={
                <ModalButtonContainer>
                    <Button color="gray" onClick={onClose} variant="text">
                        Cancel
                    </Button>
                    <Button
                        id="createDomainButton"
                        data-testid="create-domain-button"
                        onClick={onCreateDomain}
                        disabled={!createButtonEnabled}
                        type="submit"
                    >
                        Create
                    </Button>
                </ModalButtonContainer>
            }
        >
            <Form
                form={form}
                initialValues={{}}
                layout="vertical"
                onFieldsChange={() => {
                    setCreateButtonEnabled(!form.getFieldsError().some((field) => field.errors.length > 0));
                }}
            >
                <FormItemWithMargin label={<FormItemLabel>Name</FormItemLabel>}>
                    <FormItemNoMargin
                        name={NAME_FIELD_NAME}
                        rules={[
                            {
                                required: true,
                                message: 'Enter a Domain name.',
                            },
                            { whitespace: true },
                            { min: 1, max: 150 },
                        ]}
                        hasFeedback
                    >
                        <Input data-testid="create-domain-name" placeholder="A name for your domain" />
                    </FormItemNoMargin>
                    <SuggestedNamesGroup>
                        {SUGGESTED_DOMAIN_NAMES.map((name) => {
                            return (
                                <ClickableTag
                                    key={name}
                                    onClick={() => {
                                        form.setFieldsValue({
                                            name,
                                        });
                                        setCreateButtonEnabled(true);
                                    }}
                                >
                                    {name}
                                </ClickableTag>
                            );
                        })}
                    </SuggestedNamesGroup>
                </FormItemWithMargin>
                <FormItemWithMargin
                    label={<FormItemLabel>Description</FormItemLabel>}
                    help="You can always change the description later."
                >
                    <FormItemNoMargin
                        name={DESCRIPTION_FIELD_NAME}
                        rules={[{ whitespace: true }, { min: 1, max: 500 }]}
                        hasFeedback
                    >
                        <Input.TextArea
                            placeholder="A description for your domain"
                            data-testid="create-domain-description"
                        />
                    </FormItemNoMargin>
                </FormItemWithMargin>
                {isNestedDomainsEnabled && (
                    <FormItemWithMargin label={<FormItemLabel>Parent (optional)</FormItemLabel>}>
                        <DomainParentSelect
                            selectedParentUrn={selectedParentUrn}
                            setSelectedParentUrn={setSelectedParentUrn}
                        />
                    </FormItemWithMargin>
                )}
                <Collapse ghost>
                    <Collapse.Panel header={<AdvancedLabel>Advanced Options</AdvancedLabel>} key="1">
                        <FormItemWithMargin
                            label={<Typography.Text strong>Domain Id</Typography.Text>}
                            help="By default, a random UUID will be generated to uniquely identify this domain. If
                                you'd like to provide a custom id instead to more easily keep track of this domain,
                                you may provide it here. Be careful, you cannot easily change the domain id after
                                creation."
                        >
                            <FormItemNoMargin
                                name={ID_FIELD_NAME}
                                rules={[
                                    () => ({
                                        validator(_, value) {
                                            if (value && validateCustomUrnId(value)) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Please enter a valid Domain id'));
                                        },
                                    }),
                                ]}
                            >
                                <Input
                                    placeholder="classification"
                                    onChange={(event) => setStagedId(event.target.value)}
                                />
                            </FormItemNoMargin>
                        </FormItemWithMargin>
                    </Collapse.Panel>
                </Collapse>
            </Form>
        </StyledModal>
    );
}

