import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/b2c/result', async (req: Request, res: Response) => {
  try {
    let response = req.body;

    console.log('======== success response ========: ');
    console.log(JSON.stringify(response, null, 2));

    res.send(response);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/b2c/queue', async (req: Request, res: Response) => {
  try {
    console.log('======== timeout response ========');
    console.log(JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
  } catch (error: any) {
    console.log(JSON.stringify(error, null, 2));

    res.status(500).json({ message: error.message });
  }
});

router.post('/c2b/confirmation', async (req: Request, res: Response) => {
  try {
    console.log('======== confirmation response ========');
    console.log(JSON.stringify(req.body, null, 2));
    return res.sendStatus(200);
  } catch (error: any) {
    console.log(JSON.stringify(error, null, 2));

    res.status(500).json({ message: error.message });
  }
});

router.post('/c2b/validation', async (req: Request, res: Response) => {
  try {
    console.log('======== validation response ========');
    console.log(JSON.stringify(req.body, null, 2));
    return res.json({
      ResultCode: 0,
      ResultDesc: 'Validation passed successfully',
    });
  } catch (error: any) {
    console.log(JSON.stringify(error, null, 2));

    return res.json({
      ResultCode: 1,
      ResultDesc: 'Validation failed due to internal service error',
    });
  }
});

export default router;
