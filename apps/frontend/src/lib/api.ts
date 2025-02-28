import { type AppType } from "@monorepo/types";
import { hc } from "hono/client";

const apiClient = hc<AppType>("http://localhost:3000");

export default apiClient;
