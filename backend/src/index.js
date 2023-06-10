import cors from "cors";
import express from "express";
import morgan from "morgan";
import { connect } from "./db/connect.js";
import { notFound } from "./middleware/not-found.js";
import { authRouter } from "./routes/users.js";
import { firstStepRouter } from "./routes/process/firstStep.js";
import { Server } from "socket.io";
import nodeEvents from "./nodeEvents/nodeEvents.js";
import { siteContentRouter } from "./routes/site-content/siteContent.js";
import { customerRouter } from "./routes/customers/customers.js";
import { profileRouter } from "./routes/profile/profile.js";
import { productRouter } from "./routes/product/product.js";
import { blogRouter } from "./routes/blog/blog.js";
import { pendingPostsRouter } from "./routes/blog/pendingPosts.js";
import bodyParser from "body-parser";
import { portfolioRouter } from "./routes/portfolio/portfolio.js";
// Start the cron job
const app = express();

//once app starts: connect to db: and fill the roles collection
connect().catch((e) => {
  console.log(e);
});

//middlewares:
app.use("/uploads", express.static("uploads"));
app.use(express.static("public"));
app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//routes:
app.use("/api/auth", authRouter);
app.use("/api/firstStep", firstStepRouter);
app.use("/api/site-content", siteContentRouter);
app.use("/api/customer", customerRouter);
app.use("/api/profile", profileRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/blog", pendingPostsRouter);
app.use("/api/portfolio", portfolioRouter);

//404:
app.use(notFound);

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () =>
  console.log(`HTTP server running on port ${PORT}`)
);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  },
});

nodeEvents.on("update", () => {
  io.emit("update");
});
nodeEvents.on("product", () => {
  io.emit("product");
});
nodeEvents.on("blog", () => {
  io.emit("blog");
});
nodeEvents.on("user", () => {
  io.emit("user");
});
nodeEvents.on("siteContent", () => {
  io.emit("siteContent");
});
nodeEvents.on("customers", () => {
  io.emit("customers");
});
nodeEvents.on("portfolio-update", () => {
  io.emit("portfolio-update");
});
