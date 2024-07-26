import { c as create_ssr_component } from './ssr-Cj2rH81Y.js';
import { p as page } from './stores-DjoEeL-K.js';
import { s as setClientSession, e as extractSession } from './session-DOLr7m4p.js';
import './index-DzcLzHBX.js';
import './utils-CC34fe4r.js';
import './exports-BGi7-Rnc.js';

const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  page.subscribe((val) => {
    setClientSession(extractSession(val.data));
  });
  return `<main class="mx-auto max-w-7xl">${slots.default ? slots.default({}) : ``}</main>`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-D6JS-gKE.js.map
