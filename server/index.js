const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    name: String
  }

  type Query {
    users: [User]
  }
`;

const users = [
  {
    name: "John Doe"
  },
  {
    name: "Jane Doe"
  }
];

const resolvers = {
  Query: {
    users: () => users
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
