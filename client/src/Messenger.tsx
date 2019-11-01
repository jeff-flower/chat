import React, {useState} from 'react';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_CONVERSATION = gql`
  query chatHistory($user1: String!, $user2: String!) {
    conversationHistory(user1: $user1, user2: $user2) {
      text
      from
      to
    }
  }
`;

interface Message {
  from: string;
  to: string;
  text: string;
}

interface ConversationQueryData {
  conversationHistory: Message[];
}

interface ConversationQueryVars {
  user1: string;
  user2: string
}

export const Messenger: React.FC<{from: string, to: string}> = ({from, to}) => {
  const [message, setMessage] = useState<string>('');
  const {loading, data} = useQuery<ConversationQueryData, ConversationQueryVars>(
    GET_CONVERSATION,
    { variables: {user1: from, user2: to}}
  );

  return (
    <div>
      <h2>Messages</h2>
      {data && <ul>
        {data.conversationHistory.map((message, idx) => (
          <li key={idx}>
            {`${message.from}: ${message.text}`}
          </li>
        ))}
      </ul>}
      <form onSubmit={(e) => {e.preventDefault(); console.log(`message: ${message}`)}}>
        <label>
          Message
          <textarea value={message} onChange={e => setMessage(e.target.value)} />
        </label>
        <button>Send</button>
      </form>
    </div>
  );
};