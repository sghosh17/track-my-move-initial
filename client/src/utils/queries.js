import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      name
      address
      phone
      image
    }
  }
`;

export const QUERY_USERS = gql`
  query getUsers {
    users {
      _id
      role
      email
      username
      address
      image
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      name
      address
      phone
      image
    }
  }
`;

export const QUERY_FORMS = gql`
  query Forms($userId: ID!) {
    forms(userId: $userId) {
      _id
      user {
        username
        email

        role
        _id
        name
        address
        phone
      }
      formName
      notes {
        noteText
        noteAuthor
        createdAt
      }
      checkboxes {
        checkboxName
        status
      }
    }
  }
`;

export const QUERY_FORM = gql`
  query form($userId: ID!, $formName: String!) {
    form(userId: $userId, formName: $formName) {
      _id
      user {
        username
        email

        role
        _id
        name
        address
        phone
      }
      formName
      notes {
        noteText
        noteAuthor
        createdAt
      }
      checkboxes {
        checkboxName
        status
      }
    }
  }
`;
