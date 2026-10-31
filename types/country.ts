export type CountryCoordinate = {
  lat: number;
  lng: number;
};

export type CountryFlag = {
  emoji: string | null;
  svgUrl: string | null;
  pngUrl: string | null;
  description: string | null;
};

export type CountryCurrency = {
  code: string | null;
  name: string | null;
  symbol: string | null;
};

export type CountryLanguage = {
  name: string;
  nativeName: string | null;
  iso6391: string | null;
  iso6393: string | null;
};

export type Country = {
  code: string;
  alpha3Code: string | null;
  name: string;
  officialName: string | null;
  capitals: string[];
  region: string | null;
  subregion: string | null;
  population: number | null;
  coordinates: CountryCoordinate | null;
  flag: CountryFlag;
  languages: CountryLanguage[];
  currencies: CountryCurrency[];
};