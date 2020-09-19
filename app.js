const express = require("express");
const app = express();
const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer(app);
const mongoose = require("mongoose");
const config = require("config");
const { handleSocketConnection } = require("./socket");

const PORT = process.env.PORT || config.get("port") || 5000;
const MONGODB_URI = config.get("mongoUri");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const io = socketIO(server);
handleSocketConnection(io);

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/collections", require("./routes/collections.routes"));
app.use("/api/items", require("./routes/items.routes"));
app.use("/api/topics", require("./routes/topics.routes"));
app.use("/api/tags", require("./routes/tags.routes"));
app.use("/api/comments", require("./routes/comments.routes"));
app.use("/api/likes", require("./routes/likes.routes"));
app.use("/api/search", require("./routes/search.routes"));

const Multer = require("multer");
const { Storage } = require("@google-cloud/storage");
const path = require("path");
const { format } = require("util");

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

const storage = new Storage({
  keyFilename: path.join(
    __dirname,
    "config",
    "manage-collections-f2f3c333a7bd.json"
  ),
  projectId: "manage-collections",
});
const bucket = storage.bucket("manage-image-for-collections");

app.post("/api/googlecloud/upload", multer.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream();

  blobStream.on("error", (err) => {
    console.error(err);
  });

  blobStream.on("finish", () => {
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );
    res.status(200).send(publicUrl);
  });

  blobStream.end(req.file.buffer);
});

const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Database connected successfully");
  } catch (e) {
    throw e;
  }
};

const listenServer = () => {
  server.listen(PORT, () => {
    console.log(`Server is on port ${PORT}`);
  });
};

const start = () => {
  try {
    connectToDatabase();
    process.on("uncaughtException", () => {});
    process.on("SIGTERM", () => {});
    listenServer();
  } catch (e) {
    console.log(`Server error: ${e.message}`);
    process.exit(1);
  }
};

start();
