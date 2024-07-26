import { a as subscribe } from './utils-CC34fe4r.js';
import { c as create_ssr_component, e as escape } from './ssr-Cj2rH81Y.js';
import { p as page } from './stores-DjoEeL-K.js';
import './exports-BGi7-Rnc.js';

const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<h1>${escape($page.status)}</h1> <p>${escape($page.error?.message)}</p>`;
});

export { Error as default };
//# sourceMappingURL=error.svelte-DuTDjoYV.js.map
