'use client';


import { fetchPrefectures } from "../../lib/api";
import { useState, useEffect } from "react";

const Home = () => {
  const [prefectures, setPrefectures] = useState<{ prefCode: number; prefName: string }[]>([]);
  const [selectedPrefecture, setSelectedPrefecture] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const getPrefectures = async () => {
      const data = await fetchPrefectures();
      setPrefectures(data);
      setIsLoading(false);
    };
    getPrefectures();
  }, []);

  const handleCheckboxChange = (prefCode: number) => {
    setSelectedPrefecture(prefCode);
  };

  if(isLoading) {
    return <div>Loading...</div>;
  }


  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="text-2xl font-bold mb-9 border border-white rounded p-2">都道府県一覧</div>
      <div className="flex flex-wrap justify-center max-w-8xl gap-4">
        {prefectures?.map((prefecture) => (
          <div key={prefecture.prefCode} className="flex items-center w-40 p-2 gap-3">
            <input
              type="checkbox"
              id={`pref-${prefecture.prefCode}`}
              name="prefecture"
              value={prefecture.prefCode}
              onChange={() => handleCheckboxChange(prefecture.prefCode)}
              className="w-5 h-5"
            />
            <label htmlFor={`pref-${prefecture.prefCode}`}>{prefecture.prefName}</label>
          </div>
        ))}
      </div>
      
    </main>
  );
};

export default Home;
