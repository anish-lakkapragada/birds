

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.8f9d8fd7.js","_app/immutable/chunks/index.d388f2cd.js","_app/immutable/chunks/singletons.40d75b77.js"];
export const stylesheets = [];
export const fonts = [];
