const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Define the schema
const schema = buildSchema(`
  type Query {
    hello: String
    user(id: Int!): User
  }

  type User {
    id: Int
    name: String
    age: Int
  }
`);

// Define the root resolver
const root = {
  hello: () => 'Stackadapt graphQL test!',
  user: ({ id }) => {
    const users = [
      { id: 1, name: 'Fernando Padilla', age: 41 },
      { id: 2, name: 'Jane Smith', age: 34 },
    ];
    return users.find(user => user.id === id);
  },
};

// Create an Express server and a GraphQL endpoint
const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // Enable GraphiQL GUI
}));

app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
