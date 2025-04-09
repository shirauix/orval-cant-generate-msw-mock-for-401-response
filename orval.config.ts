import { defineConfig } from "orval";

export default defineConfig({
  compass: {
    input: {
      target: "src/schema/login-api.yaml",
    },
    output: {
      target: "index.ts",
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
