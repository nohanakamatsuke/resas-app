import { fetchPopulationData } from "@/lib/api";
import { populationType } from "@/types";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
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

  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await Promise.all(
          selectedPrefectures.map((prefCode) =>
            fetchPopulationData(prefCode, populationType),
          ),
        );

        // null値を除外し、型を保証する
        const filteredData = newData.filter(
          (item): item is PopulationData => item !== null,
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

  // 10年ごとのティックを設定
  const ticks = [1970, 1980, 1990, 2000, 2010, 2020];

  // X軸の範囲を1970年から2020年に制限
  const chartData = data.flatMap((d) =>
    d.data.filter((item) => item.year >= 1970 && item.year <= 2020),
  );

  // 最大値を100万単位に丸める関数
  const roundToMillion = (value: number) => {
    return Math.ceil(value / 1000000) * 1000000;
  };

  // データの最大値を取得して丸める
  const maxDataValue =
    chartData.length > 0 ? Math.max(...chartData.map((d) => d.value)) : 0;
  const yAxisMax = roundToMillion(maxDataValue);

  // ダミーデータを追加してY軸を表示させる
  const dummyData = ticks.map((year) => ({ year, value: 0 }));

  return (
    <div className="w-full md:w-10/12">
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          width={1000}
          height={400}
          data={chartData.length ? chartData : dummyData}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            type="number"
            domain={[1970, 2020]}
            ticks={[1970, 1980, 1990, 2000, 2010, 2020]}
            tickFormatter={(value) => (value === 1970 ? "" : value)}
            tick={{ fontSize: isMobile ? 12 : 16 }} // スマホの時はフォントサイズを小さく
          />
          <YAxis
            width={isMobile ? 64 : 80}
            tickFormatter={(value) =>
              value === 0 ? "" : new Intl.NumberFormat("ja-JP").format(value)
            }
            domain={[0, yAxisMax]}
            tick={{ fontSize: isMobile ? 12 : 16 }} // スマホの時はフォントサイズを小さく
            tickCount={6} // メモリの数
          />
          <Tooltip />
          <Legend
            verticalAlign="bottom"
            align="center"
            layout="horizontal"
            formatter={(value) => (
              <span style={{ fontSize: isMobile ? 12 : 16 }}>{value}</span>
            )}
          />
          {data.length > 0 ? (
            data.map((prefData, index) => (
              <Line
                key={prefData.prefCode}
                type="monotone"
                data={prefData.data.filter(
                  (item) => item.year >= 1970 && item.year <= 2020,
                )}
                dataKey="value"
                name={prefData.prefName}
                stroke={`hsl(${index * 30}, 70%, 50%)`}
              />
            ))
          ) : (
            <Line
              type="monotone"
              data={dummyData}
              dataKey="value"
              stroke="transparent"
              name="No Data"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
