const { ApolloServer, gql, PubSub } = require("apollo-server");

// TODO: add date to message and sort by date to get consistent conversation history?
const typeDefs = gql`
  type User {
    name: String!
  }

  type Message {
    from: String!
    to: String!
    text: String!
  }

  type Query {
    users: [User]
    "allMessages is here for debugging, not actually used by client"
    allMessages: [Message]
    conversationHistory(user1: String!, user2: String!): [Message]
  }

  type Mutation {
    sendMessage(from: String!, to: String!, text: String!): Message!
  }

  type Subscription {
    newMessage: Message
  }
`;

const users = [
  {
    name: "JohnDoe"
  },
  {
    name: "JaneDoe"
  }
];

const messages = [
  {
    from: "JohnDoe",
    to: "JaneDoe",
    text: "Good Morning"
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
      const { from, to, text } = args;
      const newMessage = { from, to, text };
      messages.push(newMessage);
      pubsub.publish("newMessage", { newMessage });
      return newMessage;
    }
  },
  Subscription: {
    newMessage: {
      subscribe: () => pubsub.asyncIterator("newMessage")
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
