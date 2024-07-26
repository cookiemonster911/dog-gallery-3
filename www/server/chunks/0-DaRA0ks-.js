import { b as buildSessionObject } from './session-DOLr7m4p.js';
import './utils-CC34fe4r.js';
import './index-DzcLzHBX.js';

async function load$1(event) {
  const __houdini__vite__plugin__return__value__ = {};
  return {
    ...event.data,
    ...__houdini__vite__plugin__return__value__
  };
}

var _layout = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load$1
});

async function load(event) {
  const __houdini__vite__plugin__return__value__ = {};
  return {
    ...buildSessionObject(event),
    ...__houdini__vite__plugin__return__value__
  };
}

var _layout_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 0;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-D6JS-gKE.js')).default;
const universal_id = "src/routes/+layout.js";
const server_id = "src/routes/+layout.server.js";
const imports = ["_app/immutable/nodes/0.DG9FCDZG.js","_app/immutable/chunks/scheduler.r5UgEgUv.js","_app/immutable/chunks/index.D2EkJ-zn.js","_app/immutable/chunks/stores.BpNdRujW.js","_app/immutable/chunks/entry.Cll5SvkE.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/chunks/session.nhK5e6A4.js"];
const stylesheets = ["_app/immutable/assets/0.BVxxFzdl.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server as server, server_id, stylesheets, _layout as universal, universal_id };
//# sourceMappingURL=0-DaRA0ks-.js.map
