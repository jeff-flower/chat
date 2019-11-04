import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import {MessageForm, MessageFormProps} from './MessageForm';

it('should call the provided callback when the user sends a message', () => {
  const props: MessageFormProps = {
    sendMessage: jest.fn()
  }
  const {getByText} = render(<MessageForm {...props}/>);
  const sendButton = getByText('Send Message');
  fireEvent.click(sendButton);
  expect(props.sendMessage).toBeCalled();
});

it('should clear the input when the user sends a message', () => {
  const props: MessageFormProps = {
    sendMessage: jest.fn()
  }
  const {getByText, getByTestId} = render(<MessageForm {...props}/>);
  const sendButton = getByText('Send Message');
  const textArea = getByTestId('messageFormText');
  fireEvent.change(textArea, {target: {value: 'test input'}});
  expect(textArea).toHaveTextContent('test input');
  fireEvent.click(sendButton);
  expect(textArea).toHaveTextContent('');
});
