import { Hono } from "hono";
import { userRoute } from "./routes/user-router";

const app = new Hono();

app.get("/", async (c) => {
  return c.json({
    message: "Worker is up",
  });
});

app.route("/api/v1/user/", userRoute);

export default app;
