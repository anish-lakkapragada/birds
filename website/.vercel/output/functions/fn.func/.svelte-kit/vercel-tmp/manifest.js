export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.bca50a83.js","app":"_app/immutable/entry/app.5aa52921.js","imports":["_app/immutable/entry/start.bca50a83.js","_app/immutable/chunks/index.d388f2cd.js","_app/immutable/chunks/singletons.40d75b77.js","_app/immutable/entry/app.5aa52921.js","_app/immutable/chunks/index.d388f2cd.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js'))
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
				id: "/[sciName]/[realName]",
				pattern: /^\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"sciName","optional":false,"rest":false,"chained":false},{"name":"realName","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/[sciName]/[realName]/guess",
				pattern: /^\/([^/]+?)\/([^/]+?)\/guess\/?$/,
				params: [{"name":"sciName","optional":false,"rest":false,"chained":false},{"name":"realName","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
