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
    <main className="flex min-h-screen flex-col items-center">
      <div className="text-xs hidden sm:block md:text-base  mb-3 md:mb-6 border border-white rounded p-1">
        都道府県一覧
      </div>
      <div className="flex flex-wrap justify-center max-w-15xl gap-4">
        <PrefectureSelector
          selectedPrefectures={selectedPrefectures}
          onSelectionChange={setSelectedPrefectures}
        />
        <div className="md:flex md:flex-row-reverse gap-5 justify-center">
          <PopulationTypeSelector
            selectedType={populationType}
            onTypeChange={setPopulationType}
          />
          <PopulationGraph
            selectedPrefectures={selectedPrefectures}
            populationType={populationType}
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
