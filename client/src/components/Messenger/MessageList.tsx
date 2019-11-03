import React from 'react';

import {Message} from './Messenger';

import './MessageList.css';

export const MessageList: React.FC<{messages: Message[]}> = ({messages}) => (
  <div>
    <h2 id="messages">Messages</h2>
    <ul aria-labelledby="messages" className="message-list">
      {messages.map(message => (
        <li key={message.id} className="message-list__message">
          {`${message.from}: ${message.text}`}
        </li>
      ))}
    </ul>
  </div>
);