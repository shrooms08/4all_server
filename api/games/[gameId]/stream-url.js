import { VorldArenaService } from '../../../src/vorldService.js';
import { buildConfig } from '../../../src/serverlessConfig.js';

export default async function handler(req, res) {
  const {
    query: { gameId },
    method
  } = req;

  if (method !== 'PUT') {
    res.setHeader('Allow', ['PUT']);
    return res
      .status(405)
      .json({ success: false, error: 'Method not allowed' });
  }

  const { streamUrl, oldStreamUrl } = req.body || {};

  if (!streamUrl) {
    return res
      .status(400)
      .json({ success: false, error: 'streamUrl is required' });
  }

  try {
    const service = new VorldArenaService(buildConfig());
    const result = await service.updateStreamUrl(gameId, {
      streamUrl,
      oldStreamUrl
    });

    if (!result?.success) {
      return res.status(result.status || 500).json(result);
    }

    return res.status(200).json({
      success: true,
      data: result.data ?? result.raw ?? null
    });
  } catch (error) {
    console.error('❌ /api/games/[gameId]/stream-url error:', error);
    return res
      .status(500)
      .json({ success: false, error: 'Internal server error' });
  }
}


