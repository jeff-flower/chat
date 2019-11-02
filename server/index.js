const { ApolloServer, gql, PubSub, withFilter } = require("apollo-server");

// TODO: add date to message and sort by date to get consistent conversation history?
const typeDefs = gql`
  type User {
    name: String!
    id: ID!
  }

  type Message {
    from: String!
    to: String!
    text: String!
    id: ID!
  }

  input SendMessageInput {
    from: String!
    to: String!
    text: String!
  }

  type Query {
    users: [User]
    "allMessages is here for debugging, not actually used by client"
    allMessages: [Message]
    "all messages between two users"
    conversationHistory(user1: String!, user2: String!): [Message]
  }

  type Mutation {
    "send a message between two users"
    sendMessage(message: SendMessageInput!): Message!
  }

  type Subscription {
    "subscribe to new messages sent from a specific user to a specific user"
    newMessageInConversation(from: String!, to: String!): Message
  }
`;

const users = [
  {
    name: "JohnDoe",
    id: "1"
  },
  {
    name: "JaneDoe",
    id: "2"
  }
];

const messages = [
  {
    from: "JohnDoe",
    to: "JaneDoe",
    text: "Good Morning",
    id: "1"
  }
];

const pubsub = new PubSub();

const resolvers = {
  Query: {
    users: () => users,
    allMessages: () => messages,
    conversationHistory: (parent, args) => {
      const { user1, user2 } = args;
      return messages.filter(
        ({ from, to }) =>
          from === user1 || from === user2 || to === user1 || to === user2
      );
    }
  },
  Mutation: {
    sendMessage: (parent, args) => {
      const { from, to, text } = args.message;
      const newMessage = { from, to, text, id: String(messages.length + 1) };
      messages.push(newMessage);
      pubsub.publish("newMessage", { newMessageInConversation: newMessage });
      return newMessage;
    }
  },
  Subscription: {
    newMessageInConversation: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("newMessage"),
        (payload, variables) =>
          payload.newMessageInConversation.from === variables.from &&
          payload.newMessageInConversation.to === variables.to
      )
    }
  }
};

// Subscriptions/Filtering subscriptions: https://www.apollographql.com/docs/apollo-server/data/subscriptions/#subscriptions-example

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
