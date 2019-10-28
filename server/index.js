const { ApolloServer, gql } = require("apollo-server");

// TODO:
// subscription: messages (subscribe to all messages for now)

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
    allMessages: [Message]
  }

  type Mutation {
    sendMessage(from: String!, to: String!, text: String!): Message!
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

const resolvers = {
  Query: {
    users: () => users,
    allMessages: () => messages
  },
  Mutation: {
    sendMessage: (parent, args) => {
      const { from, to, text } = args;
      const newMessage = { from, to, text };
      messages.push(newMessage);
      return newMessage;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
