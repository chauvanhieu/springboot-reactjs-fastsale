export const paginnation = (data, pageIndex) => {
  const limit = 7;
  const startIndex = (pageIndex - 1) * limit;
  const endIndex = startIndex + limit;
  const currentPageData = data.slice(startIndex, endIndex);
};
