import * as server from '../entries/pages/_sciName_/_realName_/guess/_page.server.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_sciName_/_realName_/guess/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/[sciName]/[realName]/guess/+page.server.js";
export const imports = ["_app/immutable/nodes/4.23ea1023.js","_app/immutable/chunks/index.d388f2cd.js","_app/immutable/chunks/singletons.40d75b77.js"];
export const stylesheets = ["_app/immutable/assets/4.2aa8651d.css"];
export const fonts = [];
