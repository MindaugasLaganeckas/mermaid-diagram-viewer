<script>
  import { onMount } from 'svelte';
  import mermaid from '@mermaid';

  // manual debounce
  let timeout;
  let element;
  let container;
  onMount(async () => {
    element = document.querySelector('graph-div');
  });

  let insertSvg = function (svgCode, bindFunctions) {
    // element.innerHTML = svgCode;
  };

  export let code = '';
  export let mermaidConfig = '';
  export let configClasses = '';
  export let codeClasses = '';
  function handleClick() {
    code = `graph TD
              A[Christmas] -->|Get money| B(Go shopping)
              B --> C{Let me think}
              C -->|One| D[Laptop]
              C -->|Two| E[iPhone]
              C -->|Three| F[fa:fa-car Car]
                `;

    // mermaid.parse(code)
    // Replacing special characters '<' and '>' with encoded '&lt;' and '&gt;'
    let _code = code;
    _code = _code.replace(/</g, '&lt;');
    _code = _code.replace(/>/g, '&gt;');

    container.innerHTML = _code;
    delete container.dataset.processed;
    mermaidConfig = 'default';
    mermaid.initialize(Object.assign({}, mermaidConfig));
    mermaid.init(undefined, container);
    if (code) mermaid.render('graph-div', code, insertSvg);
  }
</script>

<style>
  #view {
    border: 1px solor darkred;
    flex: 1;
  }
  #container {
    overflow-x: auto;
  }
  .error {
    opacity: 0.5;
  }
</style>

<div id="view" class="{codeClasses} {configClasses}">
  <button on:click={handleClick} name="Press me" />
  <div id="container" bind:this={container} />
</div>
