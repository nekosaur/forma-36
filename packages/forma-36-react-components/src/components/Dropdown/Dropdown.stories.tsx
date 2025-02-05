import React, { useState } from 'react';
import type { Meta, Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';

import { Dropdown } from './Dropdown';
import { DropdownListItem } from './DropdownListItem/DropdownListItem';
import { Button } from '../Button';
import { TextLink } from '../TextLink';
import { DropdownList } from './DropdownList/DropdownList';
import { Flex } from '../Flex';
import { SectionHeading } from '../Typography';

export default {
  argTypes: {
    className: { control: { disable: true } },
    nonClosingRefs: { control: { disable: true } },
  },
  component: Dropdown,
  propTypes: [
    Dropdown['__docgenInfo'],
    DropdownList['__docgenInfo'],
    DropdownListItem['__docgenInfo'],
  ],
  subcomponents: { DropdownList, DropdownListItem },
  title: 'Components/Dropdown',
} as Meta;

export const Default: Story = ({ submenuToggleLabel, ...args }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Dropdown
      {...args}
      isOpen={isOpen}
      onClose={() => setOpen(false)}
      toggleElement={
        <Button
          size="small"
          buttonType="muted"
          indicateDropdown
          onClick={() => setOpen(!isOpen)}
        >
          Choose more options and settings
        </Button>
      }
    >
      <DropdownList>
        <DropdownListItem isTitle>Entry Title</DropdownListItem>
        <DropdownListItem onClick={action('onClick Element')}>
          Embed existing entry
        </DropdownListItem>
        <Dropdown position="left" submenuToggleLabel={submenuToggleLabel}>
          <DropdownList>
            <DropdownListItem onClick={action('submenu click')}>
              Embed as inline element
            </DropdownListItem>
            <DropdownListItem isDisabled>
              Embed as block element
            </DropdownListItem>
          </DropdownList>
        </Dropdown>
      </DropdownList>
      <DropdownList border="top">
        <DropdownListItem>
          <TextLink href="http://google.com">This is a Link</TextLink>
        </DropdownListItem>
      </DropdownList>
    </Dropdown>
  );
};

Default.args = {
  submenuToggleLabel: 'Create and embed existing entry',
};

export const Scrollable: Story = (args) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Dropdown
      {...args}
      isOpen={isOpen}
      onClose={() => setOpen(false)}
      toggleElement={
        <Button
          size="small"
          buttonType="muted"
          indicateDropdown
          onClick={() => setOpen(!isOpen)}
        >
          toggle
        </Button>
      }
    >
      <DropdownList maxHeight={200}>
        {[...new Array(25)].map((entry, index) => (
          // eslint-disable-next-line
          <DropdownListItem key={`key-${index}`} onClick={action('click')}>
            Entry Item {index}
          </DropdownListItem>
        ))}
      </DropdownList>
    </Dropdown>
  );
};

export const DynamicContent: Story = (args) => {
  const messages = ['Loading...', 'This is my other piece of text'];
  const [isOpen, setOpen] = useState(false);
  const [text, setText] = useState(messages[0]);

  const onClose = () => {
    setOpen(false);
    setText(messages[0]);
  };

  const onClick = () => {
    if (isOpen) {
      return onClose();
    }

    setTimeout(() => setText(messages[1]), 500);
    setOpen(true);
  };

  return (
    <Dropdown
      {...args}
      isOpen={isOpen}
      onClose={onClose}
      toggleElement={
        <Button
          size="small"
          buttonType="muted"
          onClick={onClick}
          indicateDropdown
        >
          Choose more options and settings
        </Button>
      }
    >
      <DropdownList>
        <DropdownListItem>{text}</DropdownListItem>
      </DropdownList>
    </Dropdown>
  );
};

export const Overview: Story = () => (
  <>
    <Flex marginBottom="spacingS">
      <SectionHeading element="h3">Dropdown default</SectionHeading>
    </Flex>

    <Default />

    <Flex marginBottom="spacingS" marginTop="spacingM">
      <SectionHeading element="h3">Dropdown default open</SectionHeading>
    </Flex>

    <Dropdown
      isOpen
      isAutoalignmentEnabled
      usePortal
      position="bottom-left"
      toggleElement={
        <Button size="small" buttonType="muted" indicateDropdown>
          Choose more options and settings
        </Button>
      }
    >
      <DropdownList>
        <DropdownListItem isTitle>Entry Title</DropdownListItem>
        <DropdownListItem onClick={action('onClick Element')}>
          Embed existing entry
        </DropdownListItem>
        <Dropdown
          position="right"
          submenuToggleLabel="Create and embed existing entry"
        >
          <DropdownList>
            <DropdownListItem onClick={action('submenu click')}>
              Embed as inline element
            </DropdownListItem>
            <DropdownListItem isDisabled>
              Embed as block element
            </DropdownListItem>
          </DropdownList>
        </Dropdown>
      </DropdownList>
      <DropdownList border="top">
        <DropdownListItem>
          <TextLink href="http://google.com">This is a Link</TextLink>
        </DropdownListItem>
      </DropdownList>
    </Dropdown>
  </>
);
