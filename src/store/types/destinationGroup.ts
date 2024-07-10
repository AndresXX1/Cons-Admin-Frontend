export interface EstablishmentInterface {
  id: number;
  name: string;
  img: string;
  info: string;
  tags: string[];
  status: "visible" | "idle" | "deleted";
  type: "shop" | "lodging";
}

export interface DestinationInterface {
  id: number;
  title: string;
  img: string;
  description: string;
  link_youtube: string;
  tags: string[];
  status: string;
  establishments: EstablishmentInterface[];
}
export interface DestinationGroupInterface {
  id: number;
  name: string;
  status: string;
  destinations: DestinationInterface[];
}
