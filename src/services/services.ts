import { get } from "@src/util/request";

export const getCategories = () => get(`api/categories`);

export const getPayments = (months: number) => get(`api/payments/months/${months}`);