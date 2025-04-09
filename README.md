# Orval Mock Generation Issue Reproduction

This repository demonstrates a potential issue with [Orval](https://orval.dev/) when generating mock handlers using `mock.type = "msw"` and `generateEachHttpStatus = true`.

## 🐛 Problem

When using the following configuration:

- `mock.type: "msw"`
    - https://orval.dev/reference/configuration/output#type
- `mock.generateEachHttpStatus: true`
    - https://orval.dev/reference/configuration/output#generateeachhttpstatus

and the OpenAPI schema defines multiple responses (e.g., `200`, `400`, `401`) for a single endpoint, **Orval does not generate a mock handler for the `401` response**.

## 📁 Schema Overview

The OpenAPI schema located at `src/schema/login-api.yaml` defines the `/user/login` endpoint with the following responses:

- `200 OK`
- `400 Bad Request`
- `401 Unauthorized`

However, after running the Orval build, only the following mock handlers are generated in `dist/index.ts`:

- `getLoginMockHandler()` (default)
- `getLoginMockHandler200()`
- `getLoginMockHandler400()`

🚫 **`getLoginMockHandler401()` is missing.**

## 📦 Dependencies

```json
"devDependencies": {
  "@faker-js/faker": "9.6.0",
  "msw": "2.7.3",
  "orval": "7.8.0"
},
"dependencies": {
  "axios": "1.7.9"
}
```

## ▶️ How to Reproduce

1. Clone this repository
2. Run `npm install`
3. Run `npm run build`
4. Check the generated file at `dist/index.ts`
5. Observe that `getLoginMockHandler401()` is not present

## 📝 Notes

* This issue may be specific to certain status codes or schema structures.
* If `generateEachHttpStatus` is set to false, only the default mock handler is generated as expected.

## 💬 Expected Behavior

When `generateEachHttpStatus` is set to `true`, mock handlers for all defined status codes (200, 400, 401, etc.) should be generated.