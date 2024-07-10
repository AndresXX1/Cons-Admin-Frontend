import { ClubProps } from "@pages/Clubs/Club";

export enum ROLE {
  ADMIN = "admin",
  USER = "user",
  OWNER = "owner",
}

export enum Genre {
  MALE = "Hombre",
  FEMALE = "Mujer",
}

export type FollowProps = {
  create: Date;
  update: Date;
  id: number;
  follow: UserProps;
  follower: UserProps;
};

export type ReviewProps = {
  id: number;
  create: Date;
  update: Date;
  text: string;
  score: number;
  author: UserProps;
  reviewedUser: UserProps;
};

export type MatchResultsProps = {
  id: number;
  club: ClubProps;
  date: Date;
  winners: UserProps[];
  winners_results: number[];
  lossers: UserProps[];
  lossers_results: number[];
  approval_counter: number;
  approved: boolean;
  create: Date;
  update: Date;
};

export type UserProps = {
  id: number;
  create: string;
  update: string;
  email: string;
  email_verified: boolean;
  completed_form: boolean;
  completed_profile: boolean;
  completed_welcome_form: boolean;
  avatar: string | null;
  role: ROLE;
  last_login: string;
  first_name: string;
  last_name: string;
  points: number;
  phone: string;
  genre: Genre;
  date: Date | null;
  events: EventsProps[];
  followers: FollowProps[];
  following: FollowProps[];
  reviewsReceived: ReviewProps[];
  matches_losses: MatchResultsProps[];
  matches_winned: MatchResultsProps[];
};

export type EventsProps = {
  id: number;
};

export interface ActualDate {
  year: number;
  month: number;
  day: number;
}

export interface SearchUserProps {
  first_name: string;
  last_name: string;
  avatar: string;
  points: number;
  email: string;
  genre: string;
  id: number;
}
