export async function load({ params, url }) {
  const { sciName, realName } = params;
  
  const imageUrl = url.searchParams.get("url");
  return {sciName: sciName, realName: realName, imageUrl: imageUrl}
}
