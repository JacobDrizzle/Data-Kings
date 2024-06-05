import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
  const tastyCookie = cookies.get('authjs.session-token');
  const crsf = cookies.get('authjs.csrf-token');
  console.log('Token:', tastyCookie);
  console.log('CRSF:', crsf);
  return {
    tastyCookie
  };
}) satisfies PageServerLoad;