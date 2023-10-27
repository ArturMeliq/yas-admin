import Api from '../../Api/Api';
import { define } from '../redux-request';

export const BUSINESS_LIST = define('BUSINESS_LIST');

export function businessListRequest(data) {
  return BUSINESS_LIST.request(() => Api.businessList(data));
}
export const REGISTERED_USERS_LIST = define('REGISTERED_USERS_LIST');

export function registeredUsersRequest(data) {
  return REGISTERED_USERS_LIST.request(() => Api.registeredUsersList(data));
}
export const UNREGISTERED_VISITORS_LIST = define('UNREGISTERED_VISITORS_LIST');

export function unregisteredVisitorsListRequest(data) {
  return UNREGISTERED_VISITORS_LIST.request(() => Api.unregisteredVisitorsList(data));
}
export const DELETED_THE_REVIEW_LIST = define('DELETED_THE_REVIEW_LIST');

export function deletedTheReviewListRequest(data) {
  return DELETED_THE_REVIEW_LIST.request(() => Api.deletedTheReviewList(data));
}
export const DELETED_USERS_LIST = define('DELETED_USERS_LIST');

export function deletedUsersListRequest(data) {
  return DELETED_USERS_LIST.request(() => Api.deletedUsersList(data));
}
export const REPORTED_THE_REVIEW_LIST = define('REPORTED_THE_REVIEW_LIST');

export function reportedTheReviewListRequest(data) {
  return REPORTED_THE_REVIEW_LIST.request(() => Api.reportTheReviewList(data));
}
export const DELETED_BUSINESS_LIST = define('DELETED_BUSINESS_LIST');

export function deletedBusinessListRequest(data) {
  return DELETED_BUSINESS_LIST.request(() => Api.deletedBusinessList(data));
}
export const SINGLE_BUSINESS = define('SINGLE_BUSINESS');

export function singleBusinessRequest(id) {
  return SINGLE_BUSINESS.request(() => Api.singleBusiness(id));
}
export const SINGLE_OWNER = define('SINGLE_OWNER');

export function singleOwnerRequest(id) {
  return SINGLE_OWNER.request(() => Api.singleOwner(id));
}
export const SINGLE_BUSINESS_REVIEWS = define('SINGLE_BUSINESS_REVIEWS');

export function singleBusinessReviewsRequest(id, page) {
  return SINGLE_BUSINESS_REVIEWS.request(() => Api.singleBusinessReviews(id, page));
}

export const BUSINESS_CREATE = define('BUSINESS_CREATE');

export function createBusinessRequest(data) {
  return BUSINESS_CREATE.request(() => Api.createBusiness(data));
}

export const BUSINESS_CATEGORIES = define('BUSINESS_CATEGORIES');

export function getBusinessCategoriesRequest() {
  return BUSINESS_CATEGORIES.request(() => Api.getCategories());
}

export const BUSINESSES_VERIFICATION = define('BUSINESSES_VERIFICATION');

export function waitingBusinessesVerificationRequest(page) {
  return BUSINESSES_VERIFICATION.request(() => Api.waitingBusinessesVerificationList(page));
}

export const UPLOAD_IMAGE = define('UPLOAD_IMAGE');

export function uploadImageRequest(data) {
  return UPLOAD_IMAGE.request(() => Api.uploadImage(data));
}
