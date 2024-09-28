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
  getUsers: () => `/api/user/all`,
  getUser: () => `${baseUrl}/api/admin`,
  avatarUser: (img: string) => `${baseUrl}/avatar/${img}`,
  putUserCuponizate: (userId: number) => `/api/user/cuponizate/${userId}`,
  //banner
  getBannersHome: () => `/api/banner/home`,
  getBannersCuponizate: () => `/api/banner/cuponizate`,
  getBannersArgenCompras: () => `/api/banner/argencompras`,
  uploadBanner: (type: string) => `/api/banner/${type}`,
  deleteBanner: (id: string) => `/api/banner/${id}`,
  bannerImg: (img: string) => `${baseUrl}/banner/${img}`,
  //notice
  getNotices: () => `/api/notice`,
  uploadImageNotice: () => `/api/notice/image`,
  uploadNotice: () => `/api/notice`,
  deleteNotice: (id: string) => `/api/notice/${id}`,
  noticeImg: (img: string) => `${baseUrl}/notice/${img}`,
  // admin
  getAllAdmins: () => `/api/admin/all`,
  deleteAdminById: (id: string) => `/api/admin/remove/${id}`,
  uploadImgAvatar: () => `/api/admin/avatar`,
  createAdmin: () => `/api/admin/create`,
  uploadMyAvatar: () => `/api/admin/avatar`,
  removeMyAvatar: () => `/api/admin/avatar`,
  updateFullname: () => `/api/admin/full-name`,
  updatePassword: () => `/api/admin/password`,
  //product
  getProductsAll: () => `/api/product`,
  //branch
  getBranches: () => `/api/branch`,
  BranchImg: (img: string) => `${baseUrl}/branch/${img}`,
  uploadImageBranch: () => `/api/branch/image`,
  createBranch: () => `/api/branch`,
};

export const tokenAccess = {
  tokenName: import.meta.env.VITE_PUBLIC_TOKEN_NAME || "token",
  refreshTokenName:
    import.meta.env.VITE_PUBLIC_TOKEN_REFRESH_NAME || "refreshToken",
};

export const googleMapKey = import.meta.env.VITE_PUBLIC_MAP_API_KEY;
