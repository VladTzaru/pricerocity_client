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

export interface ItemValues {
  itemNameCro: string;
  itemNameEng: string;
  retailPrice: number;
  vat: number;
}

export interface Buyer {
  name: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  phoneNumber?: string;
  type: "Privatno lice" | "Pravno lice" | null;
  vatNumber?: number;
}
