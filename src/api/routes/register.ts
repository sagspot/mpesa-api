import express, { Request, Response } from 'express';
import { getAccessToken, MPESA_URL } from '../../lib/safaricom';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const SERVER_URL = process.env.SERVER_URL;
    if (!SERVER_URL)
      return res.status(400).json({ message: 'Missing Server url' });

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await getAccessToken()}`,
    };
    const data = {
      ShortCode: 600426,
      ResponseType: 'Completed',
      ConfirmationURL: `${SERVER_URL}/api/callbacks/c2b/confirmation`,
      ValidationURL: `${SERVER_URL}/api/callbacks/c2b/validation`,
    };

    const response = await MPESA_URL.post('/mpesa/c2b/v1/registerurl', data, {
      headers,
    });

    console.log('urls:', response.data);

    res.json(response.data);
  } catch (error: any) {
    res.status(error.status || error.response.status || 500).json({
      message: error.response.data.errorMessage || error.message,
    });
  }
});

export default router;
