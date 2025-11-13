import app from "./server.ts";
import { env } from "./config/env.ts";

// Run Server
app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});
