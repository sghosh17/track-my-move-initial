const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    role: String
    password: String
    name: String
    address: String
    phone: String
    forms: [Form]
  }

  type Form {
    _id: ID
    formName: String
    notes: [Note]
    checkboxes: [Checkbox]
  }

  type Checkbox {
    checkboxName: String
    status: Boolean
  }

  type Note {
    noteText: String
    noteAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }
  type Query {
    users: [User]
    user(username: String!): User
    userById(userId: ID!): User

    me: User
    forms(userId: ID!): Form
    form(userId: ID!, formName: String!): Form
  }
  input InputCheckbox {
    checkboxName: String
    status: Boolean
  }
  input InputNote {
    noteText: String
    noteAuthor: String
    createdAt: String
  }
  input InputForm {
    formName: String
    notes: [InputNote]
    checkboxes: [InputCheckbox]
  }
  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
      role: String!
    ): Auth
    editUser(name: String!, address: String!, phone: String!): User
    login(email: String!, password: String!): Auth

    addForm(userId: ID, form: InputForm): Form
  }
`;

module.exports = typeDefs;
