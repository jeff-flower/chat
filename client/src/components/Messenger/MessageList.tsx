import React, {useEffect} from 'react';

import {Message} from './Messenger';

export const MessageList: React.FC<{messages: Message[], subscribeToNewMessages: () => void}> = ({messages, subscribeToNewMessages}) => {
  useEffect(() => {
    subscribeToNewMessages();
  }, [subscribeToNewMessages]); 

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