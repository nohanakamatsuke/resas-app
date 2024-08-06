import { fetchPopulationData } from "@/lib/api";
import { populationType } from "@/types";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  selectedPrefectures: number[];
  populationType: populationType;
}

interface PopulationData {
  prefCode: number;
  prefName: string;
  data: { year: number; value: number }[];
}

export default function PopulationGraph({
  selectedPrefectures,
  populationType,
}: Props) {
  const [data, setData] = useState<PopulationData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await Promise.all(
          selectedPrefectures.map((prefCode) =>
            fetchPopulationData(prefCode, populationType)
          )
        );

        // null値を除外し、型を保証する
        const filteredData = newData.filter(
          (item): item is PopulationData => item !== null
        );
        setData(filteredData);
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
        // エラーハンドリング追加
      }
    };

    if (selectedPrefectures.length > 0) {
      fetchData();
    } else {
      setData([]);
    }
  }, [selectedPrefectures, populationType]);

  if (data.length === 0) {
    return <p>都道府県を選択してください。</p>;
  }

  const years = Array.from(
    new Set(data.flatMap((d) => d.data.map((item) => item.year)))
  ).sort((a, b) => a - b);

  return (
    <div className="">
      <LineChart width={800} height={400}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="year"
          type="number"
          domain={["dataMin", "dataMax"]}
          tickCount={10}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        {data.map((prefData, index) => (
          <Line
            key={prefData.prefCode}
            type="monotone"
            data={prefData.data}
            dataKey="value"
            name={prefData.prefName}
            stroke={`hsl(${index * 30}, 70%, 50%)`}
          />
        ))}
      </LineChart>
    </div>
  );
}
