import { VorldArenaService } from '../../src/vorldService.js';
import { buildConfig } from '../../src/serverlessConfig.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res
      .status(405)
      .json({ success: false, error: 'Method not allowed' });
  }

  const ackPayload = req.body || {};

  try {
    const config = buildConfig();
    const service = new VorldArenaService(config);

    const result = await service.acknowledgeEvent(ackPayload);

    if (!result?.success) {
      const status = result?.status || 500;
      return res.status(status).json({
        success: false,
        error: result?.error || 'Failed to acknowledge event',
        details: result?.details || undefined
      });
    }

    return res.status(200).json({
      success: true,
      data: result.data ?? result.raw ?? null
    });
  } catch (error) {
    console.error('❌ /api/events/ack error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}

