import { g as get_store_value } from './utils-CC34fe4r.js';
import { g as getSession, c as clientStarted } from './session-DOLr7m4p.js';
import './index-DzcLzHBX.js';

const config = {
  watchSchema: {
    url: "https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clz2n75bk008j07uwx0xt97ft/master"
  },
  plugins: {
    "houdini-svelte": {}
  },
  scalars: {
    RichTextAST: {
      // <- The GraphQL Scalar
      type: "RichTextAST"
      // <-  The TypeScript type
    }
  }
};
const configs = [];
var pluginConfig_default = configs;
function defaultConfigValues(file) {
  return {
    defaultKeys: ["id"],
    ...file,
    types: {
      Node: {
        keys: ["id"],
        resolve: {
          queryField: "node",
          arguments: (node) => ({ id: node.id })
        }
      },
      ...file.types
    }
  };
}
function keyFieldsForType(configFile, type) {
  const withDefault = defaultConfigValues(configFile);
  return withDefault.types?.[type]?.keys || withDefault.defaultKeys;
}
function computeID(configFile, type, data) {
  const fields = keyFieldsForType(configFile, type);
  let id = "";
  for (const field of fields) {
    id += data[field] + "__";
  }
  return id.slice(0, -2);
}
let _configFile = null;
function localApiEndpoint(configFile) {
  return configFile.router?.apiEndpoint ?? "/_api";
}
function getCurrentConfig() {
  if (_configFile) {
    return _configFile;
  }
  let configFile = defaultConfigValues(config);
  for (const pluginConfig of pluginConfig_default) {
    configFile = pluginConfig(configFile);
  }
  _configFile = configFile;
  return configFile;
}
function colorize(message) {
  const matches = [...message.matchAll(/\$HOUDINI\$(\w*\$)?/g)];
  if (matches.length === 0) {
    return [message];
  }
  let final = message.replaceAll(/\$HOUDINI\$(\w*\$)?/g, "%c");
  let colors = [];
  for (const match of matches) {
    const color = match[1] ? `color:${match[1].slice(0, -1)}` : "";
    colors.push(color);
  }
  return [final, ...colors];
}
function error(message) {
  console.error(...colorize(message));
}
function info(message) {
  console.log(...colorize(message));
}
function red(message) {
  return wrapMessage("red", message);
}
function yellow(message) {
  return wrapMessage("yellow", message);
}
const tag = `$HOUDINI$`;
const wrapMessage = (color, message) => {
  return tag + `${color}$` + message + tag;
};
const CachePolicy = {
  CacheOrNetwork: "CacheOrNetwork",
  CacheOnly: "CacheOnly",
  NetworkOnly: "NetworkOnly",
  CacheAndNetwork: "CacheAndNetwork",
  NoCache: "NoCache"
};
const ArtifactKind = {
  Query: "HoudiniQuery",
  Subscription: "HoudiniSubscription",
  Mutation: "HoudiniMutation",
  Fragment: "HoudiniFragment"
};
const CompiledQueryKind = ArtifactKind.Query;
const DataSource = {
  Cache: "cache",
  Network: "network",
  Ssr: "ssr"
};
const fragmentKey = " $fragments";
const PendingValue = Symbol("houdini_loading");
let client = null;
async function initClient() {
  if (client) {
    return client;
  }
  client = (await import('./client-CiZ49gpb.js')).default;
  return client;
}
function getClient() {
  if (!client) {
    throw new Error("client hasn't been initialized");
  }
  return client;
}
function deepEquals(objA, objB, map = /* @__PURE__ */ new WeakMap()) {
  if (Object.is(objA, objB))
    return true;
  if (objA instanceof Date && objB instanceof Date) {
    return objA.getTime() === objB.getTime();
  }
  if (objA instanceof RegExp && objB instanceof RegExp) {
    return objA.toString() === objB.toString();
  }
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }
  if (map.get(objA) === objB)
    return true;
  map.set(objA, objB);
  const keysA = Reflect.ownKeys(objA);
  const keysB = Reflect.ownKeys(objB);
  if (keysA.length !== keysB.length) {
    return false;
  }
  for (let i = 0; i < keysA.length; i++) {
    if (!Reflect.has(objB, keysA[i]) || !deepEquals(objA[keysA[i]], objB[keysA[i]], map)) {
      return false;
    }
  }
  return true;
}
function getFieldsForType(selection, __typename, loading) {
  if (loading) {
    if (selection.loadingTypes && selection.loadingTypes.length > 0) {
      return deepMerge(
        ...selection.loadingTypes.map((type) => selection.abstractFields?.fields[type])
      );
    }
    return selection.fields ?? {};
  }
  let targetSelection = selection.fields || {};
  if (selection.abstractFields && __typename) {
    const mappedType = selection.abstractFields.typeMap[__typename];
    if (mappedType) {
      targetSelection = selection.abstractFields.fields[mappedType];
    } else if (selection.abstractFields.fields[__typename]) {
      targetSelection = selection.abstractFields.fields[__typename];
    }
  }
  return targetSelection;
}
function deepMerge(...objects) {
  const mergedObj = {};
  for (let obj of objects) {
    if (!obj) {
      continue;
    }
    for (let prop in obj) {
      if (prop in obj) {
        const val = obj[prop];
        if (typeof val === "object" && val !== null && !Array.isArray(val)) {
          mergedObj[prop] = deepMerge(mergedObj[prop] || {}, val);
        } else {
          mergedObj[prop] = val;
        }
      }
    }
  }
  return mergedObj;
}
function marshalSelection({
  selection,
  data
}) {
  const config2 = getCurrentConfig();
  if (data === null || typeof data === "undefined") {
    return data;
  }
  if (Array.isArray(data)) {
    return data.map((val) => marshalSelection({ selection, data: val }));
  }
  const targetSelection = getFieldsForType(selection, data["__typename"], false);
  return Object.fromEntries(
    Object.entries(data).map(([fieldName, value]) => {
      if (fieldName === fragmentKey) {
        return [fieldName, value];
      }
      const { type, selection: selection2 } = targetSelection[fieldName];
      if (!type) {
        return [fieldName, value];
      }
      if (selection2) {
        return [fieldName, marshalSelection({ selection: selection2, data: value })];
      }
      if (config2.scalars?.[type]) {
        const marshalFn = config2.scalars[type].marshal;
        if (!marshalFn) {
          throw new Error(
            `Scalar type ${type} is missing a \`marshal\` function. See https://houdinigraphql.com/api/config#custom-scalars for help on configuring custom scalars.`
          );
        }
        if (Array.isArray(value)) {
          return [fieldName, value.map(marshalFn)];
        }
        return [fieldName, marshalFn(value)];
      }
      return [fieldName, value];
    })
  );
}
function marshalInputs({
  artifact,
  input,
  config: config2,
  rootType = "@root"
}) {
  if (input === null || typeof input === "undefined") {
    return input;
  }
  if (!artifact.input) {
    return input;
  }
  const fields = rootType === "@root" ? artifact.input.fields : artifact.input.types[rootType];
  if (Array.isArray(input)) {
    return input.map((val) => marshalInputs({ artifact, input: val, rootType, config: config2 }));
  }
  return Object.fromEntries(
    Object.entries(input).map(([fieldName, value]) => {
      const type = fields?.[fieldName];
      if (!type) {
        return [fieldName, value];
      }
      const marshalFn = config2.scalars?.[type]?.marshal;
      if (marshalFn) {
        if (Array.isArray(value)) {
          return [fieldName, value.map(marshalFn)];
        }
        return [fieldName, marshalFn(value)];
      }
      if (isScalar(config2, type) || !artifact.input.types[type]) {
        return [fieldName, value];
      }
      return [fieldName, marshalInputs({ artifact, input: value, rootType: type, config: config2 })];
    })
  );
}
function isScalar(config2, type) {
  return ["String", "Boolean", "Float", "ID", "Int"].concat(Object.keys(config2.scalars || {})).includes(type);
}
function parseScalar(config2, type, value) {
  if (typeof value === "undefined") {
    return void 0;
  }
  {
    return value;
  }
}
const subscriber_queue = [];
const noop = () => {
};
class Writable {
  state;
  #subscribers;
  #stop;
  #start;
  constructor(value, start = noop) {
    this.state = value;
    this.#subscribers = /* @__PURE__ */ new Set();
    this.#stop = null;
    this.#start = start;
  }
  set(new_value) {
    if (safe_not_equal(this.state, new_value)) {
      this.state = new_value;
      if (this.#stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of this.#subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, this.state);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  update(fn) {
    this.set(fn(this.state));
  }
  subscribe(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    this.#subscribers.add(subscriber);
    if (this.#subscribers.size === 1) {
      this.#stop = this.#start(this.set) || noop;
    }
    run(this.state);
    return () => {
      this.#subscribers.delete(subscriber);
      if (this.#subscribers.size === 0) {
        this.#stop?.();
        this.#stop = null;
      }
    };
  }
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
}
const computeKey = ({ field, args }) => {
  const keys = Object.keys(args ?? {});
  keys.sort();
  return args && keys.length > 0 ? `${field}(${keys.map((key) => `${key}: ${stringifyObjectWithNoQuotesOnKeys(args[key])}`).join(", ")})` : field;
};
const stringifyObjectWithNoQuotesOnKeys = (obj_from_json) => {
  if (Array.isArray(obj_from_json)) {
    return `[${obj_from_json.map((obj) => `${stringifyObjectWithNoQuotesOnKeys(obj)}`).join(", ")}]`;
  }
  if (typeof obj_from_json !== "object" || obj_from_json instanceof Date || obj_from_json === null) {
    return JSON.stringify(obj_from_json).replace(/"([^"]+)":/g, "$1: ");
  }
  return `{${Object.keys(obj_from_json).map((key) => `${key}: ${stringifyObjectWithNoQuotesOnKeys(obj_from_json[key])}`).join(", ")}}`;
};
function flatten(source) {
  if (!source) {
    return [];
  }
  return source.reduce((acc, element) => {
    if (!element) {
      return acc;
    }
    if (Array.isArray(element)) {
      return acc.concat(flatten(element));
    }
    return acc.concat(element);
  }, []);
}
class GarbageCollector {
  cache;
  lifetimes = /* @__PURE__ */ new Map();
  get cacheBufferSize() {
    return this.cache._internal_unstable.config.cacheBufferSize ?? 10;
  }
  constructor(cache) {
    this.cache = cache;
  }
  reset() {
    this.lifetimes.clear();
  }
  resetLifetime(id, field) {
    if (!this.lifetimes.get(id)) {
      this.lifetimes.set(id, /* @__PURE__ */ new Map());
    }
    this.lifetimes.get(id).set(field, 0);
  }
  tick() {
    const dt_tick = Date.now().valueOf();
    const config_max_time = this.cache._internal_unstable.config.defaultLifetime;
    for (const [id, fieldMap] of this.lifetimes.entries()) {
      for (const [field, lifetime] of fieldMap.entries()) {
        if (this.cache._internal_unstable.subscriptions.get(id, field).length > 0) {
          continue;
        }
        fieldMap.set(field, lifetime + 1);
        if (fieldMap.get(field) > this.cacheBufferSize) {
          this.cache._internal_unstable.storage.deleteField(id, field);
          this.cache._internal_unstable.lists.deleteField(id, field);
          fieldMap.delete(field);
          if ([...fieldMap.keys()].length === 0) {
            this.lifetimes.delete(id);
          }
          this.cache._internal_unstable.staleManager.delete(id, field);
        }
        if (config_max_time && config_max_time > 0) {
          const dt_valueOf = this.cache.getFieldTime(id, field);
          if (dt_valueOf && dt_tick - dt_valueOf > config_max_time) {
            this.cache._internal_unstable.staleManager.markFieldStale(id, field);
          }
        }
      }
    }
  }
}
class ListManager {
  rootID;
  cache;
  constructor(cache, rootID2) {
    this.rootID = rootID2;
    this.cache = cache;
  }
  lists = /* @__PURE__ */ new Map();
  listsByField = /* @__PURE__ */ new Map();
  get(listName, id, allLists) {
    const matches = this.lists.get(listName);
    if (!matches || matches.size === 0) {
      return null;
    }
    if (allLists) {
      return new ListCollection(
        Array.from(matches, ([key, value]) => [...value.lists]).flat()
      );
    }
    const head = [...matches.values()][0];
    const { recordType } = head.lists[0];
    const parentID = id ? this.cache._internal_unstable.id(recordType || "", id) : this.rootID;
    if (matches?.size === 1) {
      if (!id) {
        return head;
      }
      return parentID === Array.from(matches.keys())[0] ? head : null;
    }
    if (!id) {
      console.error(
        `Found multiple instances of "${listName}". Please provide one of @parentID or @allLists directives to help identify which list you want modify. For more information, visit this guide: https://www.houdinigraphql.com/api/graphql#parentidvalue-string `
      );
      return null;
    }
    return this.lists.get(listName)?.get(parentID);
  }
  remove(listName, id) {
    this.lists.get(listName)?.delete(id || this.rootID);
  }
  add(list) {
    if (!this.lists.has(list.name)) {
      this.lists.set(list.name, /* @__PURE__ */ new Map());
    }
    const name = list.name;
    const parentID = list.recordID || this.rootID;
    if (this.lists.get(name)?.get(parentID)?.includes(list.key)) {
      return;
    }
    if (!this.lists.has(name)) {
      this.lists.set(name, /* @__PURE__ */ new Map());
    }
    if (!this.lists.get(name).has(parentID)) {
      this.lists.get(name).set(parentID, new ListCollection([]));
    }
    if (!this.listsByField.has(parentID)) {
      this.listsByField.set(parentID, /* @__PURE__ */ new Map());
    }
    if (!this.listsByField.get(parentID).has(list.key)) {
      this.listsByField.get(parentID)?.set(list.key, []);
    }
    const handler = new List({ ...list, manager: this });
    this.lists.get(list.name).get(parentID).lists.push(handler);
    this.listsByField.get(parentID).get(list.key).push(handler);
  }
  removeIDFromAllLists(id, layer) {
    for (const fieldMap of this.lists.values()) {
      for (const list of fieldMap.values()) {
        list.removeID(id, void 0, layer);
      }
    }
  }
  deleteField(parentID, field) {
    if (!this.listsByField.get(parentID)?.has(field)) {
      return;
    }
    for (const list of this.listsByField.get(parentID).get(field)) {
      this.lists.get(list.name)?.get(list.recordID)?.deleteListWithKey(field);
      if (this.lists.get(list.name)?.get(list.recordID)?.lists.length === 0) {
        this.lists.get(list.name)?.delete(list.recordID);
      }
    }
    this.listsByField.get(parentID).delete(field);
  }
  reset() {
    this.lists.clear();
    this.listsByField.clear();
  }
}
class List {
  recordID;
  recordType;
  key;
  type;
  cache;
  selection;
  _when;
  filters;
  name;
  connection;
  manager;
  abstract;
  constructor({
    name,
    recordID,
    recordType,
    key,
    listType,
    selection,
    when,
    filters,
    connection,
    manager,
    abstract
  }) {
    this.recordID = recordID || rootID;
    this.recordType = recordType;
    this.key = key;
    this.type = listType;
    this.cache = manager.cache;
    this.selection = selection;
    this._when = when;
    this.filters = filters;
    this.name = name;
    this.connection = connection;
    this.manager = manager;
    this.abstract = abstract;
  }
  when(when) {
    return this.manager.lists.get(this.name).get(this.recordID).when(when);
  }
  append({
    selection,
    data,
    variables = {},
    layer
  }) {
    return this.addToList(selection, data, variables, "last", layer);
  }
  prepend({
    selection,
    data,
    variables = {},
    layer
  }) {
    return this.addToList(selection, data, variables, "first", layer);
  }
  addToList(selection, data, variables = {}, where, layer) {
    const listType = this.listType(data);
    const dataID = this.cache._internal_unstable.id(listType, data);
    if (!this.validateWhen() || !dataID) {
      return;
    }
    let insertSelection = selection;
    let insertData = data;
    if (this.connection) {
      insertSelection = {
        fields: {
          newEntry: {
            keyRaw: this.key,
            type: "Connection",
            selection: {
              fields: {
                edges: {
                  keyRaw: "edges",
                  type: "ConnectionEdge",
                  updates: ["append", "prepend"],
                  selection: {
                    fields: {
                      __typename: {
                        keyRaw: "__typename",
                        type: "String"
                      },
                      node: {
                        type: listType,
                        keyRaw: "node",
                        selection: {
                          ...selection,
                          fields: {
                            ...selection.fields,
                            __typename: {
                              keyRaw: "__typename",
                              type: "String"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      };
      insertData = {
        newEntry: {
          edges: [
            {
              __typename: listType + "Edge",
              node: {
                ...data,
                __typename: listType
              }
            }
          ]
        }
      };
    } else {
      insertSelection = {
        fields: {
          newEntries: {
            keyRaw: this.key,
            type: listType,
            updates: ["append", "prepend"],
            selection: {
              ...selection,
              fields: {
                ...selection.fields,
                __typename: {
                  keyRaw: "__typename",
                  type: "String"
                }
              }
            }
          }
        }
      };
      insertData = {
        newEntries: [{ ...data, __typename: listType }]
      };
    }
    this.cache.write({
      selection: insertSelection,
      data: insertData,
      variables,
      parent: this.recordID,
      applyUpdates: [where === "first" ? "prepend" : "append"],
      layer: layer?.id
    });
  }
  removeID(id, variables = {}, layer) {
    if (!this.validateWhen()) {
      return;
    }
    let parentID = this.recordID;
    let targetID = id;
    let targetKey = this.key;
    if (this.connection) {
      const { value: embeddedConnection } = this.cache._internal_unstable.storage.get(
        this.recordID,
        this.key
      );
      if (!embeddedConnection) {
        return;
      }
      const embeddedConnectionID = embeddedConnection;
      const { value: edges } = this.cache._internal_unstable.storage.get(
        embeddedConnectionID,
        "edges"
      );
      for (const edge of flatten(edges) || []) {
        if (!edge) {
          continue;
        }
        const edgeID = edge;
        const { value: nodeID } = this.cache._internal_unstable.storage.get(edgeID, "node");
        if (!nodeID) {
          continue;
        }
        if (nodeID === id) {
          targetID = edgeID;
        }
      }
      parentID = embeddedConnectionID;
      targetKey = "edges";
    }
    let value = this.cache._internal_unstable.storage.get(parentID, targetKey).value;
    if (!value || !value.includes(targetID)) {
      return;
    }
    const subscribers = this.cache._internal_unstable.subscriptions.get(this.recordID, this.key);
    this.cache._internal_unstable.subscriptions.remove(
      targetID,
      this.connection ? this.selection.fields.edges.selection : this.selection,
      subscribers.map((sub) => sub[0]),
      variables
    );
    this.cache._internal_unstable.storage.remove(parentID, targetKey, targetID, layer);
    for (const [spec] of subscribers) {
      spec.set(
        this.cache._internal_unstable.getSelection({
          parent: spec.parentID || this.manager.rootID,
          selection: spec.selection,
          variables: spec.variables?.() || {},
          ignoreMasking: false
        }).data
      );
    }
    return true;
  }
  remove(data, variables = {}, layer) {
    const targetID = this.cache._internal_unstable.id(this.listType(data), data);
    if (!targetID) {
      return;
    }
    return this.removeID(targetID, variables, layer);
  }
  listType(data) {
    return data.__typename || this.type;
  }
  validateWhen(when) {
    let filters = when || this._when;
    let ok = true;
    if (filters) {
      const targets = this.filters;
      if (filters.must && targets) {
        ok = Object.entries(filters.must).reduce(
          (prev, [key, value]) => Boolean(prev && targets[key] == value),
          ok
        );
      }
      if (filters.must_not) {
        ok = !targets || Object.entries(filters.must_not).reduce(
          (prev, [key, value]) => Boolean(prev && targets[key] != value),
          ok
        );
      }
    }
    return ok;
  }
  toggleElement({
    selection,
    data,
    variables = {},
    layer,
    where
  }) {
    if (!this.remove(data, variables, layer)) {
      this.addToList(selection, data, variables, where, layer);
    }
  }
  *[Symbol.iterator]() {
    let entries = [];
    let value = this.cache._internal_unstable.storage.get(this.recordID, this.key).value;
    if (!this.connection) {
      entries = flatten(value);
    } else {
      entries = this.cache._internal_unstable.storage.get(value, "edges").value;
    }
    for (let record of entries) {
      yield record;
    }
  }
}
class ListCollection {
  lists = [];
  constructor(lists) {
    this.lists = lists;
  }
  get selection() {
    return this.lists[0].selection;
  }
  append(...args) {
    this.lists.forEach((list) => list.append(...args));
  }
  prepend(...args) {
    this.lists.forEach((list) => list.prepend(...args));
  }
  addToList(...args) {
    this.lists.forEach((list) => list.addToList(...args));
  }
  removeID(...args) {
    this.lists.forEach((list) => list.removeID(...args));
  }
  remove(...args) {
    this.lists.forEach((list) => list.remove(...args));
  }
  toggleElement(...args) {
    this.lists.forEach((list) => list.toggleElement(...args));
  }
  when(when) {
    return new ListCollection(
      this.lists.filter((list) => {
        return list.validateWhen(when);
      })
    );
  }
  includes(key) {
    return !!this.lists.find((list) => list.key === key);
  }
  deleteListWithKey(key) {
    return this.lists = this.lists.filter((list) => list.key !== key);
  }
  *[Symbol.iterator]() {
    for (let list of this.lists) {
      for (const entry of list) {
        yield entry;
      }
    }
  }
}
class StaleManager {
  cache;
  fieldsTime = /* @__PURE__ */ new Map();
  constructor(cache) {
    this.cache = cache;
  }
  #initMapId = (id) => {
    if (!this.fieldsTime.get(id)) {
      this.fieldsTime.set(id, /* @__PURE__ */ new Map());
    }
  };
  getFieldTime(id, field) {
    return this.fieldsTime.get(id)?.get(field);
  }
  setFieldTimeToNow(id, field) {
    this.#initMapId(id);
    this.fieldsTime.get(id)?.set(field, (/* @__PURE__ */ new Date()).valueOf());
  }
  markFieldStale(id, field) {
    this.#initMapId(id);
    this.fieldsTime.get(id)?.set(field, null);
  }
  markAllStale() {
    for (const [id, fieldMap] of this.fieldsTime.entries()) {
      for (const [field] of fieldMap.entries()) {
        this.markFieldStale(id, field);
      }
    }
  }
  markRecordStale(id) {
    const fieldsTimeOfType = this.fieldsTime.get(id);
    if (fieldsTimeOfType) {
      for (const [field] of fieldsTimeOfType.entries()) {
        this.markFieldStale(id, field);
      }
    }
  }
  markTypeStale(type) {
    for (const [id, fieldMap] of this.fieldsTime.entries()) {
      if (id.startsWith(`${type}:`)) {
        for (const [field] of fieldMap.entries()) {
          this.markFieldStale(id, field);
        }
      }
    }
  }
  markTypeFieldStale(type, field, when) {
    const key = computeKey({ field, args: when });
    for (const [id, fieldMap] of this.fieldsTime.entries()) {
      if (id.startsWith(`${type}:`)) {
        for (const local_field of fieldMap.keys()) {
          if (local_field === key) {
            this.markFieldStale(id, field);
          }
        }
      }
    }
  }
  delete(id, field) {
    if (this.fieldsTime.has(id)) {
      this.fieldsTime.get(id)?.delete(field);
      if (this.fieldsTime.get(id)?.size === 0) {
        this.fieldsTime.delete(id);
      }
    }
  }
  reset() {
    this.fieldsTime.clear();
  }
}
class InMemoryStorage {
  data;
  idCount = 1;
  rank = 0;
  idMaps = {};
  constructor() {
    this.data = [];
  }
  get layerCount() {
    return this.data.length;
  }
  get nextRank() {
    return this.rank++;
  }
  registerIDMapping(from, to) {
    this.idMaps[from] = to;
  }
  createLayer(optimistic = false) {
    const layer = new Layer(this.idCount++);
    layer.optimistic = optimistic;
    this.data.push(layer);
    return layer;
  }
  insert(id, field, location, target) {
    return this.topLayer.insert(id, field, location, target);
  }
  remove(id, field, target, layerToUser = this.topLayer) {
    return layerToUser.remove(id, field, target);
  }
  delete(id, layerToUser = this.topLayer) {
    return layerToUser.delete(id);
  }
  deleteField(id, field) {
    return this.topLayer.deleteField(id, field);
  }
  getLayer(id) {
    for (const layer of this.data) {
      if (layer.id === id) {
        return layer;
      }
    }
    throw new Error("Could not find layer with id: " + id);
  }
  replaceID(replacement) {
    for (const layer of this.data) {
      layer.replaceID(replacement);
    }
  }
  get(targetID, field, defaultValue) {
    const operations = {
      [OperationKind.insert]: {
        [OperationLocation.start]: [],
        [OperationLocation.end]: []
      },
      [OperationKind.remove]: /* @__PURE__ */ new Set()
    };
    const layerIDs = [];
    const recordIDs = [this.idMaps[targetID], targetID].filter(Boolean);
    for (let i = this.data.length - 1; i >= 0; i--) {
      for (const id of recordIDs) {
        const layer = this.data[i];
        let [layerValue, kind] = layer.get(id, field);
        const layerOperations = layer.getOperations(id, field) || [];
        layer.deletedIDs.forEach((v) => {
          if (layer.operations[v]?.undoDeletesInList?.includes(field)) {
            return;
          }
          operations.remove.add(v);
        });
        if (typeof layerValue === "undefined" && defaultValue) {
          const targetLayer = this.topLayer;
          targetLayer.writeField(id, field, defaultValue);
          layerValue = defaultValue;
        }
        if (typeof layerValue === "undefined" && layerOperations.length === 0) {
          if (layer.deletedIDs.size > 0) {
            layerIDs.push(layer.id);
          }
          continue;
        }
        if (typeof layerValue !== "undefined" && !Array.isArray(layerValue)) {
          return {
            value: layerValue,
            kind,
            displayLayers: [layer.id]
          };
        }
        layerIDs.push(layer.id);
        if (layerOperations.length > 0) {
          for (const op of layerOperations) {
            if (isRemoveOperation(op)) {
              operations.remove.add(op.id);
            }
            if (isInsertOperation(op)) {
              operations.insert[op.location].unshift(op.id);
            }
            if (isDeleteOperation(op)) {
              return {
                value: void 0,
                kind: "unknown",
                displayLayers: []
              };
            }
          }
        }
        if (typeof layerValue === "undefined") {
          continue;
        }
        if (!operations.remove.size && !operations.insert.start.length && !operations.insert.end.length) {
          return { value: layerValue, displayLayers: layerIDs, kind: "link" };
        }
        return {
          value: [
            ...operations.insert.start,
            ...layerValue,
            ...operations.insert.end
          ].filter((value) => !operations.remove.has(value)),
          displayLayers: layerIDs,
          kind
        };
      }
    }
    return {
      value: void 0,
      kind: "unknown",
      displayLayers: []
    };
  }
  writeLink(id, field, value) {
    return this.topLayer.writeLink(id, field, value);
  }
  writeField(id, field, value) {
    return this.topLayer.writeField(id, field, value);
  }
  resolveLayer(id) {
    let startingIndex = null;
    for (const [index, layer] of this.data.entries()) {
      if (layer.id !== id) {
        continue;
      }
      startingIndex = index - 1;
      this.data[index].optimistic = false;
      break;
    }
    if (startingIndex === null) {
      throw new Error("could not find layer with id: " + id);
    }
    if (startingIndex === -1) {
      startingIndex = 0;
    }
    if (this.data[startingIndex].optimistic) {
      startingIndex++;
    }
    const baseLayer = this.data[startingIndex];
    let layerIndex = startingIndex;
    while (layerIndex < this.data.length) {
      const layer = this.data[layerIndex++];
      if (layer.optimistic) {
        layerIndex--;
        break;
      }
      baseLayer.writeLayer(layer);
    }
    this.data.splice(startingIndex + 1, layerIndex - startingIndex - 1);
    if (this.data.length === 1) {
      this.idMaps = {};
    }
  }
  get topLayer() {
    if (this.data.length === 0) {
      this.createLayer();
    }
    if (this.data[this.data.length - 1]?.optimistic) {
      this.createLayer();
    }
    return this.data[this.data.length - 1];
  }
  serialize() {
    return JSON.stringify({
      rank: this.rank,
      fields: Object.fromEntries(
        Object.entries(this.topLayer.fields).map(([id, fieldMap]) => [
          id,
          Object.fromEntries(
            Object.entries(fieldMap).filter(([_, value]) => typeof value !== "function")
          )
        ])
      ),
      links: this.topLayer.links
    });
  }
  hydrate(args, layer) {
    if (!args) {
      return;
    }
    const { rank, fields, links } = args;
    this.rank = rank;
    layer ??= this.createLayer(true);
    layer.fields = fields;
    layer.links = links;
  }
  reset() {
    this.data = [];
  }
}
class Layer {
  id;
  optimistic = false;
  fields = {};
  links = {};
  operations = {};
  deletedIDs = /* @__PURE__ */ new Set();
  constructor(id) {
    this.id = id;
  }
  get(id, field) {
    if (typeof this.links[id]?.[field] !== "undefined") {
      return [this.links[id][field], "link"];
    }
    return [this.fields[id]?.[field], "scalar"];
  }
  getOperations(id, field) {
    if (this.operations[id]?.deleted) {
      return [
        {
          kind: OperationKind.delete,
          target: id
        }
      ];
    }
    if (this.operations[id]?.fields?.[field]) {
      return this.operations[id].fields[field];
    }
  }
  writeField(id, field, value) {
    this.fields[id] = {
      ...this.fields[id],
      [field]: value
    };
    return this.id;
  }
  writeLink(id, field, value) {
    const valueList = Array.isArray(value) ? value : [value];
    for (const value2 of flatten(valueList)) {
      if (!value2) {
        continue;
      }
      const fieldOperations = this.operations[id]?.fields[field];
      if (this.operations[value2]?.deleted || this.deletedIDs.has(value2)) {
        this.operations[value2] = {
          ...this.operations[value2],
          undoDeletesInList: [...this.operations[id]?.undoDeletesInList || [], field]
        };
      } else if (value2 && fieldOperations?.length > 0) {
        this.operations[id].fields[field] = fieldOperations.filter(
          (op) => op.kind !== "remove" || op.id !== value2
        );
      }
    }
    this.links[id] = {
      ...this.links[id],
      [field]: value
    };
    return this.id;
  }
  isDisplayLayer(displayLayers) {
    return displayLayers.length === 0 || displayLayers.includes(this.id) || Math.max(...displayLayers) < this.id;
  }
  clear() {
    this.links = {};
    this.fields = {};
    this.operations = {};
    this.deletedIDs = /* @__PURE__ */ new Set();
  }
  replaceID({ from, to }) {
    this.fields[to] = this.fields[from];
    this.links[to] = this.links[from];
    this.operations[to] = this.operations[from] || { fields: {} };
    if (this.deletedIDs.has(from)) {
      this.deletedIDs.add(to);
    }
  }
  removeUndefinedFields() {
    for (const [id, fields] of Object.entries(this.fields)) {
      for (const [field, value] of Object.entries(fields)) {
        if (typeof value === "undefined") {
          try {
            delete this.fields[id][field];
          } catch {
          }
          try {
            delete this.links[id][field];
          } catch {
          }
        }
      }
      if (Object.keys(fields || {}).length === 0) {
        delete this.fields[id];
      }
      if (Object.keys(this.links[id] || {}).length === 0) {
        delete this.links[id];
      }
    }
  }
  delete(id) {
    this.operations = {
      ...this.operations,
      [id]: {
        ...this.operations[id],
        deleted: true,
        undoDeletesInList: []
      }
    };
    this.deletedIDs.add(id);
  }
  deleteField(id, field) {
    this.fields[id] = {
      ...this.fields[id],
      [field]: void 0
    };
  }
  insert(id, field, where, target) {
    this.addFieldOperation(id, field, {
      kind: OperationKind.insert,
      id: target,
      location: where
    });
  }
  remove(id, field, target) {
    this.addFieldOperation(id, field, {
      kind: OperationKind.remove,
      id: target
    });
  }
  writeLayer(layer) {
    if (layer.id === this.id) {
      return;
    }
    for (const [id, ops] of Object.entries(layer.operations)) {
      const fields = {};
      for (const opMap of [this.operations[id], layer.operations[id]].filter(Boolean)) {
        for (const [fieldName, operations] of Object.entries(opMap.fields || {})) {
          fields[fieldName] = [...fields[fieldName] || [], ...operations];
        }
      }
      if (Object.keys(fields).length > 0) {
        this.operations[id] = {
          ...this.operations[id],
          fields
        };
      }
      if (ops?.deleted) {
        delete this.fields[id];
        delete this.links[id];
      }
    }
    for (const [id, values] of Object.entries(layer.fields)) {
      if (!values) {
        continue;
      }
      for (const [field, value] of Object.entries(values)) {
        this.writeField(id, field, value);
      }
    }
    for (const [id, values] of Object.entries(layer.links)) {
      if (!values) {
        continue;
      }
      for (const [field, value] of Object.entries(values)) {
        this.writeLink(id, field, value);
      }
    }
    layer.deletedIDs.forEach((v) => this.deletedIDs.add(v));
  }
  addFieldOperation(id, field, operation) {
    this.operations = {
      ...this.operations,
      [id]: {
        ...this.operations[id],
        fields: {
          [field]: [...this.operations[id]?.fields[field] || [], operation]
        }
      }
    };
  }
}
function isDeleteOperation(value) {
  return !!value && value.kind === OperationKind.delete;
}
function isInsertOperation(value) {
  return !!value && value.kind === OperationKind.insert;
}
function isRemoveOperation(value) {
  return !!value && value.kind === OperationKind.remove;
}
const OperationLocation = {
  start: "start",
  end: "end"
};
const OperationKind = {
  delete: "delete",
  insert: "insert",
  remove: "remove"
};
function evaluateKey(key, variables = null) {
  let evaluated = "";
  let varName = "";
  let inString = false;
  for (const char of key) {
    if (varName) {
      if (varChars.includes(char)) {
        varName += char;
        continue;
      }
      const value = variables?.[varName.slice(1)];
      evaluated += typeof value !== "undefined" ? JSON.stringify(value) : "undefined";
      varName = "";
    }
    if (char === "$" && !inString) {
      varName = "$";
      continue;
    }
    if (char === '"') {
      inString = !inString;
    }
    evaluated += char;
  }
  return evaluated;
}
const varChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789";
class InMemorySubscriptions {
  cache;
  constructor(cache) {
    this.cache = cache;
  }
  subscribers = /* @__PURE__ */ new Map();
  keyVersions = {};
  activeFields(parent) {
    return Object.keys(this.subscribers.get(parent) || {});
  }
  add({
    parent,
    spec,
    selection,
    variables,
    parentType
  }) {
    const __typename = this.cache._internal_unstable.storage.get(parent, "__typename").value;
    let targetSelection = getFieldsForType(selection, __typename, false);
    for (const fieldSelection of Object.values(targetSelection || {})) {
      const {
        keyRaw,
        selection: innerSelection,
        type,
        list,
        filters,
        visible
      } = fieldSelection;
      if (!visible) {
        continue;
      }
      const key = evaluateKey(keyRaw, variables);
      let targetSelection2;
      if (innerSelection) {
        const __typename2 = this.cache._internal_unstable.storage.get(parent, "__typename").value;
        targetSelection2 = getFieldsForType(innerSelection, __typename2, false);
      }
      this.addFieldSubscription({
        id: parent,
        key,
        selection: [spec, targetSelection2],
        type
      });
      if (list) {
        this.registerList({
          list,
          filters,
          id: parent,
          key,
          variables,
          selection: innerSelection,
          parentType: parentType || spec.rootType
        });
      }
      if (innerSelection) {
        const { value: linkedRecord } = this.cache._internal_unstable.storage.get(
          parent,
          key
        );
        let children = !Array.isArray(linkedRecord) ? [linkedRecord] : flatten(linkedRecord) || [];
        for (const child of children) {
          if (!child) {
            continue;
          }
          this.add({
            parent: child,
            spec,
            selection: innerSelection,
            variables,
            parentType: type
          });
        }
      }
    }
  }
  addFieldSubscription({
    id,
    key,
    selection,
    type
  }) {
    const spec = selection[0];
    if (!this.subscribers.has(id)) {
      this.subscribers.set(id, /* @__PURE__ */ new Map());
    }
    const subscriber = this.subscribers.get(id);
    if (!subscriber.has(key)) {
      subscriber.set(key, {
        selections: [],
        referenceCounts: /* @__PURE__ */ new Map()
      });
    }
    const subscriberField = subscriber.get(key);
    if (!this.keyVersions[key]) {
      this.keyVersions[key] = /* @__PURE__ */ new Set();
    }
    this.keyVersions[key].add(key);
    if (!subscriberField.selections.some(([{ set }]) => set === spec.set)) {
      subscriberField.selections.push([spec, selection[1]]);
    }
    subscriberField.referenceCounts.set(
      spec.set,
      (subscriberField.referenceCounts.get(spec.set) || 0) + 1
    );
    this.cache._internal_unstable.lifetimes.resetLifetime(id, key);
  }
  registerList({
    list,
    id,
    key,
    parentType,
    selection,
    filters,
    variables
  }) {
    this.cache._internal_unstable.lists.add({
      name: list.name,
      connection: list.connection,
      recordID: id,
      recordType: this.cache._internal_unstable.storage.get(id, "__typename")?.value || parentType,
      listType: list.type,
      key,
      selection,
      filters: Object.entries(filters || {}).reduce((acc, [key2, { kind, value }]) => {
        return {
          ...acc,
          [key2]: kind !== "Variable" ? value : variables[value]
        };
      }, {})
    });
  }
  addMany({
    parent,
    variables,
    subscribers,
    parentType
  }) {
    for (const [spec, targetSelection] of subscribers) {
      for (const selection of Object.values(targetSelection ?? {})) {
        const {
          type: linkedType,
          keyRaw,
          selection: innerSelection,
          list,
          filters
        } = selection;
        const key = evaluateKey(keyRaw, variables);
        const fieldSelection = innerSelection ? getFieldsForType(innerSelection, parentType, false) : void 0;
        this.addFieldSubscription({
          id: parent,
          key,
          selection: [spec, fieldSelection],
          type: linkedType
        });
        if (list) {
          this.registerList({
            list,
            filters,
            id: parent,
            key,
            variables,
            selection: innerSelection,
            parentType: parentType || spec.rootType
          });
        }
        const childSelection = selection.selection;
        if (childSelection) {
          const { value: link } = this.cache._internal_unstable.storage.get(parent, key);
          const children = !Array.isArray(link) ? [link] : flatten(link);
          for (const linkedRecord of children) {
            if (!linkedRecord) {
              continue;
            }
            const __typename = this.cache._internal_unstable.storage.get(
              linkedRecord,
              "__typename"
            ).value;
            let targetSelection2 = getFieldsForType(childSelection, __typename, false);
            this.addMany({
              parent: linkedRecord,
              variables,
              subscribers: subscribers.map(([sub]) => [sub, targetSelection2]),
              parentType: linkedType
            });
          }
        }
      }
    }
  }
  get(id, field) {
    return this.subscribers.get(id)?.get(field)?.selections || [];
  }
  remove(id, selection, targets, variables, visited = []) {
    visited.push(id);
    const linkedIDs = [];
    const __typename = this.cache._internal_unstable.storage.get(id, "__typename").value;
    let targetSelection = getFieldsForType(selection, __typename, false);
    for (const fieldSelection of Object.values(targetSelection || {})) {
      const key = evaluateKey(fieldSelection.keyRaw, variables);
      this.removeSubscribers(id, key, targets);
      if (!fieldSelection.selection) {
        continue;
      }
      const { value: previousValue } = this.cache._internal_unstable.storage.get(id, key);
      const links = !Array.isArray(previousValue) ? [previousValue] : flatten(previousValue);
      for (const link of links) {
        if (link !== null) {
          linkedIDs.push([link, fieldSelection.selection || {}]);
        }
      }
    }
    for (const [linkedRecordID, linkFields] of linkedIDs) {
      this.remove(linkedRecordID, linkFields, targets, visited);
    }
  }
  reset() {
    const subscribers = [...this.subscribers.entries()].filter(([id]) => !id.startsWith(rootID));
    for (const [id, _fields] of subscribers) {
      this.subscribers.delete(id);
    }
    const subscriptionSpecs = subscribers.flatMap(
      ([_id, fields]) => [...fields.values()].flatMap((field) => field.selections.map(([spec]) => spec))
    );
    return subscriptionSpecs;
  }
  removeSubscribers(id, fieldName, specs) {
    let targets = [];
    const subscriber = this.subscribers.get(id);
    if (!subscriber) {
      return;
    }
    const subscriberField = subscriber.get(fieldName);
    for (const spec of specs) {
      const counts = subscriber.get(fieldName)?.referenceCounts;
      if (!counts?.has(spec.set)) {
        continue;
      }
      const newVal = (counts.get(spec.set) || 0) - 1;
      counts.set(spec.set, newVal);
      if (newVal <= 0) {
        targets.push(spec.set);
        counts.delete(spec.set);
      }
      if (counts.size === 0) {
        subscriber.delete(fieldName);
      }
    }
    if (subscriberField) {
      subscriberField.selections = this.get(id, fieldName).filter(
        ([{ set }]) => !targets.includes(set)
      );
    }
    if (subscriber.size === 0) {
      this.subscribers.delete(id);
    }
  }
  removeAllSubscribers(id, targets, visited = []) {
    visited.push(id);
    const subscriber = this.subscribers.get(id);
    for (const [key, val] of subscriber?.entries() ?? []) {
      const subscribers = targets || val.selections.map(([spec]) => spec);
      this.removeSubscribers(id, key, subscribers);
      const { value, kind } = this.cache._internal_unstable.storage.get(id, key);
      if (kind === "scalar") {
        continue;
      }
      const nextTargets = Array.isArray(value) ? flatten(value) : [value];
      for (const id2 of nextTargets) {
        if (visited.includes(id2)) {
          continue;
        }
        this.removeAllSubscribers(id2, subscribers, visited);
      }
    }
  }
  get size() {
    let size = 0;
    for (const [, nodeCounts] of this.subscribers) {
      for (const [, { referenceCounts }] of nodeCounts) {
        size += [...referenceCounts.values()].reduce((size2, count) => size2 + count, 0);
      }
    }
    return size;
  }
}
class Cache {
  _internal_unstable;
  constructor({
    disabled,
    componentCache,
    createComponent,
    ...config2
  } = {}) {
    this._internal_unstable = new CacheInternal({
      cache: this,
      storage: new InMemoryStorage(),
      subscriptions: new InMemorySubscriptions(this),
      lists: new ListManager(this, rootID),
      lifetimes: new GarbageCollector(this),
      staleManager: new StaleManager(this),
      disabled: disabled ?? typeof globalThis.window === "undefined",
      componentCache,
      createComponent
    });
    if (Object.keys(config2).length > 0) {
      this.setConfig(defaultConfigValues(config2));
    }
  }
  write({
    layer: layerID,
    notifySubscribers = [],
    ...args
  }) {
    const layer = layerID ? this._internal_unstable.storage.getLayer(layerID) : this._internal_unstable.storage.topLayer;
    const subscribers = this._internal_unstable.writeSelection({ ...args, layer }).map((sub) => sub[0]);
    this.#notifySubscribers(subscribers.concat(notifySubscribers));
    return subscribers;
  }
  read(...args) {
    const { data, partial, stale, hasData } = this._internal_unstable.getSelection(...args);
    if (!hasData) {
      return { data: null, partial: false, stale: false };
    }
    return {
      data,
      partial,
      stale
    };
  }
  subscribe(spec, variables = {}) {
    if (this._internal_unstable.disabled) {
      return;
    }
    return this._internal_unstable.subscriptions.add({
      parent: spec.parentID || rootID,
      spec,
      selection: spec.selection,
      variables
    });
  }
  unsubscribe(spec, variables = {}) {
    return this._internal_unstable.subscriptions.remove(
      spec.parentID || rootID,
      spec.selection,
      [spec],
      variables
    );
  }
  list(name, parentID, allLists) {
    const handler = this._internal_unstable.lists.get(name, parentID, allLists);
    if (!handler) {
      throw new Error(
        `Cannot find list with name: ${name}${parentID ? " under parent " + parentID : ""}. Is it possible that the query is not mounted?`
      );
    }
    return handler;
  }
  registerKeyMap(source, mapped) {
    this._internal_unstable.storage.registerIDMapping(source, mapped);
  }
  delete(id, layer) {
    this._internal_unstable.subscriptions.removeAllSubscribers(id);
    this._internal_unstable.lists.removeIDFromAllLists(id, layer);
    this._internal_unstable.storage.delete(id, layer);
  }
  setConfig(config2) {
    this._internal_unstable.setConfig(config2);
  }
  markTypeStale(options) {
    if (!options) {
      this._internal_unstable.staleManager.markAllStale();
    } else if (!options.field) {
      this._internal_unstable.staleManager.markTypeStale(options.type);
    } else {
      this._internal_unstable.staleManager.markTypeFieldStale(
        options.type,
        options.field,
        options.when
      );
    }
  }
  markRecordStale(id, options) {
    if (options.field) {
      const key = computeKey({ field: options.field, args: options.when ?? {} });
      this._internal_unstable.staleManager.markFieldStale(id, key);
    } else {
      this._internal_unstable.staleManager.markRecordStale(id);
    }
  }
  getFieldTime(id, field) {
    return this._internal_unstable.staleManager.getFieldTime(id, field);
  }
  config() {
    return this._internal_unstable.config;
  }
  serialize() {
    return this._internal_unstable.storage.serialize();
  }
  hydrate(...args) {
    return this._internal_unstable.storage.hydrate(...args);
  }
  clearLayer(layerID) {
    const layer = this._internal_unstable.storage.getLayer(layerID);
    if (!layer) {
      throw new Error("Cannot find layer with id: " + layerID);
    }
    const toNotify = [];
    const allFields = [];
    for (const target of [layer.fields, layer.links]) {
      for (const [id, fields] of Object.entries(target)) {
        allFields.push(
          ...Object.entries(fields).map(([field, value]) => ({ id, field, value }))
        );
      }
    }
    const displayFields = [];
    for (const pair of allFields) {
      const { displayLayers } = this._internal_unstable.storage.get(pair.id, pair.field);
      if (!displayLayers.includes(layerID)) {
        continue;
      }
      displayFields.push(pair);
    }
    for (const [id, operation] of Object.entries(layer.operations)) {
      if (operation.deleted) {
        displayFields.push(
          ...this._internal_unstable.subscriptions.activeFields(id).map((field) => ({ id, field }))
        );
      }
      const fields = Object.keys(operation.fields ?? {});
      if (fields.length > 0) {
        displayFields.push(...fields.map((field) => ({ id, field })));
      }
    }
    layer.clear();
    for (const display of displayFields) {
      const { field, id } = display;
      const notify = !("value" in display) || this._internal_unstable.storage.get(id, field).value !== display.value;
      if (notify) {
        toNotify.push(
          ...this._internal_unstable.subscriptions.get(id, field).map((sub) => sub[0])
        );
      }
    }
    this.#notifySubscribers(toNotify);
  }
  reset() {
    const subSpecs = this._internal_unstable.subscriptions.reset();
    this._internal_unstable.staleManager.reset();
    this._internal_unstable.lifetimes.reset();
    this._internal_unstable.lists.reset();
    this._internal_unstable.storage.reset();
    this.#notifySubscribers(subSpecs);
  }
  #notifySubscribers(subs) {
    if (subs.length === 0) {
      return;
    }
    const notified = [];
    for (const spec of subs) {
      if (!notified.includes(spec.set)) {
        notified.push(spec.set);
        spec.set(
          this._internal_unstable.getSelection({
            parent: spec.parentID || rootID,
            selection: spec.selection,
            variables: spec.variables?.() || {},
            ignoreMasking: false
          }).data
        );
      }
    }
  }
}
class CacheInternal {
  disabled = false;
  _config;
  storage;
  subscriptions;
  lists;
  cache;
  lifetimes;
  staleManager;
  componentCache;
  createComponent;
  constructor({
    storage,
    subscriptions,
    lists,
    cache,
    lifetimes,
    staleManager,
    disabled,
    config: config2,
    componentCache,
    createComponent
  }) {
    this.storage = storage;
    this.subscriptions = subscriptions;
    this.lists = lists;
    this.cache = cache;
    this.lifetimes = lifetimes;
    this.staleManager = staleManager;
    this._config = config2;
    this.componentCache = componentCache ?? {};
    this.createComponent = createComponent ?? (() => ({}));
    this.disabled = disabled;
    try {
      if (process.env.HOUDINI_TEST === "true") {
        this.disabled = false;
      }
    } catch {
    }
  }
  get config() {
    return this._config ?? getCurrentConfig();
  }
  setConfig(config2) {
    this._config = config2;
  }
  writeSelection({
    data,
    selection,
    variables = {},
    parent = rootID,
    applyUpdates,
    layer,
    toNotify = [],
    forceNotify,
    forceStale
  }) {
    if (this.disabled) {
      return [];
    }
    let targetSelection = getFieldsForType(
      selection,
      data["__typename"],
      false
    );
    for (const [field, value] of Object.entries(data)) {
      if (!selection || !targetSelection[field]) {
        continue;
      }
      let {
        type: linkedType,
        keyRaw,
        selection: fieldSelection,
        operations,
        abstract: isAbstract,
        updates
      } = targetSelection[field];
      const key = evaluateKey(keyRaw, variables);
      if (value && typeof value === "object" && "__typename" in value && value["__typename"]) {
        linkedType = value["__typename"];
      }
      const currentSubscribers = this.subscriptions.get(parent, key);
      const specs = currentSubscribers.map((sub) => sub[0]);
      const { value: previousValue, displayLayers } = this.storage.get(parent, key);
      const displayLayer = layer.isDisplayLayer(displayLayers);
      if (displayLayer) {
        this.lifetimes.resetLifetime(parent, key);
        if (forceStale) {
          this.staleManager.markFieldStale(parent, key);
        } else {
          this.staleManager.setFieldTimeToNow(parent, key);
        }
      }
      if (!fieldSelection) {
        let newValue = value;
        if (updates && applyUpdates && Array.isArray(value)) {
          for (const update of applyUpdates) {
            if (!updates.includes(update)) {
              continue;
            }
            if (update === "append") {
              newValue = (previousValue || []).concat(value);
            } else if (update === "prepend") {
              newValue = value.concat(previousValue || []);
            }
          }
        }
        if (updates && applyUpdates?.includes("prepend") && ["endCursor", "hasNextPage"].includes(key)) {
          newValue = previousValue;
        } else if (updates && applyUpdates?.includes("append") && ["startCursor", "hasPreviousPage"].includes(key)) {
          newValue = previousValue;
        }
        const valueChanged = !deepEquals(newValue, previousValue);
        if (displayLayer && (valueChanged || forceNotify)) {
          toNotify.push(...currentSubscribers);
        }
        layer.writeField(parent, key, newValue);
      } else if (value === null) {
        if (previousValue === null) {
          continue;
        }
        const previousLinks = flatten([previousValue]);
        for (const link of previousLinks) {
          this.subscriptions.remove(link, fieldSelection, specs, variables);
        }
        layer.writeLink(parent, key, null);
        toNotify.push(...currentSubscribers);
      } else if (value instanceof Object && !Array.isArray(value)) {
        if (isAbstract) {
          if (!value.__typename) {
            throw new Error(
              "Encountered interface type without __typename in the payload"
            );
          }
        }
        let linkedID = null;
        if (value !== null) {
          linkedID = !this.isEmbedded(linkedType, value) ? this.id(linkedType, value) : `${parent}.${key}`;
        }
        let linkChange = linkedID !== previousValue;
        layer.writeLink(parent, key, linkedID);
        if (linkedID && displayLayer && (linkChange || forceNotify)) {
          if (previousValue && typeof previousValue === "string") {
            this.subscriptions.remove(previousValue, fieldSelection, specs, variables);
          }
          this.subscriptions.addMany({
            parent: linkedID,
            subscribers: currentSubscribers,
            variables,
            parentType: linkedType
          });
          toNotify.push(...currentSubscribers);
        }
        if (linkedID) {
          this.writeSelection({
            selection: fieldSelection,
            parent: linkedID,
            data: value,
            variables,
            toNotify,
            applyUpdates,
            layer,
            forceNotify
          });
        }
      } else if (Array.isArray(value) && (typeof previousValue === "undefined" || previousValue === null || Array.isArray(previousValue))) {
        let oldIDs = [...previousValue || []];
        const emptyEdges = !updates ? [] : oldIDs.map((id) => {
          if (!id) {
            return "";
          }
          const { value: cursorField } = this.storage.get(id, "cursor");
          if (cursorField) {
            return "";
          }
          const { value: node } = this.storage.get(id, "node");
          if (!node) {
            return "";
          }
          return node;
        });
        let linkedIDs = [];
        const { newIDs, nestedIDs } = this.extractNestedListIDs({
          value,
          abstract: Boolean(isAbstract),
          specs: toNotify,
          applyUpdates,
          recordID: parent,
          key,
          linkedType,
          variables,
          fields: fieldSelection,
          layer,
          forceNotify
        });
        if (applyUpdates && updates) {
          if (key === "edges") {
            const newNodeIDs = [];
            for (const id of newIDs) {
              if (!id) {
                continue;
              }
              const { value: node } = this.storage.get(id, "node");
              if (typeof node !== "string") {
                continue;
              }
              if (!node || !this.storage.get(node, "__typename")) {
                continue;
              }
              newNodeIDs.push(node);
            }
            oldIDs = oldIDs.filter((id) => {
              if (!id) {
                return true;
              }
              const { value: value2 } = this.storage.get(id, "node");
              const node = value2;
              if (newNodeIDs.includes(node) && emptyEdges.includes(node)) {
                return false;
              }
              return true;
            });
          }
          for (const update of applyUpdates) {
            if (update !== "replace" && !updates.includes(update)) {
              continue;
            }
            if (update === "prepend") {
              linkedIDs = newIDs.concat(oldIDs);
            } else if (update === "append") {
              linkedIDs = oldIDs.concat(newIDs);
            } else if (update === "replace") {
              linkedIDs = newIDs;
            }
          }
        } else {
          linkedIDs = nestedIDs;
        }
        const contentChanged = !deepEquals(linkedIDs, oldIDs) || previousValue === null;
        if (contentChanged || forceNotify) {
          toNotify.push(...currentSubscribers);
        }
        for (const lostID of oldIDs) {
          if (linkedIDs.includes(lostID) || !lostID) {
            continue;
          }
          this.subscriptions.remove(lostID, fieldSelection, specs, variables);
        }
        if (contentChanged || oldIDs.length === 0 && newIDs.length === 0) {
          layer.writeLink(parent, key, linkedIDs);
        }
        for (const id of newIDs.filter((id2) => !oldIDs.includes(id2))) {
          if (id == null) {
            continue;
          }
          this.subscriptions.addMany({
            parent: id,
            subscribers: currentSubscribers,
            variables,
            parentType: linkedType
          });
        }
      }
      for (const operation of operations || []) {
        let parentID;
        if (operation.parentID) {
          if (operation.parentID.kind !== "Variable") {
            parentID = operation.parentID.value;
          } else {
            const id = variables[operation.parentID.value];
            if (typeof id !== "string") {
              throw new Error("parentID value must be a string");
            }
            parentID = id;
          }
        }
        if (operation.list && !this.lists.get(operation.list, parentID, operation.target === "all")) {
          continue;
        }
        const targets = Array.isArray(value) ? value : [value];
        for (const target of targets) {
          if (operation.action === "insert" && target instanceof Object && fieldSelection && operation.list) {
            this.cache.list(operation.list, parentID, operation.target === "all").when(operation.when).addToList(
              fieldSelection,
              target,
              variables,
              operation.position || "last",
              layer
            );
          } else if (operation.action === "toggle" && target instanceof Object && fieldSelection && operation.list) {
            this.cache.list(operation.list, parentID, operation.target === "all").when(operation.when).toggleElement({
              selection: fieldSelection,
              data: target,
              variables,
              where: operation.position || "last",
              layer
            });
          } else if (operation.action === "remove" && target instanceof Object && fieldSelection && operation.list) {
            this.cache.list(operation.list, parentID, operation.target === "all").when(operation.when).remove(target, variables, layer);
          } else if (operation.action === "delete" && operation.type && target) {
            const targetID = this.id(operation.type, target);
            if (!targetID) {
              continue;
            }
            this.cache.delete(targetID, layer);
          }
        }
      }
    }
    return toNotify;
  }
  getSelection({
    selection,
    parent = rootID,
    variables,
    stepsFromConnection = null,
    ignoreMasking,
    fullCheck = false,
    loading: generateLoading
  }) {
    if (parent === null) {
      return { data: null, partial: false, stale: false, hasData: true };
    }
    const target = {};
    if (selection.fragments) {
      target[fragmentKey] = {
        loading: Boolean(generateLoading),
        values: Object.fromEntries(
          Object.entries(selection.fragments).filter(([, value]) => !generateLoading || value.loading).map(([key, value]) => [
            key,
            {
              parent,
              variables: evaluateVariables(value.arguments, variables ?? {})
            }
          ])
        )
      };
    }
    let hasData = !!selection.fragments;
    let partial = false;
    let cascadeNull = false;
    let stale = false;
    const typename = this.storage.get(parent, "__typename").value;
    let targetSelection = getFieldsForType(selection, typename, !!generateLoading);
    for (const [
      attributeName,
      {
        type,
        keyRaw,
        selection: fieldSelection,
        nullable,
        list,
        visible,
        directives,
        loading: fieldLoading,
        abstractHasRequired,
        component
      }
    ] of Object.entries(targetSelection)) {
      if (!visible && !ignoreMasking && !fullCheck) {
        continue;
      }
      const includeDirective = directives?.find((d) => {
        return d.name === "include";
      });
      if (includeDirective) {
        if (!evaluateVariables(includeDirective.arguments, variables ?? {})["if"]) {
          continue;
        }
      }
      const skipDirective = directives?.find((d) => {
        return d.name === "skip";
      });
      if (skipDirective) {
        if (evaluateVariables(skipDirective.arguments, variables ?? {})["if"]) {
          continue;
        }
      }
      const fieldTarget = visible || ignoreMasking ? target : {};
      const key = evaluateKey(keyRaw, variables);
      if (generateLoading && !fieldLoading) {
        continue;
      }
      const defaultValue = !component ? void 0 : defaultComponentField({
        cache: this.cache,
        component,
        variables,
        parent
      });
      let { value } = this.storage.get(parent, key, defaultValue);
      const dt_field = this.staleManager.getFieldTime(parent, key);
      if (dt_field === null) {
        stale = true;
      }
      if (generateLoading) {
        value = void 0;
      }
      let nextStep = stepsFromConnection;
      if (nextStep !== null) {
        if (nextStep >= 2) {
          nextStep = null;
        } else {
          nextStep += 1;
        }
      }
      if (list?.connection) {
        nextStep = 0;
      }
      const embeddedCursor = key === "cursor" && stepsFromConnection === 1;
      if (typeof value === "undefined" && !embeddedCursor) {
        partial = true;
      }
      if (generateLoading && fieldLoading?.kind === "value") {
        fieldTarget[attributeName] = PendingValue;
        hasData = true;
      } else if (!generateLoading && typeof value === "undefined" || value === null) {
        fieldTarget[attributeName] = null;
        if (typeof value !== "undefined") {
          hasData = true;
        }
      } else if (!fieldSelection) {
        const fnUnmarshal = this.config?.scalars?.[type]?.unmarshal;
        if (fnUnmarshal) {
          if (Array.isArray(value)) {
            fieldTarget[attributeName] = value.map(
              (v) => fnUnmarshal(v)
            );
          } else {
            fieldTarget[attributeName] = fnUnmarshal(value);
          }
        } else {
          fieldTarget[attributeName] = value;
        }
        hasData = true;
      } else if (Array.isArray(value)) {
        const listValue = this.hydrateNestedList({
          fields: fieldSelection,
          variables,
          linkedList: value,
          stepsFromConnection: nextStep,
          ignoreMasking: !!ignoreMasking,
          fullCheck,
          loading: generateLoading,
          nullable: !!nullable
        });
        fieldTarget[attributeName] = listValue.data;
        if (listValue.partial) {
          partial = true;
        }
        if (listValue.cascadeNull) {
          cascadeNull = true;
        }
        if (listValue.stale) {
          stale = true;
        }
        if (listValue.hasData || value.length === 0) {
          hasData = true;
        }
      } else {
        const objectFields = this.getSelection({
          parent: value,
          selection: fieldSelection,
          variables,
          stepsFromConnection: nextStep,
          ignoreMasking,
          fullCheck,
          loading: generateLoading
        });
        fieldTarget[attributeName] = objectFields.data;
        if (objectFields.partial) {
          partial = true;
        }
        if (objectFields.stale) {
          stale = true;
        }
        if (objectFields.hasData) {
          hasData = true;
        }
      }
      if (generateLoading && fieldLoading?.list) {
        fieldTarget[attributeName] = wrapInLists(
          Array.from({ length: fieldLoading.list.count }).fill(
            fieldTarget[attributeName]
          ),
          fieldLoading.list.depth - 1
        );
      }
      if (fieldTarget[attributeName] === null && !nullable && !embeddedCursor) {
        if (abstractHasRequired) {
          target[attributeName] = {
            __typename: "@required field missing; don't match this"
          };
        } else {
          cascadeNull = true;
        }
      }
    }
    return {
      data: cascadeNull ? null : target,
      partial: !generateLoading && hasData && partial,
      stale: hasData && stale,
      hasData
    };
  }
  id(type, data) {
    const id = typeof data === "object" ? this.computeID(type, data) : data;
    if (!id) {
      return null;
    }
    if (!type) {
      return id;
    }
    return type + ":" + id;
  }
  idFields(type) {
    return keyFieldsForType(this.config, type);
  }
  computeID(type, data) {
    return computeID(this.config, type, data);
  }
  isEmbedded(linkedType, value) {
    const idFields = this.idFields(linkedType);
    return idFields.length === 0 || idFields.filter((field) => typeof value[field] === "undefined").length > 0;
  }
  hydrateNestedList({
    fields,
    variables,
    linkedList,
    stepsFromConnection,
    ignoreMasking,
    fullCheck,
    loading,
    nullable
  }) {
    const result = [];
    let partialData = false;
    let stale = false;
    let hasValues = false;
    let cascadeNull = false;
    for (const entry of linkedList) {
      if (Array.isArray(entry)) {
        const nestedValue = this.hydrateNestedList({
          fields,
          nullable,
          variables,
          linkedList: entry,
          stepsFromConnection,
          ignoreMasking,
          fullCheck,
          loading
        });
        result.push(nestedValue.data);
        if (nestedValue.partial) {
          partialData = true;
        }
        if (nestedValue.cascadeNull) {
          cascadeNull = true;
        }
        continue;
      }
      if (entry === null) {
        result.push(entry);
        continue;
      }
      const {
        data,
        partial,
        stale: local_stale,
        hasData
      } = this.getSelection({
        parent: entry,
        selection: fields,
        variables,
        stepsFromConnection,
        ignoreMasking,
        fullCheck,
        loading
      });
      if (data === null && !nullable) {
        cascadeNull = true;
      }
      result.push(data);
      if (partial) {
        partialData = true;
      }
      if (local_stale) {
        stale = true;
      }
      if (hasData) {
        hasValues = true;
      }
    }
    return {
      data: result,
      partial: partialData,
      stale,
      hasData: hasValues,
      cascadeNull
    };
  }
  extractNestedListIDs({
    value,
    abstract,
    recordID,
    key,
    linkedType,
    fields,
    variables,
    applyUpdates,
    specs,
    layer,
    forceNotify
  }) {
    const nestedIDs = [];
    const newIDs = [];
    for (const [i, entry] of value.entries()) {
      if (Array.isArray(entry)) {
        const inner = this.extractNestedListIDs({
          value: entry,
          abstract,
          recordID,
          key,
          linkedType,
          fields,
          variables,
          applyUpdates,
          specs,
          layer,
          forceNotify
        });
        newIDs.push(...inner.newIDs);
        nestedIDs[i] = inner.nestedIDs;
        continue;
      }
      if (entry === null || typeof entry === "undefined") {
        newIDs.push(null);
        nestedIDs[i] = null;
        continue;
      }
      const entryObj = entry;
      let linkedID = `${recordID}.${key}[${this.storage.nextRank}]`;
      let innerType = linkedType;
      const typename = entryObj.__typename;
      if (typename) {
        innerType = typename;
      } else if (abstract) {
        throw new Error("Encountered interface type without __typename in the payload");
      }
      if (!this.isEmbedded(linkedType, entry)) {
        const id = this.id(innerType, entry);
        if (id) {
          linkedID = id;
        } else {
          continue;
        }
      }
      this.writeSelection({
        root: rootID,
        selection: fields,
        parent: linkedID,
        data: entryObj,
        variables,
        toNotify: specs,
        applyUpdates,
        layer,
        forceNotify
      });
      newIDs.push(linkedID);
      nestedIDs[i] = linkedID;
    }
    return { newIDs, nestedIDs };
  }
  collectGarbage() {
    this.lifetimes.tick();
    if (this.storage.layerCount === 1) {
      this.storage.topLayer.removeUndefinedFields();
    }
  }
}
function evaluateVariables(variables, args) {
  return Object.fromEntries(
    Object.entries(variables).map(([key, value]) => [key, variableValue(value, args)])
  );
}
function wrapInLists(target, count = 0) {
  if (count === 0) {
    return target;
  }
  return wrapInLists([target], count - 1);
}
function variableValue(value, args) {
  if (value.kind === "StringValue") {
    return value.value;
  }
  if (value.kind === "BooleanValue") {
    return value.value;
  }
  if (value.kind === "EnumValue") {
    return value.value;
  }
  if (value.kind === "FloatValue") {
    return parseFloat(value.value);
  }
  if (value.kind === "IntValue") {
    return parseInt(value.value, 10);
  }
  if (value.kind === "NullValue") {
    return null;
  }
  if (value.kind === "Variable") {
    return args[value.name.value];
  }
  if (value.kind === "ListValue") {
    return value.values.map((value2) => variableValue(value2, args));
  }
  if (value.kind === "ObjectValue") {
    return value.fields.reduce(
      (obj, field) => ({
        ...obj,
        [field.name.value]: variableValue(field.value, args)
      }),
      {}
    );
  }
}
const rootID = "_ROOT_";
function defaultComponentField({
  cache,
  component,
  loading,
  variables,
  parent
}) {
  return (props) => {
    const componentFn = cache._internal_unstable.componentCache[component.key];
    const args = evaluateVariables(component.variables ?? {}, variables ?? {});
    return cache._internal_unstable.createComponent(componentFn, {
      ...props,
      [component.prop]: {
        [fragmentKey]: {
          loading,
          values: {
            [component.fragment]: {
              variables: args,
              parent
            }
          }
        }
      }
    });
  };
}
var cache_default = new Cache();
const serverSide = typeof globalThis.window === "undefined";
const cachePolicy = ({
  enabled,
  setFetching,
  cache: localCache = cache_default,
  serverSideFallback = true
}) => () => {
  return {
    beforeNetwork(ctx, { initialValue, next, resolve, marshalVariables: marshalVariables2 }) {
      const { policy, artifact } = ctx;
      let useCache = false;
      if (enabled && (artifact.kind === ArtifactKind.Query || artifact.kind === ArtifactKind.Fragment) && !ctx.cacheParams?.disableRead) {
        const policyAllowsCache = policy !== CachePolicy.NetworkOnly && policy !== CachePolicy.NoCache;
        if (policyAllowsCache) {
          const value = localCache.read({
            selection: artifact.selection,
            variables: marshalVariables2(ctx),
            fullCheck: true
          });
          const allowed = !value.partial || artifact.kind === ArtifactKind.Query && artifact.partial;
          if (policy === CachePolicy.CacheOnly) {
            return resolve(ctx, {
              fetching: false,
              variables: ctx.variables ?? null,
              data: allowed ? value.data : initialValue.data,
              errors: null,
              source: DataSource.Cache,
              partial: allowed ? value.partial : false,
              stale: value.stale
            });
          }
          useCache = !!(value.data !== null && allowed);
          if (useCache) {
            resolve(ctx, {
              fetching: false,
              variables: ctx.variables ?? null,
              data: value.data,
              errors: null,
              source: DataSource.Cache,
              partial: value.partial,
              stale: value.stale
            });
          }
          if (useCache && !value.partial && !value.stale && ctx.policy !== "CacheAndNetwork") {
            return;
          }
        }
      }
      if (enabled) {
        setTimeout(() => {
          localCache._internal_unstable.collectGarbage();
        }, 0);
      }
      if (!ctx.stuff?.silenceLoading) {
        let fetchingState = null;
        if (!useCache && "enableLoadingState" in artifact && artifact.enableLoadingState) {
          fetchingState = localCache.read({
            selection: artifact.selection,
            variables: marshalVariables2(ctx),
            loading: true
          }).data;
        }
        setFetching(!useCache, fetchingState);
      }
      return next(ctx);
    },
    afterNetwork(ctx, { resolve, value, marshalVariables: marshalVariables2 }) {
      if (ctx.policy !== CachePolicy.NoCache && value.source !== DataSource.Cache && enabled && value.data && !ctx.cacheParams?.disableWrite) {
        if (ctx.cacheParams && "serverSideFallback" in ctx.cacheParams) {
          serverSideFallback = ctx.cacheParams?.serverSideFallback ?? serverSideFallback;
        }
        const targetCache = serverSide && serverSideFallback ? new Cache({ disabled: false }) : localCache;
        let layer;
        if (!serverSide && ctx.cacheParams?.layer) {
          layer = ctx.cacheParams.layer.id;
        }
        targetCache.write({
          ...ctx.cacheParams,
          layer,
          selection: ctx.artifact.selection,
          data: value.data,
          variables: marshalVariables2(ctx)
        });
        value = {
          ...value,
          data: targetCache.read({
            selection: ctx.artifact.selection,
            variables: marshalVariables2(ctx),
            ignoreMasking: serverSide
          }).data
        };
      }
      resolve(ctx, value);
    }
  };
};
const steps = {
  forward: ["start", "beforeNetwork", "network"],
  backwards: ["end", "afterNetwork"]
};
class DocumentStore extends Writable {
  artifact;
  #client;
  #configFile;
  #plugins;
  #lastVariables;
  #lastContext = null;
  pendingPromise = null;
  serverSideFallback;
  constructor({
    artifact,
    plugins,
    pipeline,
    client: client2,
    cache,
    enableCache = true,
    initialValue,
    initialVariables,
    fetching
  }) {
    fetching ??= artifact.kind === ArtifactKind.Query;
    const initialState = {
      data: initialValue ?? null,
      errors: null,
      partial: false,
      stale: false,
      source: null,
      fetching,
      variables: initialVariables ?? null
    };
    super(initialState, () => {
      return () => {
        this.#lastVariables = null;
        this.cleanup();
      };
    });
    this.artifact = artifact;
    this.#client = client2;
    this.#lastVariables = null;
    this.#configFile = getCurrentConfig();
    this.#plugins = pipeline ?? [
      cachePolicy({
        cache,
        enabled: enableCache,
        setFetching: (fetching2, data) => {
          this.update((state) => {
            const newState = { ...state, fetching: fetching2 };
            if (fetching2 && data) {
              newState.data = data;
            }
            return newState;
          });
        }
      })(),
      ...plugins ?? []
    ];
  }
  async send({
    metadata,
    session,
    fetch,
    variables,
    policy,
    stuff,
    cacheParams,
    setup = false,
    silenceEcho = false
  } = {}) {
    let context = new ClientPluginContextWrapper({
      config: this.#configFile,
      name: this.artifact.name,
      text: this.artifact.raw,
      hash: this.artifact.hash,
      policy: policy ?? this.artifact.policy,
      variables: null,
      metadata,
      session,
      fetch: fetch ?? this.getFetch(() => session),
      stuff: {
        inputs: {
          changed: false,
          init: false,
          marshaled: {}
        },
        ...stuff
      },
      artifact: this.artifact,
      lastVariables: this.#lastVariables,
      cacheParams
    });
    const draft = context.draft();
    draft.variables = variables ?? null;
    context = context.apply(draft, false);
    const promise = new Promise((resolve, reject) => {
      const state = {
        setup,
        currentStep: 0,
        index: 0,
        silenceEcho,
        promise: {
          resolved: false,
          resolve,
          reject,
          then: (...args) => promise.then(...args)
        },
        context
      };
      if (this.pendingPromise === null) {
        this.pendingPromise = state.promise;
      }
      this.#step("forward", state);
    });
    return await promise;
  }
  async cleanup() {
    for (const plugin of this.#plugins) {
      plugin.cleanup?.(this.#lastContext);
    }
  }
  getFetch(getSession2) {
    return async (input, init) => {
      let url = "";
      let queries = [];
      if (typeof input === "string") {
        url = input.startsWith("http") ? new URL(input).pathname : input;
      }
      if (input instanceof URL) {
        url = input.pathname;
      } else if (input instanceof Request) {
        url = new URL(input.url).pathname;
      }
      if (input instanceof Request) {
        const body = await input.json();
        if (!Array.isArray(body)) {
          queries = [body];
        }
      } else {
        const body = JSON.parse(init?.body);
        if (!Array.isArray(body)) {
          queries = [body];
        }
      }
      if (!url || queries.length === 0) {
        return await globalThis.fetch(input, init);
      }
      if (this.#client?.proxies[url]) {
        const result = await Promise.all(
          queries.map(
            (q) => this.#client?.proxies[url]({
              ...q,
              session: getSession2()
            })
          )
        );
        return new Response(JSON.stringify(result.length === 1 ? result[0] : result));
      }
      return await globalThis.fetch(input, init);
    };
  }
  #step(direction, ctx, value) {
    const hook = direction === "error" ? "catch" : steps[direction][ctx.currentStep];
    let valid = (i) => i <= this.#plugins.length;
    let step = (i) => i + 1;
    if (["backwards", "error"].includes(direction)) {
      valid = (i) => i >= 0;
      step = (i) => i - 1;
    }
    for (let index = ctx.index; valid(index); index = step(index)) {
      let target = this.#plugins[index]?.[hook];
      if (!target) {
        continue;
      }
      const draft = ctx.context.draft();
      let variablesRefChanged = (newContext) => newContext.variables !== draft.variables;
      const common = {
        initialValue: this.state,
        client: this.#client,
        variablesChanged,
        marshalVariables,
        updateState: this.update.bind(this),
        next: (newContext) => {
          const nextIndex = ["forward", "error"].includes(direction) ? index + 1 : index;
          const nextStep = ["backwards", "error"].includes(direction) ? 0 : ctx.currentStep;
          this.#step("forward", {
            ...ctx,
            index: nextIndex,
            currentStep: nextStep,
            context: ctx.context.apply(newContext, variablesRefChanged(newContext))
          });
        },
        resolve: (newContext, value2) => {
          const nextIndex = direction === "backwards" ? index - 1 : index;
          this.#step(
            "backwards",
            {
              ...ctx,
              index: nextIndex,
              context: ctx.context.apply(newContext, variablesRefChanged(newContext))
            },
            value2
          );
        }
      };
      let handlers;
      if (direction === "forward") {
        handlers = common;
      } else if (direction === "backwards") {
        handlers = {
          ...common,
          value,
          resolve: (ctx2, data) => {
            return common.resolve(ctx2, data ?? value);
          }
        };
      } else if (direction === "error") {
        handlers = {
          ...common,
          error: value
        };
      }
      try {
        const result = target(draft, handlers);
        result?.catch((err) => {
          this.#step("error", { ...ctx, index: index - 1 }, err);
        });
      } catch (err) {
        this.#step("error", { ...ctx, index: index - 1 }, err);
      }
      return;
    }
    if (direction === "forward") {
      if (ctx.setup) {
        return this.#step(
          "backwards",
          {
            ...ctx,
            currentStep: 0,
            index: this.#plugins.length
          },
          this.state
        );
      }
      if (ctx.currentStep <= steps.forward.length - 2) {
        return this.#step("forward", {
          ...ctx,
          currentStep: ctx.currentStep + 1,
          index: 0
        });
      }
      throw new Error(
        "Called next() on last possible plugin. Your chain is missing a plugin that calls resolve()."
      );
    }
    if (direction === "error") {
      if (!ctx.promise.resolved) {
        ctx.promise.reject(value);
        ctx.promise.resolved = true;
      }
      return;
    }
    if (ctx.currentStep > 0) {
      return this.#step(
        "backwards",
        {
          ...ctx,
          currentStep: ctx.currentStep - 1,
          index: this.#plugins.length - 1
        },
        value
      );
    }
    if (!ctx.silenceEcho || value.data !== this.state.data) {
      this.set(value);
    }
    if (!ctx.promise.resolved) {
      ctx.promise.resolve(value);
      ctx.promise.resolved = true;
    }
    this.#lastContext = ctx.context.draft();
    this.#lastVariables = this.#lastContext.stuff.inputs.marshaled;
  }
}
class ClientPluginContextWrapper {
  #context;
  #lastVariables;
  constructor({
    lastVariables,
    ...values
  }) {
    this.#context = values;
    this.#lastVariables = lastVariables;
  }
  get variables() {
    return this.#context.variables;
  }
  draft() {
    const ctx = {
      ...this.#context
    };
    const applyVariables = this.applyVariables.bind(this);
    return {
      ...ctx,
      get stuff() {
        return ctx.stuff;
      },
      set stuff(val) {
        ctx.stuff = val;
      },
      get variables() {
        return ctx.variables ?? null;
      },
      set variables(val) {
        Object.assign(ctx, applyVariables(ctx, { variables: val }));
      }
    };
  }
  applyVariables(source, values) {
    const artifact = source.artifact;
    const ctx = {
      ...source,
      ...values
    };
    const val = values.variables;
    let changed = {};
    for (const [name, value] of Object.entries(val ?? {})) {
      if (value !== source.variables?.[name]) {
        changed[name] = value;
      }
    }
    ctx.stuff = {
      ...ctx.stuff,
      inputs: {
        ...ctx.stuff.inputs
      }
    };
    const firstInit = !ctx.stuff.inputs || !ctx.stuff.inputs.init;
    const hasChanged = Object.keys(changed).length > 0 || firstInit;
    if (hasChanged) {
      const newVariables = {
        ...ctx.stuff.inputs?.marshaled,
        ...marshalInputs({
          artifact,
          input: changed,
          config: source.config
        })
      };
      ctx.stuff.inputs = {
        init: true,
        marshaled: newVariables,
        changed: true
      };
      ctx.variables = val;
    }
    ctx.stuff = {
      ...ctx.stuff,
      inputs: {
        ...ctx.stuff.inputs,
        changed: !deepEquals(ctx.stuff.inputs.marshaled, this.#lastVariables)
      }
    };
    return ctx;
  }
  apply(values, newVariables) {
    if (newVariables) {
      values = this.applyVariables(this.#context, values);
    }
    const wrapper = new ClientPluginContextWrapper({
      ...values,
      lastVariables: this.#lastVariables
    });
    return wrapper;
  }
}
function marshalVariables(ctx) {
  return ctx.stuff.inputs?.marshaled ?? {};
}
function variablesChanged(ctx) {
  return ctx.stuff.inputs?.changed;
}
class BaseStore {
  #params;
  get artifact() {
    return this.#params.artifact;
  }
  get name() {
    return this.artifact.name;
  }
  #store;
  #unsubscribe = null;
  constructor(params) {
    if (typeof params.initialize === "undefined") {
      params.initialize = true;
    }
    this.#store = new DocumentStore({
      artifact: params.artifact,
      client: null,
      fetching: params.fetching,
      initialValue: params.initialValue
    });
    this.#params = params;
  }
  #observer = null;
  get observer() {
    if (this.#observer) {
      return this.#observer;
    }
    this.#observer = getClient().observe(this.#params);
    return this.#observer;
  }
  subscribe(...args) {
    const bubbleUp = this.#store.subscribe(...args);
    this.#subscriberCount = (this.#subscriberCount ?? 0) + 1;
    return () => {
      this.#subscriberCount--;
      if (this.#subscriberCount <= 0) {
        this.#unsubscribe?.();
        this.#unsubscribe = null;
        bubbleUp();
      }
    };
  }
  #subscriberCount = 0;
  setup(init = true) {
    let initPromise = Promise.resolve();
    try {
      getClient();
    } catch {
      initPromise = initClient();
    }
    initPromise.then(() => {
      if (this.#unsubscribe) {
        return;
      }
      this.#unsubscribe = this.observer.subscribe((value) => {
        this.#store.set(value);
      });
      if (init && this.#params.initialize) {
        return this.observer.send({
          setup: true,
          variables: get_store_value(this.observer).variables
        });
      }
    });
  }
}
class QueryStore extends BaseStore {
  variables;
  kind = CompiledQueryKind;
  loadPending = false;
  storeName;
  constructor({ artifact, storeName, variables }) {
    const fetching = artifact.pluginData["houdini-svelte"]?.isManualLoad !== true;
    super({
      artifact,
      fetching,
      initialize: !artifact.pluginData["houdini-svelte"].isManualLoad
    });
    this.storeName = storeName;
    this.variables = variables;
  }
  async fetch(args) {
    const client2 = await initClient();
    this.setup(false);
    const { policy, params, context } = await fetchParams(this.artifact, this.storeName, args);
    if (!(params && "fetch" in params) && (!params || !("event" in params))) {
      error(contextError(this.storeName));
      throw new Error("Error, check above logs for help.");
    }
    const isLoadFetch = Boolean("event" in params && params.event);
    const isComponentFetch = !isLoadFetch;
    if (this.loadPending && isComponentFetch) {
      error(`⚠️ Encountered fetch from your component while ${this.storeName}.load was running.
This will result in duplicate queries. If you are trying to ensure there is always a good value, please a CachePolicy instead.`);
      return get_store_value(this.observer);
    }
    if (isComponentFetch) {
      params.blocking = true;
    }
    const config2 = getCurrentConfig();
    const config_svelte = config2.plugins["houdini-svelte"];
    const pluginArtifact = this.artifact.pluginData["houdini-svelte"];
    if (client2.throwOnError_operations.includes("all") || client2.throwOnError_operations.includes("query")) {
      if (config_svelte.defaultRouteBlocking === false) {
        info(
          '[Houdini] ⚠️ throwOnError with operation "all" or "query", is not compatible with defaultRouteBlocking set to "false"'
        );
      }
    }
    if (config_svelte.defaultRouteBlocking === true) ;
    if (client2.throwOnError_operations.includes("all") || client2.throwOnError_operations.includes("query")) ;
    if (pluginArtifact?.set_blocking === true) ;
    else if (pluginArtifact?.set_blocking === false) ;
    if (params?.blocking === true) ;
    else if (params?.blocking === false) ;
    if (isLoadFetch) {
      this.loadPending = true;
    }
    const fakeAwait = clientStarted;
    const usedVariables = {
      ...this.artifact.input?.defaults,
      ...params.variables
    };
    const refersToCache = policy !== CachePolicy.NetworkOnly && policy !== CachePolicy.NoCache;
    if (refersToCache && fakeAwait) {
      await this.observer.send({
        fetch: context.fetch,
        variables: usedVariables,
        metadata: params.metadata,
        session: context.session,
        policy: CachePolicy.CacheOnly,
        silenceEcho: true
      });
    }
    const request = this.observer.send({
      fetch: context.fetch,
      variables: usedVariables,
      metadata: params.metadata,
      session: context.session,
      policy,
      stuff: {}
    });
    request.then((val) => {
      this.loadPending = false;
      params.then?.(val.data);
    }).catch(() => {
    });
    {
      await request;
    }
    return get_store_value(this.observer);
  }
}
async function fetchParams(artifact, storeName, params) {
  let policy = params?.policy;
  if (!policy && artifact.kind === ArtifactKind.Query) {
    policy = artifact.policy ?? CachePolicy.CacheOrNetwork;
  }
  let fetchFn = null;
  if (params) {
    if ("fetch" in params && params.fetch) {
      fetchFn = params.fetch;
    } else if ("event" in params && params.event && "fetch" in params.event) {
      fetchFn = params.event.fetch;
    }
  }
  if (!fetchFn) {
    fetchFn = globalThis.fetch.bind(globalThis);
  }
  let session = void 0;
  if (params && "event" in params && params.event) {
    session = await getSession(params.event);
  } else {
    error(contextError(storeName));
    throw new Error("Error, check above logs for help.");
  }
  return {
    context: {
      fetch: fetchFn,
      metadata: params?.metadata ?? {},
      session
    },
    policy,
    params: params ?? {}
  };
}
const contextError = (storeName) => `
	${red(`Missing event args in load function`)}.

Please remember to pass event to fetch like so:

import type { LoadEvent } from '@sveltejs/kit';

// in a load function...
export async function load(${yellow("event")}: LoadEvent) {
	return {
		...load_${storeName}({ ${yellow("event")}, variables: { ... } })
	};
}

// in a server-side mutation:
await mutation.mutate({ ... }, ${yellow("{ event }")})
`;

export { ArtifactKind as A, DocumentStore as D, QueryStore as Q, DataSource as a, getFieldsForType as b, cache_default as c, computeID as d, config as e, flatten as f, getCurrentConfig as g, deepEquals as h, initClient as i, keyFieldsForType as k, localApiEndpoint as l, marshalSelection as m, parseScalar as p };
//# sourceMappingURL=query-D5Q6wxqo.js.map
