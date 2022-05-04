const { AuthenticationError } = require("apollo-server-express");
const { User, Form } = require("../models");
const { signToken } = require("../utils/auth");
const mongoose = require("mongoose");
const path = require("path");
const { graphqlUploadExpress, GraphQLUpload } = require("graphql-upload");
const { createWriteStream, existsSync, mkdirSync } = require("fs");
const files = [];

const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    files: async () => {
      files;
    },

    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },

    userById: async (parent, { userId }) => {
      return User.findById(userId);
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    // query form
    forms: async (parent, { userId }) => {
     
      return Form.find({ user: userId }).populate("user");
    },
    form: async (parent, { userId, formName }) => {
      return Form.findOne({ user: userId, formName }).populate("user");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, role, password }) => {
      const user = await User.create({ username, email, role, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    editUser: async (parent, { name, address, phone, image }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { name: name, address: address, phone: phone, image: image } }
        );

        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    uploadFile: async (_, { file }) => {
      const { createReadStream, filename } = await file;

      await new Promise((res) =>
        createReadStream()
          .pipe(
            createWriteStream(
              path.join(__dirname, "../../client/images", filename)
            )
          )
          .on("error", (fooErr) => console.error(fooErr.message))
          .on("close", res)
      );

      files.push(filename);

      return filename;
    },

    addForm: async (parent, { userId, form }) => {
      form.user = mongoose.Types.ObjectId(userId);
      const result = await Form.create(form);
      return result;
    },

    // addForm: async (parent, { userId, form }, context) => {
    //   if (context.user && context.user._id === userId) {
    //     form.user = mongoose.Types.ObjectId(userId);
    //     const result = await Form.create(form);
    //     return result;
    //   }
    //   throw new AuthenticationError("You need to be logged in!");
    // },
  },
};

module.exports = resolvers;
