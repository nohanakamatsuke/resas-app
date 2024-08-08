import React from "react";
import { populationType } from "@/types";

interface Props {
  selectedType: populationType;
  onTypeChange: (type: populationType) => void;
}

export default function PopulationTypeSelector({
  selectedType,
  onTypeChange,
}: Props) {
  const types: populationType[] = [
    "総人口",
    "年少人口",
    "生産年齢人口",
    "老年人口",
  ];

  return (
    <div className="mb-6">
      <h3 className="font-bold mb-2">人口タイプ</h3>
      <div className="flex flex-col flex-wrap gap-4">
        {types.map((type) => (
          <label key={type} className="flex items-center space-x-2">
            <input
              type="radio"
              value={type}
              checked={selectedType === type}
              onChange={() => onTypeChange(type)}
              className="form-radio"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
