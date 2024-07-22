export const baseUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL;

export const apiUrls = {
  // auth
  logIn: () => `${baseUrl}/api/admin/log-in`,
  refreshToken: () => `${baseUrl}/api/admin/refresh-token`,
  logOut: () => `${baseUrl}/api/admin/log-out`,
  getSessions: () => `/api/admin/session`,
  deleteSession: (id: number) => `/api/admin/session/${id}`,
  resendCode: () => `${baseUrl}/api/admin/resend-code`,
  //user
  getUserById: (id: number) => `/api/user/${id}/search`,
  getSuggestions: () => `/api/user/allsuggestions`,
  getSomeSuggestion: (data: number) => `/api/user/suggestions/${data}`,
  getUser: () => `/api/user`,
  getTopPlayers: () => `/api/user/ranking`,
  putUser: () => `/api/user`,
  getUsers: () => `/api/user/all`,
  getAllUsers: (data: { first: number; second: number }) =>
    `api/user/allUsers/${data.first}/${data.second}`,
  onboarding: () => `/api/user/onboarding`,
  uploadAvatar: () => `/api/user/avatar`,
  completeProfile: () => `/api/user/complete-profile`,
  userSearch: (term: string) => `/api/search?term=${term}&filter[]=users`,
  searchAll: (term: string, filter?: string) =>
    `/api/search?term=${term}${filter ? `&filter[]=${filter}` : ""}`,
  verifyEmail: () => `/api/user/verify-code`,
  getForms: () => `/api/user/onboarding`,
  forgetPasswordNewPassword: () =>
    `${baseUrl}/api/auth/forget-password-new-password`,
  getImg: (img: string) => `${baseUrl}/avatar/${img}`,
  forgetPasswordCode: () => `${baseUrl}/api/auth/forget-password-code`,
  forgetPassword: () => `${baseUrl}/api/auth/forget-password`,
  setNewPassword: () => `${baseUrl}/api/auth/set-password`,
  followUser: (id: number) => `${baseUrl}/api/user/follow/${id}`,
  submitReview: (id: number) => `${baseUrl}/api/user/review/${id}`,
  getReviewByReviewedUserId: (id: number) => `${baseUrl}/api/user/review/${id}`,
  submitMatchResults: () => `${baseUrl}/api/user/match-results`,
  updateMatchResults: (id: number) => `${baseUrl}/api/user/match-results/${id}`,
  createOwner: () => `${baseUrl}/api/user/owner`,
  removeOwner: (clubId: number, id: number) =>
    `${baseUrl}/api/user/owner/${clubId}/${id}`,
  //club
  getClubs: () => `/api/club/all`,
  createClub: () => `/api/club`,
  clubImg: (img: string) => `${baseUrl}/club/${img}`,
  updateImgClub: (id: number) => `/api/club/${id}/image`,
  updateStateClub: (id: number, state: string) =>
    `/api/club/${id}/status/${state}`,
  updateClub: (id: number) => `/api/club/${id}`,
  getClub: (id: number) => `/api/club/${id}`,
  myClub: () => `/api/club/my-club`,
  //field
  createField: (clubId: number) => `/api/field/${clubId}`,
  updateCalendarField: (fieldId: number) => `/api/field/calendar/${fieldId}`,
  getAllFields: () => `/api/field/all`,
  createFieldTag: (fieldId: number) => `/api/field/tag/${fieldId}`,
  deleteFieldTag: (fieldId: number, tag: string) =>
    `/api/field/tag/${fieldId}/${tag}`,
  updatePriceField: (fieldId: number) => `/api/field/prices/${fieldId}`,
  //event
  reservationField: (fieldId: number) => `/api/event/reservation/${fieldId}`,
  getAllEvents: () => `/api/event/all`,
  getEventsField: (fieldId: number, year: number, month: number, day: number) =>
    `/api/event/${fieldId}/${year}/${month}/${day}`,
  createOpenReservation: (fieldId: number) =>
    `/api/event/reservation-open/${fieldId}`,
  getEventById: (id: number) => `/api/event/${id}`,
  generatePaymentLink: (id: number) => `/api/event/link-pay/${id}`,
  getAllOpenEvents: () => `/api/event/all-open`,
  myEvents: () => `/api/event/my-events`,
  //matchResults
  getMatchResultsById: (id: number) =>
    `${baseUrl}/api/user/match-results/${id}`,
};

export const tokenAccess = {
  tokenName: import.meta.env.VITE_PUBLIC_TOKEN_NAME || "token",
  refreshTokenName:
    import.meta.env.VITE_PUBLIC_TOKEN_REFRESH_NAME || "refreshToken",
};
