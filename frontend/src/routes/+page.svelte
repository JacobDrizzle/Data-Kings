<script lang="ts">
  
    import { onMount } from 'svelte';
    import { config } from '../store/Store';
    import Loading from '../components/Loading.svelte';
    import Heading from '../components/Heading.svelte';
    import D3Voronoi from '../helpers/voronoi';


    const { routeLinks } = config;
    const homePageLinks = routeLinks.filter((rl) => rl.route !== '/');
  
    let showLoader = false;
  
    onMount(() => {
      try { new D3Voronoi(); }
      catch (e) { console.warn('D3Voronoi failed to load', e); }
    });
  
    const findRouteColor = (route: string) => {
      return routeLinks?.find((r) => r.route === route)?.color || 'var(--accent)';
    };
  </script>
  
  <main class="homepage">
    <div id="vonoroi"></div>
    <div class="hero">
      <Heading
        level="h1"
        commandStyle={false}
        blinkCursor={true}
        size="4rem"
        color="var(--home-accent-background)">Data-Kings</Heading
      >
    </div>
  
    {#if showLoader}
      <Loading message="Pre-fetching Posts" />
    {/if}
  
    {#if !showLoader}
      <div class="tiles">
        {#each homePageLinks as navLink}
          <a
            class="tile"
            href={navLink.route}
            style={`--accent: ${findRouteColor(navLink.route)};`}
            on:click={() => {
              showLoader = true;
            }}
          >
            <Heading level="h3" size="2rem" color="var(--home-accent-foreground)"
              >{navLink.label}</Heading
            >
            <p class="subtitle">{navLink.description}</p>
          </a>
        {/each}
      </div>
    {/if}
  </main>
  
  
  <style lang="scss">
    @import '../styles/media-queries.scss';
    @import '../styles/voronoi.scss';
  
    :global(html) {
      scroll-behavior: smooth;
    }
  
    *:not(canvas) {
      z-index: 1;
    }
  
    main.homepage {
      min-height: 99vh;
      position: relative;
    }
  
    .hero {
      text-align: center;
      pointer-events: none;
      // background: var(--card-background);
      // border-bottom: var(--card-border);
      min-height: 30vh;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  
    .tiles {
      display: grid;
      grid-auto-flow: dense;
      max-width: 70rem;
      margin: auto;
      padding: 1rem;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 1rem;
      width: 80vw;
      @include tablet-down {
        display: flex;
        flex-direction: column;
      }
      a.tile {
        color: var(--foreground);
        border: var(--card-border);
        background: var(--home-tile-background); // var(--card-background);
        border-radius: 4px;
        text-decoration: none;
        padding: 1rem;
        border-left: 4px solid var(--accent);
        transition: all ease-in-out 0.25s, transform ease-in-out 0.3s;
        overflow: hidden;
        pointer-events: all;
  
        p.subtitle {
          position: absolute;
          color: var(--dimmed-text);
          margin: 0;
          transform: translateX(-20rem) translateY(2rem) scale(0.5) rotate(5deg);
          transition: all ease-in-out 0.2s;
          opacity: 0;
        }
  
        &:hover {
          :global(h3) {
            color: var(--accent);
            transform: translateY(-1rem);
          }
          border-left-width: 8px;
          transform: scale(1.02);
          p.subtitle {
            transform: translateX(0) translateY(-1.5rem) scale(1) rotate(0);
            opacity: 1;
          }
        }
      }
    }
  </style>