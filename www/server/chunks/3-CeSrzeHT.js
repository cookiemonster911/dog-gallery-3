import { g as getCurrentConfig, i as initClient, p as parseScalar, Q as QueryStore } from './query-D5Q6wxqo.js';
import { R as RequestContext } from './session-DOLr7m4p.js';
import './utils-CC34fe4r.js';
import './index-DzcLzHBX.js';

const artifact = {
  "name": "Dog",
  "kind": "HoudiniQuery",
  "hash": "9ce78c45b71be67fc637b289dc9f43f86d6fc0a0267216510be4423bc2ae7c1a",
  "raw": `query Dog($dogId: String!) {
  dog(where: {slug: $dogId}) {
    id
    name
    department
    batch
    slug
    picture {
      url
      id
    }
    description {
      json
      references {
        __typename
        ... on Dog {
          id
          name
          slug
        }
        __typename
      }
    }
  }
}
`,
  "rootType": "Query",
  "selection": {
    "fields": {
      "dog": {
        "type": "Dog",
        "keyRaw": "dog(where: {slug: $dogId})",
        "nullable": true,
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
            },
            "description": {
              "type": "DogDescriptionRichText",
              "keyRaw": "description",
              "selection": {
                "fields": {
                  "json": {
                    "type": "RichTextAST",
                    "keyRaw": "json",
                    "visible": true
                  },
                  "references": {
                    "type": "DogDescriptionRichTextEmbeddedTypes",
                    "keyRaw": "references",
                    "selection": {
                      "abstractFields": {
                        "fields": {
                          "Dog": {
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
                            "slug": {
                              "type": "String",
                              "keyRaw": "slug",
                              "nullable": true,
                              "visible": true
                            },
                            "__typename": {
                              "type": "String",
                              "keyRaw": "__typename",
                              "visible": true
                            }
                          }
                        },
                        "typeMap": {}
                      },
                      "fields": {
                        "__typename": {
                          "type": "String",
                          "keyRaw": "__typename",
                          "visible": true
                        }
                      }
                    },
                    "abstract": true,
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
  "input": {
    "fields": {
      "dogId": "String"
    },
    "types": {},
    "defaults": {},
    "runtimeScalars": {}
  },
  "policy": "CacheOrNetwork",
  "partial": false
};
class DogStore extends QueryStore {
  constructor() {
    super({
      artifact,
      storeName: "DogStore",
      variables: true
    });
  }
}
async function load_Dog(params) {
  await initClient();
  const store = new DogStore();
  await store.fetch(params);
  return {
    Dog: store
  };
}
async function __houdini___DogVariables(config, event) {
  const result = {
    dogId: parseScalar(config, "String", event.params.dogId)
  };
  return result;
}
async function load(context) {
  const houdini_context = new RequestContext(context);
  const houdiniConfig = getCurrentConfig();
  const promises = [];
  const inputs = {};
  inputs["Dog"] = await __houdini___DogVariables(houdiniConfig, context);
  promises.push(load_Dog({
    "variables": inputs["Dog"],
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

const index = 3;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Dir97_Wt.js')).default;
const universal_id = "src/routes/dog/[dogId]/+page.js";
const imports = ["_app/immutable/nodes/3.DVNGsiKt.js","_app/immutable/chunks/query.B5fy9Kw6.js","_app/immutable/chunks/scheduler.r5UgEgUv.js","_app/immutable/chunks/session.nhK5e6A4.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/index.D2EkJ-zn.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=3-CeSrzeHT.js.map
