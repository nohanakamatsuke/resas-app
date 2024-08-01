import axios from "axios";

const API_BASE_URL = 'https://opendata.resas-portal.go.jp/api/v1'
const API_KEY = process.env.NEXT_PUBLIC_API_KEY

export const fetchPrefectures = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/prefectures`, {
        headers: {
          'X-API-KEY': API_KEY,
        },
      })
      return response.data.result
    } catch (error) {
      console.error('Failed to fetch prefectures:', error)
      return []
    }
}