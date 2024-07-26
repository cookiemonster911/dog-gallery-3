import { g as get_store_value } from './utils-CC34fe4r.js';
import { e as error$1, r as redirect$1 } from './index-DzcLzHBX.js';

let clientStarted = false;
const error = error$1;
const redirect = redirect$1;
const sessionKeyName = "__houdini__session__";
class RequestContext {
  loadEvent;
  continue = true;
  returnValue = {};
  constructor(ctx) {
    this.loadEvent = ctx;
  }
  error(status, message) {
    throw error(status, typeof message === "string" ? message : message.message);
  }
  redirect(status, location) {
    throw redirect(status, location);
  }
  fetch(input, init) {
    const fetch = typeof window !== "undefined" ? this.loadEvent.fetch.bind(window) : this.loadEvent.fetch;
    return fetch(input, init);
  }
  async invokeLoadHook({
    variant,
    hookFn,
    input,
    data,
    error: error2
  }) {
    let hookCall;
    if (variant === "before") {
      hookCall = hookFn.call(this, this.loadEvent);
    } else if (variant === "after") {
      hookCall = hookFn.call(this, {
        event: this.loadEvent,
        input,
        data: Object.fromEntries(
          Object.entries(data).map(([key, store]) => [
            key,
            get_store_value(store).data
          ])
        )
      });
    } else if (variant === "error") {
      hookCall = hookFn.call(this, {
        event: this.loadEvent,
        input,
        error: error2
      });
    }
    let result = await hookCall;
    if (!this.continue) {
      return;
    }
    if (result == null || typeof result !== "object") {
      return;
    }
    this.returnValue = result;
  }
}
const sessionSentinel = {};
let session = sessionSentinel;
function extractSession(val) {
  return val[sessionKeyName];
}
function buildSessionObject(event) {
  return {
    [sessionKeyName]: extractSession(event.locals)
  };
}
function setClientSession(val) {
  {
    return;
  }
}
async function getSession(event) {
  if (event) {
    if ("locals" in event) {
      return extractSession(event.locals) || sessionSentinel;
    } else if ("data" in event && event.data && sessionKeyName in event.data) {
      return extractSession(event.data) || sessionSentinel;
    } else {
      return extractSession(await event.parent()) || sessionSentinel;
    }
  }
  return session;
}

export { RequestContext as R, buildSessionObject as b, clientStarted as c, extractSession as e, getSession as g, setClientSession as s };
//# sourceMappingURL=session-DOLr7m4p.js.map
