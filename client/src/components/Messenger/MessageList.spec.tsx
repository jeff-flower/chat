import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import {Message} from './Messenger';
import {MessageList, MessageListProps} from './MessageList';

it('should render each message', () => {
  const mockMessages: Message[] = [
    {
      from: 'me',
      to: 'you',
      text: 'hello',
      id: '1'
    },
    {
      from: 'you',
      to: 'me',
      text: 'hi back',
      id: '2'
    }
  ];
  const props: MessageListProps = {
    messages: mockMessages
  };
  const {getAllByTestId} = render(<MessageList {...props} />)
  const messages = getAllByTestId('messageListItem');
  expect(messages.length).toBe(mockMessages.length);
});

it('should show the sender for a message', () => {
  const mockMessages: Message[] = [
    {
      from: 'me',
      to: 'you',
      text: 'hello',
      id: '1'
    }  ];
  const props: MessageListProps = {
    messages: mockMessages
  };
  const {getByTestId} = render(<MessageList {...props} />)
  const message = getByTestId('messageListItem');
  expect(message).toHaveTextContent(mockMessages[0].from);
});