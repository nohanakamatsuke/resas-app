"use client";

import PopulationGraph from "@/components/PopulationGraph";
import PopulationTypeSelector from "@/components/PopulationTypeSelector";
import PrefectureSelector from "@/components/PrefectureSelector";
import { fetchPopulationData, fetchPrefectures } from "@/lib/api";
import { populationType } from "@/types";

import { useState, useEffect } from "react";

const Home = () => {
  const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([]);
  const [populationType, setPopulationType] =
    useState<populationType>("総人口");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const initializeData = async () => {
      try {
        const prefectures = await fetchPrefectures();
        // 他の初期化処理があればここに追加
      } catch (error) {
        console.error("初期化に失敗しました:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="text-xl font-bold mb-9 border border-white rounded p-2">
        都道府県一覧
      </div>
      <div className="flex flex-wrap justify-center max-w-10xl gap-4">
        <PrefectureSelector
          selectedPrefectures={selectedPrefectures}
          onSelectionChange={setSelectedPrefectures}
        />
        <div className="flex gap-10">
          <PopulationGraph
            selectedPrefectures={selectedPrefectures}
            populationType={populationType}
          />
          <PopulationTypeSelector
            selectedType={populationType}
            onTypeChange={setPopulationType}
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
