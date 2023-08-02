import { createRequire } from 'module';
const require = createRequire(import.meta.url);

var { graphql, buildSchema } = require('graphql');

var schema = buildSchema(` type Query {
    hello: String
  }`)

var root = { hello: () => 'Hello world!' };

graphql(schema, '{ hello }', root).then((response) => {
    console.log(response);
});