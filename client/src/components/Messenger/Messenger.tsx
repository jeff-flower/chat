import React from 'react';

import {MessageList} from './MessageList';
import {MessageForm} from './MessageForm';

import gql from 'graphql-tag';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';

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
  const {data} = useQuery<ConversationQueryData, ConversationQueryVars>(
    GET_CONVERSATION,
    { variables: {user1: from, user2: to}}
  );

  // TODO: do something with this error
  const [sendMessage, { error: sendMessageError}] = useMutation<{sendMessage: SendMessageInput, message: Message}>(
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

  // TODO: do something with this error
  const {error: subscriptionError} = useSubscription<NewMessageSubscriptionData, NewMessageSubscriptionVars>(
    NEW_MESSAGE_SUBSCRIPTION,
    {
      variables: {from: to, to: from},
      onSubscriptionData: ({client, subscriptionData}) => {
        if (subscriptionData.data && subscriptionData.data.newMessageInConversation) {
          const data = client.readQuery({
            query: GET_CONVERSATION,
            variables: {user1: from,  user2: to}
          });

          const messages = data.conversationHistory || [];
          client.writeQuery({
            query: GET_CONVERSATION,
            variables: {user1: from,  user2: to},
            data: {conversationHistory: [...messages, subscriptionData.data.newMessageInConversation]}
          });
        }
      }
    }
  );

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
    <section>
      <MessageList messages={data ? data.conversationHistory : []}/>
      <MessageForm sendMessage={handleSendMessage} />
    </section>
  )
};