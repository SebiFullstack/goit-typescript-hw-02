import axios from "axios";
import { ParamsType, UnsplashImage } from "./components/App/App.types";

const fetchImageWithUnsplash = async (
  query: string,
  params: ParamsType
): Promise<UnsplashImage> => {
  const API_KEY = "91mqVKUVeCMeRC2Vc9DbVvq20xf8RQvhmztw0o5zA8c";
  const { page = 1, perPage = 15 } = params;

  try {
    const { data } = await axios.get<UnsplashImage>(
      "https://api.unsplash.com/search/photos",
      {
        headers: {
          Authorization: `Client-ID ${API_KEY}`,
        },
        params: {
          query,
          page,
          per_page: perPage,
          orientation: "squarish",
          content_filter: "high",
        },
      }
    );
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching images from Unsplash:", error.message);
      throw error.message;
    } else {
      console.error("An unknown error occurred:", error);
      throw error;
    }
  }
};

export default fetchImageWithUnsplash;