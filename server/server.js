const express = require("express");
const fileUpload = require("express-fileupload");
const { ApolloServer } = require("apollo-server-express");

const { graphqlUploadExpress, GraphQLUpload } = require("graphql-upload");
const { createWriteStream, existsSync, mkdirSync } = require("fs");

const path = require("path");
const { authMiddleware } = require("./utils/auth");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  uploads: false,
  typeDefs,
  resolvers,
  context: authMiddleware,
});

existsSync(path.join(__dirname, "../client/images")) ||
  mkdirSync(path.join(__dirname, "../client/images"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use(fileUpload());

app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }));
app.use("/images", express.static(path.join(__dirname, "../client/images")));

/*app.post("/uploads", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;

  file.mv(
    `/Users/matthewmckenna/Desktop/Coding Bootcamp/p3/track-my-move/client/src/assets/${file.name}`,
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    }
  );
});*/

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
