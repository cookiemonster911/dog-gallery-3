const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["+page.server.txt","favicon.png"]),
	mimeTypes: {".txt":"text/plain",".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.JaoTWIXO.js","app":"_app/immutable/entry/app.BE78cyuk.js","imports":["_app/immutable/entry/start.JaoTWIXO.js","_app/immutable/chunks/entry.Cll5SvkE.js","_app/immutable/chunks/scheduler.r5UgEgUv.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/entry/app.BE78cyuk.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/scheduler.r5UgEgUv.js","_app/immutable/chunks/index.D2EkJ-zn.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":true},
		nodes: [
			__memo(() => import('./chunks/0-DaRA0ks-.js')),
			__memo(() => import('./chunks/1-B81GjksZ.js')),
			__memo(() => import('./chunks/2-DQf-oLYD.js')),
			__memo(() => import('./chunks/3-CeSrzeHT.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/dog/[dogId]",
				pattern: /^\/dog\/([^/]+?)\/?$/,
				params: [{"name":"dogId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
