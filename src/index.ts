import app from "./server";
import { env } from "./config/env";

// Run Server
app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});
