const { ApolloServer, gql } = require("apollo-server");

const users = [
  {
    name: "Preston"
  },
  {
    name: "Alan"
  },
  {
    name: "Jordan"
  }
];
const posts = [
  {
    title: "Plane crash",
    username: "Jordan"
  },
  {
    title: "Dog found",
    username: "Jordan"
  },
  {
    title: "Kitchen appliances you must have",
    username: "Jordan"
  }
];
// for user data
// create data
// store data - array/object in memory
// retrieve data

// Eager loading...
// User.findAll({where, include: [model: Post]})

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
    getUsers: [User]!
    getUserPosts(username: String!): [Post]!
  }
  type Mutation {
    createUser(username: String!): User!
    createPost(title: String, username: String): Post!
  }
  type User {
    name: String
    posts: [Post]
  }
  type Post {
    title: String
    username: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: (root, args, context) => "Hello world!",
    getUsers: (root, args, context) => {
      for (let user of users) {
        user.posts = posts.filter((post) => post.username === user.name);
      }
      return users;
    },
    getUserPosts: (root, { username }, context) =>
      posts.filter((post) => post.username === username)
  },
  Mutation: {
    createUser: (root, { username }, context) => {
      const newUser = { name: username };
      users.push(newUser);
      console.log(users);
      return newUser;
    },
    createPost: (root, { title, username }, context) => {
      const newPost = { title, username };
      posts.push(newPost);
      console.log(posts);
      return newPost;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
