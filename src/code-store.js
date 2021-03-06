import { writable, get } from 'svelte/store';
// import mermaid from '@mermaid-js/mermaid';
import mermaid from '@mermaid';
import { Base64 } from 'js-base64';
import { push, pop, replace } from 'svelte-spa-router';

export const codeStore = writable({});
export const fromUrl = (data) => {
  let code;
  let state;
  const isDarkMode =
    window.matchMedia('(prefers-color-scheme: dark)').matches && false;
  try {
    let stateStr = Base64.decode(data);
    console.log('state from url', stateStr);
    state = JSON.parse(stateStr);

    if (state.code === undefined) {
      // not valid json
      //      state = { code: '', mermaid: { theme: themeFromUrl } }
    }
    code = state.code;
  } catch (e) {
    // console.error('Init error', e);
    code = `graph TD
  A[Christmas] -->|Get money| B(Go shopping)
  B --> C{Let me think}
  C -->|One| D[Laptop]
  C -->|Two| E[iPhone]
  C -->|Three| F[fa:fa-car Car]
		`;
    state = { code, mermaid: { theme: isDarkMode ? 'dark' : 'default' } };
  }

  codeStore.set(state);
};
export const updateCodeStore = (newState) => {
  codeStore.set(newState);
  replace('/view/' + Base64.encodeURI(JSON.stringify(newState)));
};
export const updateCode = (code, updateEditor) => {
  const state = get(codeStore);
  state.code = code;
  state.updateEditor = updateEditor;
  codeStore.set(state);
};
export const updateConfig = (config) => {
  const state = get(codeStore);
  state.mermaid = config;
  codeStore.set(state);
};

const unsubscribe = codeStore.subscribe((state) => {
  replace('/view/' + Base64.encodeURI(JSON.stringify(state)));
});
