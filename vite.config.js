
// https://vite.dev/config/
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()); // Load .env variables

  return {
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_BASE_URL || "http://localhost:3000",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    define: {
      "import.meta.env": env, // Ensure env variables work
    },
  };
});
