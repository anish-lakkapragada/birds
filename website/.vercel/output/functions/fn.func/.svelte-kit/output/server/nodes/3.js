import * as server from '../entries/pages/_sciName_/_realName_/_page.server.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_sciName_/_realName_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/[sciName]/[realName]/+page.server.js";
export const imports = ["_app/immutable/nodes/3.91d98c3a.js","_app/immutable/chunks/index.d388f2cd.js"];
export const stylesheets = ["_app/immutable/assets/3.f76ac12e.css"];
export const fonts = [];
