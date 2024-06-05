<script lang="ts">

    export let data: any;
    
    </script>
  
  <div class="index-page">

  </div>
  
  <style lang="scss">
    @import '../../styles/media-queries.scss';
  
    .index-page {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
      grid-column-gap: 2rem;
      grid-row-gap: 0.5rem;
      padding: 1rem;
      width: 95vw;
      margin: 0 auto;
  
      @include tablet-down {
        padding: 0;
      }
    }
  </style>