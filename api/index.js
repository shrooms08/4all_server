// Simple root API handler to prevent 404
export default async function handler(req, res) {
  res.status(200).json({
    success: true,
    message: '4ALL × Vorld Arena Bridge API',
    version: '1.0.0',
    endpoints: {
      status: '/api/status',
      profile: '/api/profile',
      auth: '/api/auth?action={login|request-otp|verify-otp}',
      games: '/api/games',
      boost: '/api/boost',
      events: '/api/events',
      items: '/api/items',
      config: '/api/config'
    },
    docs: 'https://github.com/yourusername/4ALL_server'
  });
}

