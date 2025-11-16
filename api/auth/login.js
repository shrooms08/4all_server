import { VorldArenaService } from '../../src/vorldService.js';
import { buildConfig } from '../../src/serverlessConfig.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res
      .status(405)
      .json({ success: false, error: 'Method not allowed' });
  }

  const { email, password } = req.body || {};

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, error: 'email and password are required' });
  }

  try {
    const config = buildConfig();
    const service = new VorldArenaService(config);

    const result = await service.login(email, password);

    if (!result?.success) {
      const status = result?.status || 500;
      return res.status(status).json({
        success: false,
        error: result?.error || 'Login failed',
        details: result?.details || undefined
      });
    }

    return res.status(200).json({
      success: true,
      data: result.data ?? result.raw ?? null
    });
  } catch (error) {
    console.error('❌ /api/auth/login error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}


