import { createRouter } from "@/lib/create-app";
import { createRoute, z } from "@hono/zod-openapi";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import packageJson from "../../package.json";

const router = createRouter()
  .openapi(
    createRoute({
      tags: ["System"],
      method: "get",
      path: "/",
      description: "API root endpoint",
      summary: "Get API information",
      operationId: "getApiInfo",
      responses: {
        [Number(StatusCodes.OK)]: {
          description: "API information",
          content: {
            "application/json": {
              schema: z.object({
                message: z.string(),
                version: z.string(),
                environment: z.string(),
              }),
            },
          },
        },
      },
    }),
    (c) => {
      return c.json(
        {
          message: "API Service",
          version: packageJson.version,
          environment: c.env.NODE_ENV,
        },
        StatusCodes.OK,
      );
    },
  )
  .openapi(
    createRoute({
      tags: ["Monitoring"],
      method: "get",
      path: "/health",
      description: "Check API health status",
      summary: "Health check endpoint",
      operationId: "getHealthStatus",
      responses: {
        [Number(StatusCodes.OK)]: {
          description: "Health status",
          content: {
            "application/json": {
              schema: z.object({
                status: z.string(),
              }),
            },
          },
        },
      },
    }),
    (c) => {
      return c.json({ status: ReasonPhrases.OK }, StatusCodes.OK);
    },
  )
  .openapi(
    createRoute({
      tags: ["Debug"],
      description: "Trigger a deliberate error for testing",
      summary: "Error test endpoint",
      operationId: "testError",
      method: "get",
      path: "/error",
      responses: {
        [Number(StatusCodes.INTERNAL_SERVER_ERROR)]: {
          description: "Demonstration error response",
          content: {
            "application/json": {
              schema: z.object({
                message: z.string(),
                stack: z.string().optional(),
              }),
            },
          },
        },
      },
    }),
    () => {
      throw new Error("This throws an error");
    },
  )
  .openapi(
    createRoute({
      tags: ["Testing"],
      method: "post",
      path: "/echo/:id",
      description:
        "Echo back the received JSON payload with ID from path and query parameters",
      summary: "Test POST endpoint with path and query parameters",
      operationId: "testPostWithIdAndQuery",
      request: {
        params: z.object({
          id: z.string().openapi({
            param: {
              name: "id",
              in: "path",
              required: true,
            },
            description: "ID from path",
            example: "42",
          }),
        }),
        query: z.object({
          sort: z
            .string()
            .optional()
            .openapi({
              param: {
                name: "sort",
                in: "query",
                required: false,
              },
              description: "Optional sort parameter",
              example: "asc",
            }),
        }),
        body: {
          content: {
            "application/json": {
              schema: z.object({
                message: z.string().min(1).describe("Message to echo"),
                timestamp: z
                  .number()
                  .optional()
                  .describe("Optional client timestamp"),
                data: z.any().optional().describe("Any additional data"),
              }),
              example: {
                message: "Hello, world!",
                timestamp: Date.now(),
                data: { foo: "bar" },
              },
            },
          },
        },
      },
      responses: {
        [Number(StatusCodes.OK)]: {
          description: "Echoed response",
          content: {
            "application/json": {
              schema: z.object({
                success: z.boolean(),
                id: z.string(),
                query: z.record(z.string()).optional(),
                serverTimestamp: z.number(),
                received: z.object({
                  message: z.string(),
                  timestamp: z.number().optional(),
                  data: z.any().optional(),
                }),
              }),
              example: {
                success: true,
                id: "42",
                query: { sort: "asc" },
                serverTimestamp: Date.now(),
                received: {
                  message: "Hello, world!",
                  timestamp: Date.now(),
                  data: { foo: "bar" },
                },
              },
            },
          },
        },
        [Number(StatusCodes.UNPROCESSABLE_ENTITY)]: {
          description: "Invalid request body",
          content: {
            "application/json": {
              schema: z.object({
                success: z.literal(false),
                error: z.any(),
              }),
            },
          },
        },
      },
    }),
    (c) => {
      const id = c.req.param("id");
      const query = c.req.query();
      const body = c.req.valid("json");

      return c.json(
        {
          id,
          query,
          received: body,
          serverTimestamp: Date.now(),
          success: true,
        },
        StatusCodes.OK,
      );
    },
  );

export default router;
