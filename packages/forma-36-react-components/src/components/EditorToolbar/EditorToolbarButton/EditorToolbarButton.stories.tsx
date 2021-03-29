import React from 'react';
import type { Meta, Story } from '@storybook/react/types-6-0';
import { HeadingOne } from '@contentful/f36-icons';

import { EditorToolbarButton } from './EditorToolbarButton';
import type { EditorToolbarButtonProps } from './EditorToolbarButton';

export default {
  argTypes: {
    className: { control: { disable: true } },
    icon: {
      control: {
        disable: true,
      },
    },
    label: {
      control: 'text',
      defaultValue: 'H1',
      description: 'Screenreader only',
    },
    testId: { control: { disable: true } },
  },
  component: EditorToolbarButton,
  parameters: {
    propTypes: EditorToolbarButton['__docgenInfo'],
  },
  title: 'Components/EditorToolbar/EditorToolbarButton',
} as Meta;

export const Default: Story<EditorToolbarButtonProps> = (args) => {
  return <EditorToolbarButton {...args} icon={HeadingOne} />;
};
