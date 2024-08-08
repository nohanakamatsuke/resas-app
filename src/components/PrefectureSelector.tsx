import { fetchPrefectures } from "@/lib/api";
import { prefecture } from "@/types";
import { useEffect, useState } from "react";

interface Props {
  selectedPrefectures: number[];
  onSelectionChange: (selected: number[]) => void;
}

export default function PrefectureSelector({
  selectedPrefectures,
  onSelectionChange,
}: Props) {
  const [prefectures, setPrefectures] = useState<prefecture[]>([]);

  useEffect(() => {
    fetchPrefectures().then(setPrefectures);
  }, []);

  const handleChange = (prefCode: number) => {
    const newSelection = selectedPrefectures.includes(prefCode)
      ? selectedPrefectures.filter((code) => code !== prefCode)
      : [...selectedPrefectures, prefCode];
    onSelectionChange(newSelection);
  };
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-6">
      {prefectures.map((pref) => (
        <label key={pref.prefCode} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selectedPrefectures.includes(pref.prefCode)}
            onChange={() => handleChange(pref.prefCode)}
            className="form-checkbox"
          />
          <span>{pref.prefName}</span>
        </label>
      ))}
    </div>
  );
}
