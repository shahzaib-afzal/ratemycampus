import { Hono } from "hono";
import { userRoute } from "./routes/user-route";
import { uniRoute } from "./routes/uni-route";

const app = new Hono();

app.get("/", async (c) => {
  return c.text("Worker 1.0 (Test) is live");
});

app.route("/api/v1/user/", userRoute);
app.route("/api/v1/uni/", uniRoute);

export default app;
