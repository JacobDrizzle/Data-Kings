// ./src/routes/auth/signin/+page.server.ts
import { signIn } from "../../../lib/auth";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async (event) => {
    if (event.request.method !== 'POST') {
      // Handle only POST requests
      return;
    }

    try {
        console.log("Signin Action Called");
      return await signIn(event);
    } catch (error) {
      console.error('SignIn action error:', error);
      throw error;
    }
  },
};
