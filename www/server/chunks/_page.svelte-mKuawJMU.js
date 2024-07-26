import { a as subscribe, n as noop } from './utils-CC34fe4r.js';
import { c as create_ssr_component, e as escape, a as each, b as add_attribute } from './ssr-Cj2rH81Y.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let Dogs;
  let $Dogs, $$unsubscribe_Dogs = noop, $$subscribe_Dogs = () => ($$unsubscribe_Dogs(), $$unsubscribe_Dogs = subscribe(Dogs, ($$value) => $Dogs = $$value), Dogs);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$subscribe_Dogs(Dogs = data.Dogs);
  $$unsubscribe_Dogs();
  return `<div class="mt-4"><header data-svelte-h="svelte-1noe91r"><h1 class="text-center text-5xl font-bold">Dog Archieve</h1></header> <section class="mt-5 flex justify-center"><div class="text-background w-full flex-1 bg-purple-800 px-8 py-4"><p class="text-center text-2xl font-medium" data-svelte-h="svelte-1uwr2us">Total dogs:</p> <p class="text-center text-5xl font-bold">${escape($Dogs.data?.dogsConnection.aggregate.count)}</p></div></section> <section class="mt-6 grid grid-cols-4 gap-3 px-12">${each($Dogs.data?.dogs || [], (dog) => {
    return `<a href="${"/dog/" + escape(dog.slug, true)}" class="rounded shadow-md"><figure><img${add_attribute("src", dog.picture.url, 0)} alt="${"Dog - " + escape(dog.name, true)}" class="aspect-square w-full rounded-t object-cover"></figure> <section class="px-2 pb-3"><h4 class="text-3xl font-semibold leading-relaxed">${escape(dog.name)}</h4> <footer class="flex justify-between gap-x-1"><p class="text-muted-foreground text-lg">Department: <b>${escape(dog.department)}</b></p> <p class="text-muted-foreground text-right text-lg">Batch: <b>${escape(dog.batch)}</b></p> </footer></section> </a>`;
  })}</section></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-mKuawJMU.js.map
