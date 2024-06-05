import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import axios from 'axios';

export const get: RequestHandler = async ({ request }) => {
  const token = request.headers.get('Authorization')?.split(' ')[1];
  if (!token) {
    return json({ error: 'No token provided' }, { status: 400 });
  }

  try {
    const response = await axios.get('https://oauth.reddit.com/api/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return json(response.data);
  } catch (error) {
    return json({ error: 'Error fetching user data' }, { status: 500 });
  }
};
