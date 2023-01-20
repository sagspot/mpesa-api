import express, { Request, Response } from 'express';
import { getAccessToken, MPESA_URL } from '../../lib/safaricom';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await getAccessToken()}`,
    };

    const data = {
      ShortCode: 600426,
      CommandID: 'CustomerBuyGoodsOnline',
      Amount: 1,
      Msisdn: 254708374149,
      BillRefNumber: 'null',
    };

    const response = await MPESA_URL.post('/mpesa/c2b/v1/simulate', data, {
      headers,
    });
    console.log('result data =>>>>:', response?.data);

    res.json(response.data);
  } catch (error: any) {
    res.status(error.status || error.response.status || 500).json({
      message: error.response?.data?.errorMessage || error.message,
    });
  }
});

export default router;
