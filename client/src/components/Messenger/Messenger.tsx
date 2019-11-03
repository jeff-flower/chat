import React from 'react';

import {MessageList} from './MessageList';
import {MessageForm} from './MessageForm';

import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

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

export interface Message {
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

const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription conversationSubscription($from: String!, $to: String!) {
    newMessageInConversation(from: $from, to: $to) {
      from
      to
      text
      id
    }
  }
`;

interface NewMessageSubscriptionData {
  newMessageInConversation: Message;
}


interface NewMessageSubscriptionVars {
  from: string;
  to: string;
}


export const Messenger: React.FC<{from: string, to: string}> = ({from, to}) => {
  const {subscribeToMore, data} = useQuery<ConversationQueryData, ConversationQueryVars>(
    GET_CONVERSATION,
    { variables: {user1: from, user2: to}}
  );
  const [sendMessage, { error, data: newMessage}] = useMutation<{sendMessage: SendMessageInput, message: Message}>(
    SEND_MESSAGE,
    {
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

  // useCallback so this method is not recreated and called on every render in MessageList
  const subscribeToNewMessages = React.useCallback(() => {
    subscribeToMore({
      document: NEW_MESSAGE_SUBSCRIPTION,
      variables: {from: to, to: from},
      updateQuery: (prev, {subscriptionData}: {subscriptionData: {data: {newMessageInConversation: Message}}}) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const newMessage = subscriptionData.data.newMessageInConversation;
        return {...prev, conversationHistory: [...prev.conversationHistory, newMessage]};
      }
    });
  }, [from, to, subscribeToMore]);

  const handleSendMessage = (message: string) => {
    const variables = {
        message: {
        from,
        to,
        text:  message
      }
    }; 
    sendMessage({variables});
  };

  return (
    <div>
      <h2>Messages</h2>
      { data && 
        <>
          <MessageList messages={data!.conversationHistory} subscribeToNewMessages={subscribeToNewMessages}/>
          <MessageForm sendMessage={handleSendMessage} />
        </>
      }
    </div>
  );
};