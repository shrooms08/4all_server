import { VorldArenaService } from '../src/vorldService.js';
import { buildConfig } from '../src/serverlessConfig.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res
      .status(405)
      .json({ success: false, error: 'Method not allowed' });
  }

  try {
    const service = new VorldArenaService(buildConfig());
    return res.status(200).json({
      success: true,
      data: {
        connected: service.isConnected(),
        gameState: service.getGameState()
      }
    });
  } catch (error) {
    console.error('❌ /api/status error:', error);
    return res
      .status(500)
      .json({ success: false, error: 'Internal server error' });
  }
}


