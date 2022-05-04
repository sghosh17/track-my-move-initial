import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $role: String!
    $password: String!
  ) {
    addUser(
      username: $username
      email: $email
      role: $role
      password: $password
    ) {
      token
      user {
        _id
        username
        role
      }
    }
  }
`;

export const EDIT_USER = gql`
  mutation editUser(
    $name: String!
    $address: String!
    $phone: String!
    $image: String!
  ) {
    editUser(name: $name, address: $address, phone: $phone, image: $image) {
      _id
      username
      email
      role
      name
      address
      phone
      image
    }
  }
`;

export const ADD_FORM = gql`
  mutation addForm($userId: ID, $form: InputForm) {
    addForm(userId: $userId, form: $form) {
      _id
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

export const uploadFileMutation = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;
