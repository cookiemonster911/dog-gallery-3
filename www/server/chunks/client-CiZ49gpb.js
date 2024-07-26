import { p as public_env } from './shared-server-i79vVjEm.js';
import { l as localApiEndpoint, g as getCurrentConfig, f as flatten, c as cache_default, D as DocumentStore, A as ArtifactKind, a as DataSource, b as getFieldsForType, m as marshalSelection, d as computeID, e as config, k as keyFieldsForType, h as deepEquals } from './query-D5Q6wxqo.js';
import './index-DzcLzHBX.js';
import './utils-CC34fe4r.js';
import './session-DOLr7m4p.js';

const fetch = (target) => {
  return () => {
    return {
      async network(ctx, { client: client2, initialValue, resolve, marshalVariables }) {
        if (ctx.artifact.kind === ArtifactKind.Fragment) {
          return resolve(ctx, initialValue);
        }
        const fetch2 = ctx.fetch ?? globalThis.fetch;
        const fetchParams2 = {
          name: ctx.name,
          text: ctx.text,
          hash: ctx.hash,
          variables: marshalVariables(ctx)
        };
        let fetchFn = defaultFetch(client2.url, ctx.fetchParams);
        const result = await fetchFn({
          fetch: (url, args) => {
            const newArgs = handleMultipart(fetchParams2, args) ?? args;
            return fetch2(url, newArgs);
          },
          metadata: ctx.metadata,
          session: ctx.session || {},
          ...fetchParams2
        });
        resolve(ctx, {
          fetching: false,
          variables: ctx.variables ?? {},
          data: result.data,
          errors: !result.errors || result.errors.length === 0 ? null : result.errors,
          partial: false,
          stale: false,
          source: DataSource.Network
        });
      }
    };
  };
};
const defaultFetch = (url, params) => {
  if (!url) {
    throw new Error(
      "Could not find configured client url. Please specify one in your HoudiniClient constructor."
    );
  }
  return async ({ fetch: fetch2, name, text, variables }) => {
    const result = await fetch2(url, {
      method: "POST",
      body: JSON.stringify({ operationName: name, query: text, variables }),
      ...params,
      headers: {
        Accept: "application/graphql+json, application/json",
        "Content-Type": "application/json",
        ...params?.headers
      }
    });
    return await result.json();
  };
};
function handleMultipart(params, args) {
  const { files } = extractFiles({
    variables: params.variables
  });
  if (files.size) {
    const req = args;
    let headers = {};
    if (req?.headers) {
      const filtered = Object.entries(req?.headers).filter(([key, value]) => {
        return !(key.toLowerCase() == "content-type" && value.toLowerCase() == "application/json");
      });
      headers = Object.fromEntries(filtered);
    }
    const form = new FormData();
    if (args && args?.body) {
      form.set("operations", args?.body);
    } else {
      form.set(
        "operations",
        JSON.stringify({
          operationName: params.name,
          query: params.text,
          variables: params.variables
        })
      );
    }
    const map = {};
    let i = 0;
    files.forEach((paths) => {
      map[++i] = paths;
    });
    form.set("map", JSON.stringify(map));
    i = 0;
    files.forEach((paths, file) => {
      form.set(`${++i}`, file, file.name);
    });
    return { ...req, headers, body: form };
  }
}
function isExtractableFile(value) {
  return typeof File !== "undefined" && value instanceof File || typeof Blob !== "undefined" && value instanceof Blob;
}
function extractFiles(value) {
  if (!arguments.length)
    throw new TypeError("Argument 1 `value` is required.");
  const clones = /* @__PURE__ */ new Map();
  const files = /* @__PURE__ */ new Map();
  function recurse(value2, path, recursed) {
    if (isExtractableFile(value2)) {
      const filePaths = files.get(value2);
      filePaths ? filePaths.push(path) : files.set(value2, [path]);
      return null;
    }
    const valueIsList = Array.isArray(value2) || typeof FileList !== "undefined" && value2 instanceof FileList;
    const valueIsPlainObject = isPlainObject(value2);
    if (valueIsList || valueIsPlainObject) {
      let clone = clones.get(value2);
      const uncloned = !clone;
      if (uncloned) {
        clone = valueIsList ? [] : value2 instanceof Object ? {} : /* @__PURE__ */ Object.create(null);
        clones.set(value2, clone);
      }
      if (!recursed.has(value2)) {
        const pathPrefix = path ? `${path}.` : "";
        const recursedDeeper = new Set(recursed).add(value2);
        if (valueIsList) {
          let index = 0;
          for (const item of value2) {
            const itemClone = recurse(item, pathPrefix + index++, recursedDeeper);
            if (uncloned)
              clone.push(itemClone);
          }
        } else
          for (const key in value2) {
            const propertyClone = recurse(value2[key], pathPrefix + key, recursedDeeper);
            if (uncloned)
              clone[key] = propertyClone;
          }
      }
      return clone;
    }
    return value2;
  }
  return {
    clone: recurse(value, "", /* @__PURE__ */ new Set()),
    files
  };
}
function isPlainObject(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
}
const documentPlugin = (kind, source) => {
  return () => {
    const sourceHandlers = source();
    const enterWrapper = (handler) => {
      return !handler ? void 0 : (ctx, handlers) => {
        if (ctx.artifact.kind !== kind) {
          return handlers.next(ctx);
        }
        return handler(ctx, handlers);
      };
    };
    const exitWrapper = (handler) => {
      return !handler ? void 0 : (ctx, handlers) => {
        if (ctx.artifact.kind !== kind) {
          return handlers.resolve(ctx);
        }
        return handler(ctx, handlers);
      };
    };
    return {
      start: enterWrapper(sourceHandlers.start),
      network: enterWrapper(sourceHandlers.network),
      beforeNetwork: enterWrapper(sourceHandlers.beforeNetwork),
      afterNetwork: exitWrapper(sourceHandlers.afterNetwork),
      end: exitWrapper(sourceHandlers.end),
      catch: sourceHandlers.catch ? (ctx, handlers) => sourceHandlers.catch(ctx, handlers) : void 0,
      cleanup: (...args) => sourceHandlers.cleanup?.(...args)
    };
  };
};
const query = (cache) => documentPlugin(ArtifactKind.Query, function() {
  let subscriptionSpec = null;
  let lastVariables = null;
  return {
    start(ctx, { next }) {
      const runtimeScalarPayload = {
        session: ctx.session
      };
      ctx.variables = {
        ...lastVariables,
        ...Object.fromEntries(
          Object.entries(ctx.artifact.input?.runtimeScalars ?? {}).map(
            ([field, type]) => {
              const runtimeScalar = ctx.config.features?.runtimeScalars?.[type];
              if (!runtimeScalar) {
                return [field, type];
              }
              return [field, runtimeScalar.resolve(runtimeScalarPayload)];
            }
          )
        ),
        ...ctx.variables
      };
      next(ctx);
    },
    end(ctx, { resolve, marshalVariables, variablesChanged }) {
      if (variablesChanged(ctx) && !ctx.cacheParams?.disableSubscriptions) {
        if (subscriptionSpec) {
          cache.unsubscribe(subscriptionSpec, subscriptionSpec.variables?.() || {});
        }
        lastVariables = { ...marshalVariables(ctx) };
        const variables = lastVariables;
        subscriptionSpec = {
          rootType: ctx.artifact.rootType,
          selection: ctx.artifact.selection,
          variables: () => variables,
          set: (newValue) => {
            resolve(ctx, {
              data: newValue,
              errors: null,
              fetching: false,
              partial: false,
              stale: false,
              source: DataSource.Cache,
              variables: ctx.variables ?? {}
            });
          }
        };
        cache.subscribe(subscriptionSpec, lastVariables);
      }
      resolve(ctx);
    },
    cleanup() {
      if (subscriptionSpec) {
        cache.unsubscribe(subscriptionSpec, subscriptionSpec.variables?.());
        lastVariables = null;
      }
    }
  };
});
const fragment = (cache) => documentPlugin(ArtifactKind.Fragment, function() {
  let subscriptionSpec = null;
  let lastReference = null;
  return {
    start(ctx, { next, resolve, variablesChanged, marshalVariables }) {
      if (!ctx.stuff.parentID) {
        return next(ctx);
      }
      const currentReference = {
        parent: ctx.stuff.parentID,
        variables: marshalVariables(ctx)
      };
      if (!ctx.cacheParams?.disableSubscriptions && (!deepEquals(lastReference, currentReference) || variablesChanged(ctx))) {
        if (subscriptionSpec) {
          cache.unsubscribe(subscriptionSpec, subscriptionSpec.variables?.() || {});
        }
        const variables = marshalVariables(ctx);
        subscriptionSpec = {
          rootType: ctx.artifact.rootType,
          selection: ctx.artifact.selection,
          variables: () => variables,
          parentID: ctx.stuff.parentID,
          set: (newValue) => {
            resolve(ctx, {
              data: newValue,
              errors: null,
              fetching: false,
              partial: false,
              stale: false,
              source: DataSource.Cache,
              variables
            });
          }
        };
        cache.subscribe(subscriptionSpec, variables);
        lastReference = currentReference;
      }
      next(ctx);
    },
    cleanup() {
      if (subscriptionSpec) {
        cache.unsubscribe(subscriptionSpec, subscriptionSpec.variables?.());
      }
    }
  };
});
const mutation = (cache) => documentPlugin(ArtifactKind.Mutation, () => {
  return {
    async start(ctx, { next, marshalVariables }) {
      const layerOptimistic = cache._internal_unstable.storage.createLayer(true);
      let toNotify = [];
      const optimisticResponse = ctx.stuff.optimisticResponse;
      if (optimisticResponse) {
        toNotify = cache.write({
          selection: ctx.artifact.selection,
          data: await marshalSelection({
            selection: ctx.artifact.selection,
            data: optimisticResponse
          }),
          variables: marshalVariables(ctx),
          layer: layerOptimistic.id
        });
      }
      ctx.cacheParams = {
        ...ctx.cacheParams,
        layer: layerOptimistic,
        notifySubscribers: toNotify,
        forceNotify: true
      };
      next(ctx);
    },
    afterNetwork(ctx, { resolve }) {
      if (ctx.cacheParams?.layer) {
        cache.clearLayer(ctx.cacheParams.layer.id);
      }
      resolve(ctx);
    },
    end(ctx, { resolve, value }) {
      const hasErrors = value.errors && value.errors.length > 0;
      if (hasErrors) {
        if (ctx.cacheParams?.layer) {
          cache.clearLayer(ctx.cacheParams.layer.id);
        }
      }
      if (ctx.cacheParams?.layer) {
        cache._internal_unstable.storage.resolveLayer(ctx.cacheParams.layer.id);
      }
      resolve(ctx);
    },
    catch(ctx, { error }) {
      if (ctx.cacheParams?.layer) {
        const { layer } = ctx.cacheParams;
        cache.clearLayer(layer.id);
        cache._internal_unstable.storage.resolveLayer(layer.id);
      }
      throw error;
    }
  };
});
const throwOnError = ({ operations, error }) => () => {
  const all = operations.includes("all");
  const throwOnKind = (kind) => all || {
    [ArtifactKind.Query]: operations.includes("query"),
    [ArtifactKind.Mutation]: operations.includes("mutation"),
    [ArtifactKind.Fragment]: false,
    [ArtifactKind.Subscription]: operations.includes("subscription")
  }[kind];
  return {
    async end(ctx, { value, resolve }) {
      if (value.errors && value.errors.length > 0 && throwOnKind(ctx.artifact.kind)) {
        const result = await (error ?? defaultErrorFn)(value.errors, ctx);
        throw result;
      }
      resolve(ctx);
    }
  };
};
const defaultErrorFn = async (errors) => new Error(errors.map((error) => error.message).join(". ") + ".");
const fetchParams = (fn = () => ({})) => () => ({
  start(ctx, { next, marshalVariables }) {
    next({
      ...ctx,
      fetchParams: fn({
        config: ctx.config,
        policy: ctx.policy,
        metadata: ctx.metadata,
        session: ctx.session,
        stuff: ctx.stuff,
        document: ctx.artifact,
        variables: marshalVariables(ctx),
        text: ctx.text,
        hash: ctx.hash
      })
    });
  }
});
const keys = {};
const callbacks = {};
const objectIDMap = {};
const optimisticKeys = (cache, callbackCache = callbacks, keyCache = keys, objectIDs = objectIDMap, invocationCounter = 1) => () => {
  return {
    async start(ctx, { next }) {
      const optimisticResponse = ctx.stuff.optimisticResponse;
      const newCtx = { ...ctx };
      if (optimisticResponse && ctx.artifact.kind === ArtifactKind.Mutation && ctx.artifact.optimisticKeys) {
        newCtx.stuff.mutationID = invocationCounter++;
        addKeysToResponse({
          selection: ctx.artifact.selection,
          response: optimisticResponse,
          callbackStore: callbackCache,
          keyStore: keyCache,
          objectIDs,
          mutationID: newCtx.stuff.mutationID
        });
        newCtx.stuff.optimisticResponse = optimisticResponse;
      }
      next(newCtx);
    },
    beforeNetwork(ctx, { next }) {
      if (Object.keys(keyCache).length === 0) {
        return next(ctx);
      }
      const pendingVariables = extractInputKeys(
        ctx.variables ?? {},
        callbackCache
      );
      if (Object.keys(pendingVariables).length === 0) {
        return next(ctx);
      }
      for (const key of Object.keys(pendingVariables)) {
        callbackCache[key].push((newID) => {
          pendingVariables[key] = newID;
          if (Object.values(pendingVariables).every((value) => value !== null)) {
            next({
              ...ctx,
              variables: replaceKeyWithVariable(
                { ...ctx.variables },
                pendingVariables
              )
            });
          }
        });
      }
    },
    afterNetwork(ctx, { value, resolve }) {
      if (ctx.artifact.kind === ArtifactKind.Mutation && ctx.artifact.optimisticKeys && typeof ctx.stuff.mutationID !== "undefined") {
        extractResponseKeys(
          cache,
          value.data ?? {},
          ctx.artifact.selection,
          keyCache,
          ctx.stuff.mutationID,
          {
            onNewKey: (optimisticValue, realValue) => {
              callbackCache[optimisticValue].forEach((cb) => {
                cb(realValue);
              });
              delete callbackCache[optimisticValue];
            },
            onIDChange: (optimisticValue, realValue) => cache.registerKeyMap(optimisticValue, realValue)
          }
        );
      }
      resolve(ctx);
    },
    end(ctx, { resolve }) {
      if (typeof ctx.stuff.mutationID !== "undefined") {
        delete keyCache[ctx.stuff.mutationID];
        delete objectIDs[ctx.stuff.mutationID];
      }
      resolve(ctx);
    }
  };
};
function addKeysToResponse(args) {
  let targetSelection = getFieldsForType(
    args.selection,
    args.response["__typename"],
    false
  );
  const newKeys = [];
  for (const [field, { type, selection: fieldSelection, optimisticKey }] of Object.entries(
    targetSelection
  )) {
    const value = args.response[field];
    const pathSoFar = `${args.path ?? ""}.${field}`;
    if (optimisticKey) {
      let keyValue;
      if (value) {
        const { marshaled } = marshalSelection({
          data: { marshaled: value },
          selection: {
            fields: {
              value: {
                type,
                keyRaw: "value"
              }
            }
          }
        });
        keyValue = marshaled;
      } else {
        keyValue = generateKey(type);
      }
      newKeys.push(keyValue);
      args.response[field] = keyValue;
      args.callbackStore[keyValue] = [];
      args.keyStore[args.mutationID] = {
        [pathSoFar]: keyValue
      };
    }
    if (fieldSelection) {
      if (Array.isArray(value)) {
        for (const [index, item] of flattenList(value).entries()) {
          if (item && typeof item === "object" && !Array.isArray(item)) {
            addKeysToResponse({
              ...args,
              selection: fieldSelection,
              response: item,
              type,
              path: `${pathSoFar}[${index}]`
            });
          }
        }
      } else if (value && typeof value == "object") {
        addKeysToResponse({
          ...args,
          selection: fieldSelection,
          response: value,
          type,
          path: pathSoFar
        });
      }
    }
  }
  if (newKeys.length > 0) {
    const objID = `${args.type}:${computeID(config, args.type ?? "", args.response)}`;
    for (const key of newKeys) {
      args.objectIDs[args.mutationID] = {
        ...args.objectIDs[args.mutationID],
        [key]: objID
      };
    }
  }
  return args.response;
}
function extractInputKeys(obj, store, found = {}) {
  for (const value of Object.values(obj)) {
    if (typeof value === "string" && store[value]) {
      found[value] = null;
    }
    if (Array.isArray(value)) {
      for (const item of flattenList(value)) {
        if (item && typeof item === "object") {
          extractInputKeys(item, store, found);
        }
      }
    } else if (value && typeof value === "object") {
      extractInputKeys(value, store, found);
    }
  }
  return found;
}
function extractResponseKeys(cache, response, selection, keyMap, mutationID, events, objectIDs = objectIDMap, path = "", type = "") {
  let targetSelection = getFieldsForType(
    selection,
    response["__typename"],
    false
  );
  let optimisticID = null;
  for (const [field, value] of Object.entries(response)) {
    const pathSoFar = `${path ?? ""}.${field}`;
    if (typeof value === "string" && keyMap[mutationID][pathSoFar]) {
      const newKey = keyMap[mutationID][pathSoFar];
      events.onNewKey(newKey, value);
      optimisticID = objectIDs[mutationID][newKey];
    }
    if (!selection || !targetSelection[field]) {
      continue;
    }
    let { type: type2, selection: fieldSelection } = targetSelection[field];
    if (Array.isArray(value)) {
      for (const [index, item] of flattenList(value).entries()) {
        if (item && typeof item === "object" && fieldSelection) {
          extractResponseKeys(
            cache,
            item,
            fieldSelection,
            keyMap,
            mutationID,
            events,
            objectIDs,
            `${pathSoFar}[${index}]`,
            type2
          );
        }
      }
    } else if (value && typeof value === "object" && fieldSelection) {
      extractResponseKeys(
        cache,
        value,
        fieldSelection,
        keyMap,
        mutationID,
        events,
        objectIDs,
        pathSoFar,
        type2
      );
    }
  }
  if (optimisticID) {
    const id = computeID(config, type, response);
    events.onIDChange(`${type}:${id}`, optimisticID);
    cache.write({
      selection: {
        fields: Object.fromEntries(
          keyFieldsForType(config, type).map((key) => [
            key,
            {
              type: "scalar",
              keyRaw: key
            }
          ])
        )
      },
      parent: optimisticID,
      data: response
    });
  }
}
function flattenList(source) {
  const result = [];
  const left = [...source];
  while (left.length > 0) {
    const head = left.shift();
    if (Array.isArray(head)) {
      left.push(...head);
    } else {
      result.push(head);
    }
  }
  return result;
}
function replaceKeyWithVariable(variables, keys2) {
  for (const [key, value] of Object.entries(variables)) {
    if (typeof value === "string" && keys2[value]) {
      variables[key] = keys2[value];
    }
    if (Array.isArray(value)) {
      for (const item of flattenList(value)) {
        if (item && typeof item === "object") {
          replaceKeyWithVariable(item, keys2);
        }
      }
    } else if (value && typeof value === "object") {
      replaceKeyWithVariable(value, keys2);
    }
  }
  return variables;
}
function generateKey(type) {
  if (type === "Int") {
    return (/* @__PURE__ */ new Date()).getTime();
  }
  if (type === "String") {
    return (/* @__PURE__ */ new Date()).getTime().toString();
  }
  if (type === "ID") {
    return (/* @__PURE__ */ new Date()).getTime().toString();
  }
  throw new Error(
    `unsupported type for optimistic key: ${type}. Please provide a value in your mutation arguments.`
  );
}
const plugins = [];
var injectedPlugins_default = plugins;
class HoudiniClient {
  url;
  throwOnError_operations;
  cache = null;
  throwOnError;
  fetchParams;
  pipeline;
  extraPlugins;
  proxies = {};
  componentCache = {};
  setCache(cache) {
    this.cache = cache;
  }
  constructor({
    url,
    fetchParams: fetchParams2,
    plugins: plugins2,
    pipeline,
    throwOnError: throwOnError2
  } = {}) {
    if (plugins2 && pipeline) {
      throw new Error(
        "A client cannot be given a pipeline and a list of plugins at the same time."
      );
    }
    this.throwOnError_operations = throwOnError2?.operations ?? [];
    let serverPort = globalThis.process?.env?.HOUDINI_PORT ?? "5173";
    this.url = url ?? (globalThis.window ? "" : `https://localhost:${serverPort}`) + localApiEndpoint(getCurrentConfig());
    this.throwOnError = throwOnError2;
    this.fetchParams = fetchParams2;
    this.pipeline = pipeline;
    this.extraPlugins = plugins2;
  }
  get plugins() {
    return flatten(
      [].concat(
        this.throwOnError ? [throwOnError(this.throwOnError)] : [],
        fetchParams(this.fetchParams),
        this.pipeline ?? [
          optimisticKeys(this.cache ?? cache_default),
          query(this.cache ?? cache_default),
          mutation(this.cache ?? cache_default),
          fragment(this.cache ?? cache_default)
        ].concat(
          this.extraPlugins ?? [],
          injectedPlugins_default,
          fetch()
        )
      )
    );
  }
  observe({
    enableCache = true,
    fetching = false,
    ...rest
  }) {
    return new DocumentStore({
      client: this,
      plugins: createPluginHooks(this.plugins),
      fetching,
      enableCache,
      cache: this.cache ?? void 0,
      ...rest
    });
  }
  registerProxy(url, handler) {
    this.proxies[url] = handler;
  }
}
function createPluginHooks(plugins2) {
  return plugins2.reduce((hooks, plugin) => {
    if (typeof plugin !== "function") {
      throw new Error("Encountered client plugin that's not a function");
    }
    const result = plugin();
    if (!result) {
      return hooks;
    }
    if (!Array.isArray(result)) {
      return hooks.concat(result);
    }
    for (const value of result) {
      if (!value) {
        continue;
      }
      if (typeof value === "function") {
        return hooks.concat(createPluginHooks([value]));
      }
      hooks.push(value);
    }
    return hooks;
  }, []);
}
const client = new HoudiniClient({
  url: public_env.PUBLIC_API_URL
});

export { client as default };
//# sourceMappingURL=client-CiZ49gpb.js.map
