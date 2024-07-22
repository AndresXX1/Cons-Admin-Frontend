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
};
