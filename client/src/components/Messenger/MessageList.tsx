import React from 'react';

import {Message} from './Messenger';

export const MessageList: React.FC<{messages: Message[]}> = ({messages}) => (
  <div>
    <h2 id="messages">Messages</h2>
    <ul aria-labelledby="messages">
      {messages.map(message => (
        <li key={message.id}>
          {`${message.from}: ${message.text}`}
        </li>
      ))}
    </ul>
  </div>
);