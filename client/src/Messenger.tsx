import React, {useState} from 'react';

import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { updateExpression } from '@babel/types';

const GET_CONVERSATION = gql`
  query chatHistory($user1: String!, $user2: String!) {
    conversationHistory(user1: $user1, user2: $user2) {
      text
      from
      to
      id
    }
  }
`;

interface Message {
  from: string;
  to: string;
  text: string;
  id: string;
}

interface ConversationQueryData {
  conversationHistory: Message[];
}

interface ConversationQueryVars {
  user1: string;
  user2: string
}

interface SendMessageInput {
  from: string;
  to: string;
  text: string;
}

const SEND_MESSAGE = gql`
  mutation message ($message: SendMessageInput!) {
    sendMessage(message: $message) {
      from 
      to 
      text
      id
    }
  }
`;

export const Messenger: React.FC<{from: string, to: string}> = ({from, to}) => {
  const [message, setMessage] = useState<string>('');
  const {loading, data} = useQuery<ConversationQueryData, ConversationQueryVars>(
    GET_CONVERSATION,
    { variables: {user1: from, user2: to}}
  );
  const [sendMessage, { error, data: newMessage}] = useMutation<{sendMessage: SendMessageInput, message: Message}>(
    SEND_MESSAGE,
    {
      variables: {message: {from, to, text: message}},
      update: (cache: any, {data}) => {
        const {conversationHistory: messages} = cache.readQuery({
          query: GET_CONVERSATION,
          variables: {user1: from,  user2: to}
        });
        cache.writeQuery({
          query: GET_CONVERSATION,
          variables: {user1: from,  user2: to},
          data: {conversationHistory: [...messages, data!.sendMessage]}
        });
      }
    }
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
    setMessage('');
  };

  return (
    <div>
      <h2>Messages</h2>
      {data && <ul>
        {data.conversationHistory.map(message => (
          <li key={message.id}>
            {`${message.from}: ${message.text}`}
          </li>
        ))}
      </ul>}
      <form onSubmit={handleSendMessage}>
        <label>
          Message
          <textarea value={message} onChange={e => setMessage(e.target.value)} />
        </label>
        <button>Send</button>
      </form>
    </div>
  );
};