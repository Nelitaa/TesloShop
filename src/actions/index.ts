export { getPaginatedProductsWithImages } from './product/product-pagination';
export { getProductBySlug } from './product/get-product-by-slug';
export { getStockBySlug } from './product/get-stock-by-slug';

export { authenticate } from './auth/login';
export { logout } from './auth/logout';
export { registerUser } from './auth/register';

export { getCountries } from './country/get-countries'

export { setUserAddress } from './address/set-user-address';
export { deleteUserAddress } from './address/delete-user-address';
export { getUserAddress } from './address/get-user-address';

export { placeOrder } from './order/place-order';
export { getOrderById } from './order/get-order-by-id';
export { getOrderByUser } from './order/get-order-by-user';
export { getPaginatedOrders } from './order/get-paginated-orders';

export { setTransactionId } from './payments/set-transaction-id';
export { paypalCheckPayment } from './payments/paypal-check-payment';

export { getPaginatedUsers } from './user/get-paginated-users';
export { changeUserRole } from './user/change-user-role';

export { getCategories } from './category/get-categories';