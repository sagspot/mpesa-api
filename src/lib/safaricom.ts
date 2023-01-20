import axios from 'axios';

export const MPESA_URL = axios.create({
  baseURL: 'https://sandbox.safaricom.co.ke',
});

export async function getAccessToken() {
  const CONSUMER_KEY = process.env.CONSUMER_KEY as string;
  const CONSUMER_SECRET = process.env.CONSUMER_SECRET as string;

  if (!CONSUMER_KEY) throw { status: 400, message: 'Missing Consumer key' };
  if (!CONSUMER_SECRET)
    throw { status: 400, message: 'Missing Consumer secret' };

  const token = btoa(`${CONSUMER_KEY}:${CONSUMER_SECRET}`);
  const headers = { Authorization: `Basic ${token}` };

  try {
    const response = await MPESA_URL.get(
      '/oauth/v1/generate?grant_type=client_credentials',
      { headers }
    );
    return response.data.access_token;
  } catch (error: any) {
    throw {
      status: error.response.status,
      message: error.response.statusText,
    };
  }
}
