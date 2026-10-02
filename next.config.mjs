/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  // Type checking runs separately via `npm run typecheck`.
  // (`eslint` and `swcMinify` options were removed in Next.js 16 / 15.)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default config;
