const {ApolloServer, gql} = require('apollo-server-express');
const {SwAPI} = require('./datasource');
const fs = require('fs');
const cors = require('cors');
const express = require('express');
const port = 9000;

const app = express();
// app.use(cors());
const typeDefs = gql(fs.readFileSync('./schema.graphql', {encoding: 'utf-8'}));
const resolvers = require('./resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        swapi: new SwAPI()
    })
});

server.applyMiddleware({app});
app.listen(port, () => console.log(`Server listening on ${port}`));