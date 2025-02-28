import createApp from "@/lib/create-app";
import openAPI from "@/lib/open-api";
import indexRoute from "@/routes/index";

const app = createApp().route("/", indexRoute);

openAPI(app);

export type AppType = typeof app;
export default app;
