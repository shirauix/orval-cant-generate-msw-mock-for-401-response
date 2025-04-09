import { defineConfig } from "orval";

export default defineConfig({
  compass: {
    input: {
      target: "src/schema/login-api.yaml",
      filters: {
        mode: "include",
        tags: ["user"],
      },
    },
    output: {
      target: "index.ts",
      client: "react-query",
      httpClient: "axios",
      schemas: "schemas",
      workspace: "dist",
      mock: {
        type: "msw",
        generateEachHttpStatus: true,
        indexMockFiles: true,
      },
    },
  },
});
