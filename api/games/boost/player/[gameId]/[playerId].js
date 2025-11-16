import { VorldArenaService } from '../../../../../src/vorldService.js';
import { buildConfig } from '../../../../../src/serverlessConfig.js';

export default async function handler(req, res) {
  const {
    query: { gameId, playerId },
    method
  } = req;

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res
      .status(405)
      .json({ success: false, error: 'Method not allowed' });
  }

  const { amount, username } = req.body || {};
  const boostAmount = Number(amount);

  if (!gameId || !playerId) {
    return res
      .status(400)
      .json({ success: false, error: 'gameId and playerId are required' });
  }

  if (!username || Number.isNaN(boostAmount)) {
    return res
      .status(400)
      .json({
        success: false,
        error: 'username and numeric amount are required'
      });
  }

  try {
    const config = buildConfig();
    const service = new VorldArenaService(config);

    const result = await service.boostPlayer(gameId, playerId, {
      amount: boostAmount,
      username
    });

    if (!result?.success) {
      const status = result?.status || 500;
      return res.status(status).json({
        success: false,
        error: result?.error || 'Failed to boost player',
        details: result?.details || undefined
      });
    }

    return res.status(200).json({
      success: true,
      data: result.data ?? result.raw ?? null
    });
  } catch (error) {
    console.error('❌ /api/games/boost/player error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}

