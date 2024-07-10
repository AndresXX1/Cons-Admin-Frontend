import { apiUrls } from "@config/config";
import { SubmitMatchResults } from "@pages/Profile/Results";
import { axiosInstance, setRedirect } from "@store/actions/auth";
import { useAppDispatch } from "@store/hooks";
import { IErrorResponse } from "@store/types/auth";
import { alertConfirm } from "@utils/alerts";
import { FollowProps, UserProps } from "@utils/interfaces";

export const welcomeForm = async (
  dispatch: ReturnType<typeof useAppDispatch>,
  data: { completed_welcome_form: boolean; points: number; federate: string }
) => {
  try {
    const response = await axiosInstance.put(apiUrls.putUser(), data);
    if (response.data.ok) {
      alertConfirm("Formulario enviado, muchas gracias.");
      dispatch(setRedirect("/home"));
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getusers = async () => {
  try {
    const response = await axiosInstance.get(apiUrls.getUsers());
    if (response.data.ok) {
      return response.data.users;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const getAllUsers = async (data: { first: number; second: number }) => {
  try {
    const response = await axiosInstance.get(apiUrls.getAllUsers(data));
    if (response.data.ok) {
      return response.data.users;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const getSomeSuggestion = async (data: number) => {
  try {
    const response = await axiosInstance.get(apiUrls.getSomeSuggestion(data));
    if (response.data.ok) {
      return response.data.forms;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const getTopPlayers = async (data: {
  first: number;
  second: number;
  filter?: string;
}) => {
  try {
    const response = await axiosInstance.post(apiUrls.getTopPlayers(), data);
    if (response.data.ok) {
      return response.data.users;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const search = async (term: string) => {
  try {
    const result = await axiosInstance(apiUrls.userSearch(term));
    return result.data.results.users;
  } catch (error) {
    console.error(error);
  }
};

export const searchAll = async (term: string, filter?: string) => {
  try {
    const result = await axiosInstance(apiUrls.searchAll(term, filter));
    return result.data.results;
  } catch (error) {
    console.error(error);
  }
};

export const followUser = async (id: number) => {
  try {
    const result = await axiosInstance.put(apiUrls.followUser(id));
    console.error(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const setUserFollowers = async ({
  setFollowers,
  setUserData,
  setFollowing,
  user,
  id,
}: {
  setFollowers: React.Dispatch<React.SetStateAction<FollowProps[]>>;
  setUserData: React.Dispatch<React.SetStateAction<UserProps | undefined>>;
  setFollowing: React.Dispatch<React.SetStateAction<FollowProps[]>>;
  user: UserProps;
  id: string;
}) => {
  try {
    const { data } = await axiosInstance.get(apiUrls.getUserById(Number(id)));
    if (id && user && Number(id) !== user.id) {
      setUserData(data);
      setFollowers(
        data.followers.map((key: FollowProps) => ({
          ...key,
          follow: key.follower,
        }))
      );
      setFollowing(data.following);
    } else {
      setUserData(user as UserProps);
      setFollowers(
        data.followers.map((key: FollowProps) => ({
          ...key,
          follow: key.follower,
        }))
      );
      setFollowing(data.following);
    }
  } catch (error) {
    console.error(error);
  }
};

export const submitReview = async (
  id: number,
  review: { score: number; text: string }
) => {
  try {
    const response = await axiosInstance.put(apiUrls.submitReview(id), review);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getReviewByReviewedUserId = async (id: number) => {
  try {
    const response = await axiosInstance.get(
      apiUrls.getReviewByReviewedUserId(id)
    );
    console.error("review response:: ", response);
    if (response.data.ok) return response.data.review;
  } catch (error) {
    console.error(error);
  }
};

export const submitMatchResults = async (matchResults: SubmitMatchResults) => {
  try {
    return await axiosInstance.post(apiUrls.submitMatchResults(), matchResults);
  } catch (error) {
    console.error(error);
  }
};

export const createOwner = async (
  email: string,
  password: string,
  club_id: number,
  setError: (error: string | null) => void,
  getClubs: () => void,
  close: () => void
) => {
  try {
    const response = await axiosInstance.post(apiUrls.createOwner(), {
      email,
      password,
      club_id,
      close,
    });
    if (response.data.ok) {
      alertConfirm("Se asignó correctamente al nuevo administrador.");
      getClubs();
      close();
    } else {
      setError(response.data.message);
    }
  } catch (error) {
    const message =
      (error as IErrorResponse).response.data.message ||
      "Error al crear el administrador";
    setError(message);
  }
};

export const getMatchResultsById = async (id: number) => {
  const result = await axiosInstance(apiUrls.getMatchResultsById(id));
  return result;
};

export const removerOwner = async (
  clubId: number,
  id: number,
  getClubs: () => void
) => {
  try {
    const response = await axiosInstance.delete(
      apiUrls.removeOwner(clubId, id)
    );
    if (response.data.ok) {
      getClubs();
    }
  } catch (error) {
    console.error(error);
  }
};
