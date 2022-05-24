export const getCategorizedVideos = (videos, categoryName) => {
  return categoryName === "All" || !categoryName
    ? videos
    : videos.filter((video) => video.category === categoryName);
};
