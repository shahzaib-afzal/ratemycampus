import { Hono } from "hono";
import { userRoute } from "./routes/user-route";
import { uniRoute } from "./routes/uni-route";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
  "/api/*",
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/", async (c) => {
  return c.text("Worker 1.1 is live");
});

app.route("/api/v1/user/", userRoute);
app.route("/api/v1/uni/", uniRoute);

export default app;
