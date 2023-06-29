

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.f37ac0f5.js","_app/immutable/chunks/index.d388f2cd.js"];
export const stylesheets = ["_app/immutable/assets/0.10b562e2.css"];
export const fonts = [];
