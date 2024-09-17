export const parseImageUrl = (url) => {
  // Split the URL by "/" and filter out any empty segments
  const segments = url.split("/").filter(Boolean);
  // Join the last three segments to form the desired path
  return segments.slice(-3).join("/");
};
