export const downloadCsv = async (collectionId: string) => {
  let response = await fetch(`/api/files/csv/${collectionId}`);
  let blob = await response.blob();
  let url = window.URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = url;
  a.download = `collectionId: ${collectionId}`;
  a.click();
};
