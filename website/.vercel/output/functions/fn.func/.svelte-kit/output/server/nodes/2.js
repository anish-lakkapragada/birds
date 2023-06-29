

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.8a3c447f.js","_app/immutable/chunks/index.d388f2cd.js"];
export const stylesheets = [];
export const fonts = [];
