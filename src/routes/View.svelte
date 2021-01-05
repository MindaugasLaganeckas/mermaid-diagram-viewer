<script>
  import View from '../components/View.svelte';
  import pkg from '@mermaid/package.json';
  export let mermaidVersion = pkg.version;
  import Tag from '../components/Tag.svelte';
</script>

<style>
  #view-page {
    display: flex;
    height: 100%;
  }
</style>

<div id="view-page">
  <View />
  <div id="power">
    Powered by mermaid
    <Tag color="green">{mermaidVersion}</Tag>
  </div>
</div>
