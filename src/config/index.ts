import { IConfig } from "./types";

const config: IConfig = {
  server: {
    api_url: import.meta.env.VITE_BACKEND_URL || "",
    token_name: import.meta.env.VITE_PUBLIC_TOKEN_NAME || "",
    token_refresh_name: import.meta.env.VITE_PUBLIC_TOKEN_REFRESH_NAME || "",
    google_client_id: import.meta.env.VITE_PUBLIC_GOOGLE_CLIENT_ID || "",
  },
};

export default config;
