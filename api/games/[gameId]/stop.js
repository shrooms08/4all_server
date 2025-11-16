import { VorldArenaService } from '../../../src/vorldService.js';
import { buildConfig } from '../../../src/serverlessConfig.js';

export default async function handler(req, res) {
  const {
    query: { gameId },
    method
  } = req;

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res
      .status(405)
      .json({ success: false, error: 'Method not allowed' });
  }

  try {
    const service = new VorldArenaService(buildConfig());
    const result = await service.stopGame(gameId);

    if (!result?.success) {
      return res.status(result.status || 500).json(result);
    }

    return res.status(200).json({
      success: true,
      data: result.data ?? result.raw ?? null
    });
  } catch (error) {
    console.error('❌ /api/games/[gameId]/stop error:', error);
    return res
      .status(500)
      .json({ success: false, error: 'Internal server error' });
  }
}


