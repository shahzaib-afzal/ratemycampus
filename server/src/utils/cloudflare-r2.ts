export const uploadImage = async (
  file: File,
  env: Bindings,
  id: number,
  folderName: string
) => {
  const fileName = `${folderName}/profileImg${id}`;
  const image = await file.arrayBuffer();
  await env.RMC_BUCKET.put(fileName, image);
  const imageUrl = `${env.R2_DEV}/${fileName}`;
  return imageUrl;
};
