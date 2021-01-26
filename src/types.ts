export interface MatchParams {
  name: string;
}

export interface ComponentMapping {
  id: string;
  name: React.FC;
}

export interface Item {
  createdAt: string;
  id: string;
  itemNameCro: string;
  itemNameEng: string;
  retailPrice: number;
  updatedAt: string;
  vat: number;
}
