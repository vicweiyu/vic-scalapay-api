import { HttpStatusCode } from 'axios';

import * as utils from '../common/utils';

import { Amount, ContactInfo, OrderItem } from './order.integration';

export const SCALAPAY_API_BASE_URL = 'https://integration.api.scalapay.com';
export const SCALAPAY_API_KEY = 'qhtfs87hjnc12kkos';

export const SCALAPAY_REDIRECT_CANCEL_URL = 'https://portal.integration.scalapay.com/failure-url';
export const SCALAPAY_REDIRECT_CONFIRM_URL = 'https://portal.integration.scalapay.com/success-url';
export const SCALAPAY_MERCHANT_REFERENCE = 'Demo Merchant'; // TODO

export const SCALAPAY_API_V2_ORDERS = `${SCALAPAY_API_BASE_URL}/v2/orders`;

export enum E_SCALAPAY_GTIN {
  UPC = 'UPC',
  EAN = 'EAN',
  JAN = 'JAN',
  ISBN = 'ISBN',
  ITF_14 = 'ITF-14',
}

export enum E_SCALAPAY_CURRENCY {
  EUR = 'EUR',
}

export enum E_SCALAPAY_TYPE {
  ONLINE = 'online',
  OFFLINE = 'offline',
}

export enum E_SCALAPAY_PRODUCT {
  PAY_IN_3 = 'pay-in-3',
  PAY_IN_4 = 'pay-in-4',
  PAY_LATER = 'later',
}

export interface IScalapayError {
  errorCode: string;
  errorId: string;
  message: {
    status: number; // TODO
    statusText: string;
    errors: [
      {
        field: Array<string>;
        location: string;
        messages: Array<string>;
        types: Array<string>;
      }
    ];
  };
  httpStatusCode: HttpStatusCode;
}

export const isValidatedAmount = (amountObj: Amount) => {
  if (utils.isEmptyString(amountObj?.amount) || utils.isEmptyString(amountObj?.currency)) {
    return false;
  }

  if (!/^([1-9]\d{0,9}|0)(\.\d{1,2})?$/.test(amountObj?.amount)) {
    return false;
  }

  return true;
};

export const isValidatedContactInfo = (info: ContactInfo) => {
  if (
    utils.isEmptyString(info?.countryCode) ||
    utils.isEmptyString(info?.name) ||
    utils.isEmptyString(info?.postcode) ||
    utils.isEmptyString(info?.line1)
  ) {
    return false;
  }

  return true;
};

export const isValidatedOrderItem = (item: OrderItem) => {
  if (!/^[0-9]*$/.test(String(item?.quantity))) {
    return false;
  }

  if (!isValidatedAmount(item?.price)) {
    return false;
  }

  if (utils.isEmptyString(item?.name) || utils.isEmptyString(item?.category) || utils.isEmptyString(item?.sku)) {
    return false;
  }

  return true;
};
