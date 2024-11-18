export const baseUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL || 'http://localhost:8001'; // Usamos la URL del backend

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
  getData: () => `/api/admin/data`,
  //product
  getProductsAll: () => `/api/product/all`,
  changeOfVisibilityProduct: (id: string) => `/api/product/visibility/${id}`,
  //product por puntos
  createProduct: () => '/api/product/create',
  allProducts: () => "/api/product/allProducts",
  updateProduct: (id: number | string) => `/api/product/update/${id}`,
  deleteProduct: (id: number) => `/api/product/delete/${id}`,
  productImg: (img: string) => {
    // Nos aseguramos de que la URL base no termine con barra y que la ruta de la imagen comience correctamente
    return `${baseUrl.replace(/\/$/, '')}/images/products/${img}`},
  //branch
  getBranches: () => `/api/branch`,
  BranchImg: (img: string) => `${baseUrl}/branch/${img}`,
  uploadImageBranch: () => `/api/branch/image`,
  createBranch: () => `/api/branch`,
  updateBranch: (id: string) => `api/branch/${id}`,
  deleteBranch: (id: string) => `api/branch/${id}`,
  //notification
  createNotification: () => `/api/notifications/create`,
  getAllNotifications: () => `/api/notifications`,
  getNextNotifications: () => `/api/notifications/nextNotifications`,
  getOldNotifications: () => `/api/notifications/oldNotifications`,
};

export const tokenAccess = {
  tokenName: import.meta.env.VITE_PUBLIC_TOKEN_NAME || "token",
  refreshTokenName:
    import.meta.env.VITE_PUBLIC_TOKEN_REFRESH_NAME || "refreshToken",
};

export const googleMapKey = import.meta.env.VITE_PUBLIC_MAP_API_KEY;
