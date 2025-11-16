import dotenv from 'dotenv';

// Load environment variables once for the serverless environment
dotenv.config();

/**
 * Build configuration object for Vorld services in a serverless context.
 * Unlike the CLI/index entrypoint, this does NOT exit the process if
 * variables are missing; individual handlers should surface errors instead.
 */
export function buildConfig() {
  return {
    vorldAppId: process.env.VORLD_APP_ID,
    arenaGameId: process.env.ARENA_GAME_ID,
    userToken: process.env.USER_TOKEN,
    streamUrl: process.env.STREAM_URL,
    arenaServerUrl:
      process.env.ARENA_SERVER_URL ||
      'wss://airdrop-arcade.onrender.com/ws/arcade_mhcg6dxr_19395e5c',
    gameApiUrl:
      process.env.GAME_API_URL || 'https://airdrop-arcade.onrender.com',
    authApiUrl:
      process.env.AUTH_API_URL || 'https://vorld-auth.onrender.com/api'
  };
}


