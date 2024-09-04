import { Hono } from "hono";
import { userRoute } from "./routes/user-route";
import { uniRoute } from "./routes/uni-route";

const app = new Hono();

app.get("/", async (c) => {
  return c.json({
    message: "Worker is up",
  });
});

app.route("/api/v1/user/", userRoute);
app.route("/api/v1/uni/", uniRoute);

export default app;
