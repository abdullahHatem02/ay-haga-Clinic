const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const bodyParser = require("body-parser");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const dotenv = require("dotenv");
const socketIO = require('socket.io');
dotenv.config({ path: "./config.env" });
const path = require("path");

// Start express app
const app = express();
const adminRouter = require("./routes/adminRoutes.js");
const doctorRouter = require("./routes/doctorRoutes.js");
const patientRouter = require("./routes/patientRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const exampleRouter = require("./routes/exampleRoutes.js");
const familyMembersRouter = require("./routes/familyMembersRoutes.js");
const healthPackagesRouter = require("./routes/healthPackagesRoutes.js");
const appointmentRouter = require("./routes/appointmentRoutes.js");
const paymentController = require("./controllers/paymentController.js");
const prescriptionRouter = require("./routes/prescriptionRoutes.js");
const chatRouter = require ("./routes/chatRoutes.js");
const messageRouter = require ("./routes/messageRoutes.js");

app.enable("trust proxy");

app.enable("trust proxy");

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});


// Socket.io logic
io.on('connection', (socket) => {
  socket.emit('me', socket.id);

  socket.on('disconnect', () => {
    socket.broadcast.emit('callEnded');
  });

  socket.on('callUser', (data) => {
    io.to(data.userToCall).emit('callUser', {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on('answerCall', (data) => {
    io.to(data.to).emit('callAccepted', data.signal);
  });
});

//////////////////// SECOND SOCKET IMPLEMENTATION FOR CHAT


const ioChat = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ['GET', 'POST'],
  },
}).of('/chat');


let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

ioChat.on("connection", (socket) => {
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    ioChat.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    ioChat.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    ioChat.emit("getUsers", users);
  });
});

// 1) GLOBAL MIDDLEWARES
// app.use(cors());

// app.options('*', cors());
app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next(); // Do nothing with the body because I need it in a raw state.
  } else {
    express.json()(req, res, next); // ONLY do express.json() if the received request is NOT a WebHook from Stripe.
  }
});

app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  paymentController.webhookCheckout
);

var corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.options('*', cors());

// Set secure HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
if (process.env.NODE_ENV === "production") {
  app.use("/api", limiter);
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use(compression());

//Please use the following format when adding new routers, this means that any request begining with this route  /api/v1/exampleRouter after the domain will be handled by the handlers of routes inside this router
app.use("/api/v1/example", exampleRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/doctor", doctorRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/patient", patientRouter);
app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/v1/familyMembers", familyMembersRouter);
app.use("/api/v1/healthPackages", healthPackagesRouter);
app.use("/api/v1/prescriptions", prescriptionRouter);
app.use("/api/v1/chats", chatRouter);
app.use("/api/v1/messages", messageRouter);

//404 Error , YOU MUST PUT YOUR ROUTERS ABOVE THAT COMMENT
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
