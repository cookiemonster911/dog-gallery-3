import { g as getCurrentConfig, i as initClient, Q as QueryStore } from './query-D5Q6wxqo.js';
import { R as RequestContext } from './session-DOLr7m4p.js';
import './utils-CC34fe4r.js';
import './index-DzcLzHBX.js';

const artifact = {
  "name": "Dogs",
  "kind": "HoudiniQuery",
  "hash": "a14ae57a8cc109dcc5d5b58b147dc7ac00ae41054525215e1afee0ce88960a40",
  "raw": `query Dogs {
  dogs {
    id
    name
    department
    batch
    slug
    picture {
      url
      id
    }
  }
  dogsConnection {
    aggregate {
      count
    }
  }
}
`,
  "rootType": "Query",
  "selection": {
    "fields": {
      "dogs": {
        "type": "Dog",
        "keyRaw": "dogs",
        "selection": {
          "fields": {
            "id": {
              "type": "ID",
              "keyRaw": "id",
              "visible": true
            },
            "name": {
              "type": "String",
              "keyRaw": "name",
              "visible": true
            },
            "department": {
              "type": "String",
              "keyRaw": "department",
              "visible": true
            },
            "batch": {
              "type": "Int",
              "keyRaw": "batch",
              "visible": true
            },
            "slug": {
              "type": "String",
              "keyRaw": "slug",
              "nullable": true,
              "visible": true
            },
            "picture": {
              "type": "Asset",
              "keyRaw": "picture",
              "selection": {
                "fields": {
                  "url": {
                    "type": "String",
                    "keyRaw": "url",
                    "visible": true
                  },
                  "id": {
                    "type": "ID",
                    "keyRaw": "id",
                    "visible": true
                  }
                }
              },
              "visible": true
            }
          }
        },
        "visible": true
      },
      "dogsConnection": {
        "type": "DogConnection",
        "keyRaw": "dogsConnection",
        "selection": {
          "fields": {
            "aggregate": {
              "type": "Aggregate",
              "keyRaw": "aggregate",
              "selection": {
                "fields": {
                  "count": {
                    "type": "Int",
                    "keyRaw": "count",
                    "visible": true
                  }
                }
              },
              "visible": true
            }
          }
        },
        "visible": true
      }
    }
  },
  "pluginData": {
    "houdini-svelte": {}
  },
  "policy": "CacheOrNetwork",
  "partial": false
};
class DogsStore extends QueryStore {
  constructor() {
    super({
      artifact,
      storeName: "DogsStore",
      variables: false
    });
  }
}
async function load_Dogs(params) {
  await initClient();
  const store = new DogsStore();
  await store.fetch(params);
  return {
    Dogs: store
  };
}
async function load(context) {
  const houdini_context = new RequestContext(context);
  getCurrentConfig();
  const promises = [];
  const inputs = {};
  inputs["Dogs"] = {};
  promises.push(load_Dogs({
    "variables": inputs["Dogs"],
    "event": context,
    "blocking": void 0
  }));
  let result = {};
  try {
    result = Object.assign({}, ...await Promise.all(promises));
  } catch (err) {
    throw err;
  }
  return {
    ...houdini_context.returnValue,
    ...result
  };
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 2;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-mKuawJMU.js')).default;
const universal_id = "src/routes/+page.js";
const imports = ["_app/immutable/nodes/2.B6oKom14.js","_app/immutable/chunks/query.B5fy9Kw6.js","_app/immutable/chunks/scheduler.r5UgEgUv.js","_app/immutable/chunks/session.nhK5e6A4.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/index.D2EkJ-zn.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=2-DQf-oLYD.js.map
