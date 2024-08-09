import { populationType } from "@/types";
import axios from "axios";

const API_BASE_URL = "https://opendata.resas-portal.go.jp/api/v1";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "X-API-KEY": API_KEY },
});

export const fetchPrefectures = async () => {
  try {
    const response = await axiosInstance.get("/prefectures");
    return response.data.result;
  } catch (error) {
    console.error("Failed to fetch prefectures:", error);
    return [];
  }
};

interface PopulationData {
  label: string;
  data: { year: number; value: number }[];
}

export const fetchPopulationData = async (
  prefCode: number,
  populationType: populationType
) => {
  try {
    const response = await axiosInstance.get(
      `/population/composition/perYear?prefCode=${prefCode}`
    );
    const prefData = response.data.result.data.find(
      (d: PopulationData) => d.label === populationType
    );
    //
    const prefectures = await fetchPrefectures();
    const prefName =
      prefectures.find((pref: any) => pref.prefCode === prefCode)?.prefName ||
      "Unknown Prefecture";

    return {
      prefCode,
      prefName,
      data: prefData.data,
    };
  } catch (error) {
    console.error(
      `Failed to fetch population data for prefecture ${prefCode}:`,
      error
    );
    return null;
  }
};
