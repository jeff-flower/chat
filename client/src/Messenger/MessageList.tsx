import React from 'react';

import {Message} from './Messenger';

export const MessageList: React.FC<{messages: Message[]}> = ({messages}) => {
  return (
    <ul>
      {messages.map(message => (
        <li key={message.id}>
          {`${message.from}: ${message.text}`}
        </li>
      ))}
    </ul>
  );
};