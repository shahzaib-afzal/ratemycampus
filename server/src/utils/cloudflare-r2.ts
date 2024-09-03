export const uploadImage = async (
  file: File,
  env: Bindings,
  fileName: string
) => {
  const image = await file.arrayBuffer();
  await env.RMC_BUCKET.put(fileName, image);
  const imageUrl = `${env.R2_DEV}/${fileName}`;
  return imageUrl;
};
