export interface prefecture {
  prefCode: number;
  prefName: string;
}

export type populationType =
  | "総人口"
  | "年少人口"
  | "生産年齢人口"
  | "老年人口";
