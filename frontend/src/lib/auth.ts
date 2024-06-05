// ./src/lib/auth.ts

import { SvelteKitAuth } from "@auth/sveltekit"
import Reddit from "@auth/sveltekit/providers/reddit"
 
export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [Reddit],
}) 