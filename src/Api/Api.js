import axios from 'axios';
import { serialize } from 'object-to-formdata';
import accountHelpers from '../helpers/utils/accountHelpers';

const api = axios.create({
  baseURL: 'https://5779-45-143-207-243.eu.ngrok.io/',
  headers: {
    'ngrok-skip-browser-warning': '*',
  },
});

api.interceptors.request.use((config) => {
  const token = accountHelpers.getToken('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (err) => Promise.reject(err));
class Api {
  static login = (data) => api.post('api/user/login', data);

  static businessList = ({ page = 1, startDate, endDate }) => api.get('api/business/admin/business-list', {
    params: {
      page,
      startDate,
      endDate,
    },
  });

  static deletedUsersList = ({ page = 1, startDate, endDate }) => api.get('api/user/deleted-list', {
    params: {
      page,
      startDate,
      endDate,
    },
  });

  static deleteDeletedUsers = (id) => api.delete('api/user/delete/deleted-user', {
    params: {
      id,
    },
  });

  static deleteBusiness = (id) => api.delete('api/business/admin/delete', {
    params: {
      id,
    },
  });

  static topPlatformsByRegisteredUser = (data) => api.get('api/user/registrated/top-platforms', {
    params: {
      ...data,
    },
  });

  static topCountryByRegisteredUser = (data) => api.get('api/user/registrated/top-country', {
    params: {
      ...data,
    },
  });

  static topCityByRegisteredUser = (data) => api.get('api/user/registrated/top-city', {
    params: {
      ...data,
    },
  });

  static viewReportByRegister = (data) => api.get('api/user/registrated/top-views', {
    params: {
      ...data,
    },
  });

  static topCountryUnregisteredUsers = (data) => api.get('api/user/unregistrated/top-country', {
    params: {
      ...data,
    },
  });

  static topCityUnregisteredUsers = (data) => api.get('api/user/unregistrated/top-city', {
    params: {
      ...data,
    },
  });

  static topPlatformsUnregisteredUsers = (data) => api.get('api/user/unregistrated/top-platforms', {
    params: {
      ...data,
    },
  });

  static topViewsUnregisteredUsers = (data) => api.get('api/user/unregistrated/top-views', {
    params: {
      ...data,
    },
  });

  static dashboardTopUsers = (data) => api.get('api/user/top-users', {
    params: {
      ...data,
    },
  });

  static dashViewQuantity = (data) => api.get('api/user/view-quantity', {
    params: {
      ...data,
    },
  });

  static deleteResponsiblePerson = (id) => api.delete('api/user/admin/delete', {
    params: {
      id,
    },
  });

  static blockResponsiblePerson = (id) => api.get('api/user/unlock', {
    params: {
      id,
    },
  });

  static deletedBusinessList = ({ page = 1, startDate, endDate }) => api.get('api/business/admin/delete-list', {
    params: {
      page,
      startDate,
      endDate,
    },
  });

  static registeredUsersList = ({ page = 1, startDate, endDate }) => api.get('api/user/register-list', {
    params: {
      page,
      startDate,
      endDate,
    },
  });

  static unregisteredVisitorsList = ({ page = 1, startDate, endDate }) => api.get('api/user/unregister-list', {
    params: {
      page,
      startDate,
      endDate,
    },
  });

  static deletedBusinessCancel = (id) => api.get('api/business/cancel', {
    params: {
      id,
    },
  });

  static deleteCancelReportReview = (id) => api.delete('api/business/review/delete/reported-review', {
    params: {
      id,
    },
  });

  static waitingBusinessesVerificationList = ({ page = 1, startDate, endDate }) => api.get('api/business/waiting/verify/list', {
    params: {
      page,
      startDate,
      endDate,
    },
  });

  static deletedTheReviewList = ({ page = 1, startDate, endDate }) => api.get('api/business/deleted-review', {
    params: {
      page,
      startDate,
      endDate,
    },
  });

  static deleteSingleReview = (reviewId) => api.delete('api/business/review', {
    params: {
      reviewId,
      reason: 'Admin',
    },
  });

  static reportTheReviewList = ({ page = 1, startDate, endDate }) => api.get('api/business/reported-review', {
    params: {
      page,
      startDate,
      endDate,
    },
  });

  static singleBusinessReviews = (id, page = 1) => api.get(`api/business/review/${id}`, {
    page,
  });

  static singleBusiness = (id) => api.get('api/business/single', {
    params: {
      id,
    },
  });

  static singleOwner = (businessId) => api.get('api/business/admin/responsible/person', {
    params: {
      businessId,
    },
  });

  static updateBusiness = (date) => api.put('api/business/admin/update', date);

  static updateResponsiblePerson = (data) => api.put('api/business/admin/responsible/person/update', data);

  static createBusiness = (data) => api.post('api/business/admin/register', data);

  static getCategories = () => api.get('api/business/categories/list');

  static uploadImage = ({ image, key, businessId }) => api.post(
    '/api/user/upload-image',
    serialize({ image, key, businessId }),
  );

  static verifyBusiness = (id) => api.put('api/business/admin/verify', {
    id,
  });

  static deleteDontVerifyBusiness = (id) => api.delete('api/business/admin/delete', {
    params: {
      id,
    },
  });
}

export default Api;
