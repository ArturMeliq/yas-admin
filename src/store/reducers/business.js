import _ from 'lodash';
import {
  BUSINESS_CATEGORIES,
  BUSINESS_LIST,
  BUSINESSES_VERIFICATION,
  DELETED_BUSINESS_LIST,
  DELETED_THE_REVIEW_LIST, DELETED_USERS_LIST, REGISTERED_USERS_LIST, REPORTED_THE_REVIEW_LIST,
  SINGLE_BUSINESS, SINGLE_BUSINESS_REVIEWS, SINGLE_OWNER, UNREGISTERED_VISITORS_LIST,
  UPLOAD_IMAGE,
} from '../actions/business';
import weekTemplate from '../../helpers/staticData/weekTemplate/WeekTemplate';

const addressTemplate = {
  country: 'Armenia',
  state: '',
  city: '',
  zip: '',
  streetName: '',
};

const initialState = {
  businessCategories: [],
  businessCategoriesStatus: '',
  photos: [],
  lists: {
    list: [],
    status: 'request',
    page: '1',
    totalPages: '1',
  },
  singleBusiness: {
    addresses: [
      addressTemplate,
    ],
    businessCategories: [],
    email: '',
    businessId: '',
    photos: '',
    name: '',
    phone: '',
    website: '',
    otherBusinessCategory: [],
    status: '',
    weekdays: weekTemplate,
    specialities: '',
  },
  singleResponsiblePerson: {
    id: '',
    firstName: '',
    lastName: '',
    emailOrPhone: '',
    avatar: '',
  },
  singleBusinessReviews: {
    businessName: '',
    reviewCount: '',
    reviews: [],
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case BUSINESS_CATEGORIES.REQUEST: {
      return {
        ...state,
        businessCategoriesStatus: 'request',
      };
    }
    case BUSINESS_CATEGORIES.SUCCESS: {
      const { data: { categories } } = payload;
      return {
        ...state,
        businessCategories: categories,
        businessCategoriesStatus: 'ok',
      };
    }
    case BUSINESS_LIST.REQUEST: {
      return {
        ...state,
        lists: {
          list: [],
          status: 'request',
          page: '1',
          totalPages: '1',
        },
      };
    }
    case BUSINESS_LIST.SUCCESS: {
      const { data } = payload;

      const {
        list, status, _meta: { currentPage, pageCount },
      } = data;
      return {
        ...state,
        lists: {
          list,
          status,
          page: currentPage,
          totalPages: pageCount,
        },
      };
    }
    case SINGLE_OWNER.REQUEST: {
      return {
        ...state,
      };
    }
    case SINGLE_OWNER.SUCCESS: {
      if (payload.data.user) {
        const {
          data: {
            user: {
              businessOwnerfName, businessOwnerlName, businessOwnerEmail, businessOwnerPhone,
            },
          },
        } = payload;

        return {
          ...state,
          singleResponsiblePerson: {
            firstName: businessOwnerfName,
            lastName: businessOwnerlName,
            emailOrPhone: businessOwnerEmail || businessOwnerPhone,
          },
        };
      }

      return {
        ...state,
      };
    }
    case SINGLE_BUSINESS_REVIEWS.REQUEST: {
      return {
        ...state,
      };
    }
    case SINGLE_BUSINESS_REVIEWS.SUCCESS: {
      const {
        data: {
          businessName, reviewCount, reviews, _meta: { currentPage, pageCount },
        },
      } = payload;

      return {
        ...state,
        singleBusinessReviews: {
          businessName,
          reviewCount,
          reviews,
          currentPage,
          pageCount,
        },
      };
    }
    case DELETED_USERS_LIST.REQUEST: {
      return {
        ...state,
        lists: {
          list: [],
          status: 'request',
          page: '1',
          totalPages: '1',
        },
      };
    }
    case DELETED_USERS_LIST.SUCCESS: {
      const { data } = payload;

      const {
        list, status, _meta: { currentPage, pageCount },
      } = data;

      return {
        ...state,
        lists: {
          list,
          status,
          page: currentPage,
          totalPages: pageCount,
        },
      };
    }
    case REGISTERED_USERS_LIST.REQUEST: {
      return {
        ...state,
        lists: {
          list: [],
          status: 'request',
          page: '1',
          totalPages: '1',
        },
      };
    }
    case REGISTERED_USERS_LIST.SUCCESS: {
      const { data } = payload;

      const {
        list, status, _meta: { currentPage, pageCount },
      } = data;

      return {
        ...state,
        lists: {
          list,
          status,
          page: currentPage,
          totalPages: pageCount,
        },
      };
    }
    case UNREGISTERED_VISITORS_LIST.REQUEST: {
      return {
        ...state,
        lists: {
          list: [],
          status: 'request',
          page: '1',
          totalPages: '1',
        },
      };
    }
    case UNREGISTERED_VISITORS_LIST.SUCCESS: {
      const { data } = payload;

      const {
        list, status, _meta: { currentPage, pageCount },
      } = data;

      return {
        ...state,
        lists: {
          list,
          status,
          page: currentPage,
          totalPages: pageCount,
        },
      };
    }

    case DELETED_THE_REVIEW_LIST.REQUEST: {
      return {
        ...state,
        lists: {
          list: [],
          status: 'request',
          page: '1',
          totalPages: '1',
        },
      };
    }
    case DELETED_THE_REVIEW_LIST.SUCCESS: {
      const { data } = payload;

      const {
        list, status, _meta: { currentPage, pageCount },
      } = data;

      return {
        ...state,
        lists: {
          list,
          status,
          page: currentPage,
          totalPages: pageCount,
        },
      };
    }
    case REPORTED_THE_REVIEW_LIST.REQUEST: {
      return {
        ...state,
        lists: {
          list: [],
          status: 'request',
          page: '1',
          totalPages: '1',
        },
      };
    }
    case REPORTED_THE_REVIEW_LIST.SUCCESS: {
      const { data } = payload;

      const {
        list, status, _meta: { currentPage, pageCount },
      } = data;

      return {
        ...state,
        lists: {
          list,
          status,
          page: currentPage,
          totalPages: pageCount,
        },
      };
    }
    case BUSINESSES_VERIFICATION.REQUEST: {
      return {
        ...state,
        lists: {
          list: [],
          status: 'request',
          page: '1',
          totalPages: '1',
        },
      };
    }
    case BUSINESSES_VERIFICATION.SUCCESS: {
      const { data } = payload;

      const {
        list, status, _meta: { currentPage, pageCount },
      } = data;

      return {
        ...state,
        lists: {
          list,
          status,
          page: currentPage,
          totalPages: pageCount,
        },
      };
    }
    case SINGLE_BUSINESS.REQUEST: {
      return {
        ...state,
      };
    }
    case SINGLE_BUSINESS.SUCCESS: {
      const { data: { business } } = payload;

      return {
        ...state,
        singleBusiness: {
          ...state.singleBusiness,
          addresses: business?.addresses,
          phone: business?.phone.replace('+', ''),
          businessCategories: business?.businessCategories
            ?.map(({ name }) => ({ label: _.upperFirst(name), value: name })),
          email: business?.email,
          businessId: business?.id,
          photos: business?.images?.image?.map((file, order) => (
            {
              file,
              order,
            }
          )) || [],
          name: business?.name,
          website: business?.website,
          otherBusinessCategory: [],
          status: business?.status,
          weekdays: !business?.weekdays?.length ? state.singleBusiness.weekdays : business.weekdays.map((w) => (
            {
              ...w,
              startDate: w?.startDate.slice(0, 5),
              endDate: w?.endDate.slice(0, 5),
            })),
          specialities: business?.specialities,
        },
      };
    }
    case DELETED_BUSINESS_LIST.REQUEST: {
      return {
        ...state,
        lists: {
          list: [],
          status: 'request',
          page: '1',
          totalPages: '1',
        },
      };
    }
    case DELETED_BUSINESS_LIST.SUCCESS: {
      const { data } = payload;

      const {
        list, status, _meta: { currentPage, pageCount },
      } = data;

      return {
        ...state,
        lists: {
          list,
          status,
          page: currentPage,
          totalPages: pageCount,
        },
      };
    }

    case UPLOAD_IMAGE.REQUEST: {
      return {
        ...state,
      };
    }
    case UPLOAD_IMAGE.SUCCESS: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default reducer;
