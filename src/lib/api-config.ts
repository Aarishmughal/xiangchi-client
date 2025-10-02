// API Configuration utility
export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_URL,
    ENDPOINTS: {
        AUTH: {
            LOGIN: "/auth/login",
            SIGNUP: "/auth/signup",
            LOGOUT: "/auth/logout",
            REFRESH: "/auth/refresh-token",
        },
        USER: {
            PROFILE: "/user/me",
            UPDATE: "/user/update",
        },
        GAME: {
            CREATE: "/game/create",
            JOIN: "/game/join",
            MOVE: "/game/move",
        },
    },
    TIMEOUT: 10000, // 10 seconds
} as const;

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Validate that the API URL is configured
if (!import.meta.env.VITE_API_URL) {
    console.warn("⚠️ VITE_API_URL is not set");
    console.warn("💡 Create a .env file with VITE_API_URL=your-api-url");
}
