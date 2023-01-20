import express, { Request, Response } from 'express';
import { getAccessToken, MPESA_URL } from '../../lib/safaricom';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  /**
   * Default Sandbox values
   * PartyB: 254708374149
   */
  try {
    const SERVER_URL = process.env.SERVER_URL;
    if (!SERVER_URL)
      return res.status(400).json({ message: 'Missing Server url' });
    if (!req.body.amount)
      return res.status(400).json({ message: 'Amount is required' });
    if (!req.body.tel)
      return res.status(400).json({ message: 'Tel is required' });

    const data = {
      InitiatorName: 'testapi',
      SecurityCredential: process.env.SECURITY_CREDENTIAl as string,
      CommandID: 'BusinessPayment',
      Amount: req.body.amount,
      PartyA: 600584,
      PartyB: req.body.tel,
      Remarks: 'Test remarks',
      QueueTimeOutURL: `${SERVER_URL}/api/callbacks/b2c/queue`,
      ResultURL: `${SERVER_URL}/api/callbacks/b2c/result`,
      Occassion: 'Sample occasion',
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await getAccessToken()}`,
    };

    const result = await MPESA_URL.post('/mpesa/b2c/v1/paymentrequest', data, {
      headers,
    });

    console.log('result data =>>>>:', result?.data);

    res.json(result.data);
  } catch (err: any) {
    res.status(err.status || 500).json(err.response.data || err.message);
  }
});

export default router;
