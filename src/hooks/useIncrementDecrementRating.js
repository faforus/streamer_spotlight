const useRatingUpdater = (callback) => {
  const incrementDecrementRating = async (id, type) => {
    const url = `https://us-central1-wielechowski-me.cloudfunctions.net/proxyUserData?id=${id}&type=${type}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      if (typeof callback === "function") {
        callback(data.rating);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return { incrementDecrementRating };
};

export default useRatingUpdater;
