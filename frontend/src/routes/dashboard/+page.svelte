<script lang="ts">
    import { onMount } from 'svelte';
    import axios from 'axios';
    import { parse } from 'cookie';
    import { page } from '$app/stores';
    import type { PageData } from './$types';

    interface UserData {
      id: string;
      name: string;
      // Add more fields as needed
    }
    export let data: PageData;
    let userData: UserData | null = null;
  
    onMount(async () => {
      if (data.tastyCookie) {
          try {
            const response = await axios.get('https://oauth.reddit.com/api/v1/me', {
      headers: {
        Authorization: `Bearer ${data.tastyCookie}`
      }
    });
                userData = response.data;
                console.log('Requesting Data:', userData);
            } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    });
  
    const sellData = async () => {
      if (userData) {
        try {
          const response = await axios.post('/api/sell-data', userData);
          console.log('Data sold:', response.data);
        } catch (error) {
          console.error('Error selling data:', error);
        }
      }
    };
  </script>
  
  <div>
    <h1>{$page.data.session?.user?.name} Dashboard</h1>
    {#if userData}
      <pre>{JSON.stringify(userData, null, 2)}</pre>
      <button on:click={sellData}>Sell My Data</button>
    {/if}
  </div>
  