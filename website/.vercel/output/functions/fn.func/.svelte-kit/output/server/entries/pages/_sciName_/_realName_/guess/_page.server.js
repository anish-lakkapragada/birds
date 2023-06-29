async function load({ params, url }) {
  const { sciName, realName } = params;
  const imageUrl = url.searchParams.get("url");
  return { sciName, realName, imageUrl };
}
export {
  load
};
