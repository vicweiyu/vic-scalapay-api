import * as utils from '../common/utils';

import {
  SCALAPAY_REDIRECT_CANCEL_URL,
  SCALAPAY_REDIRECT_CONFIRM_URL,
  SCALAPAY_MERCHANT_REFERENCE,
  E_SCALAPAY_GTIN,
  E_SCALAPAY_CURRENCY,
  E_SCALAPAY_TYPE,
  E_SCALAPAY_PRODUCT,
} from './scalapay.common';

interface IAmount {
  amount: string;
  currency: E_SCALAPAY_CURRENCY;
}

type Amount = IAmount;

interface IContactInfo {
  phoneNumber?: string;
  countryCode: string;
  name: string;
  postcode: string;
  suburb?: string;
  line1: string;
}

type ContactInfo = IContactInfo;

interface IOrderItem {
  gtin?: E_SCALAPAY_GTIN;
  quantity: number;
  price: Amount;
  name: string;
  category: string;
  subcategory?: Array<string>;
  sku: string;
  brand?: string;
}

type OrderItem = IOrderItem;

interface IDiscountItem {
  amount: Amount;
  displayName?: string;
}

type DiscountItem = IDiscountItem;

interface ICreateOrderReq {
  totalAmount: Amount;

  consumer: {
    phoneNumber?: string;
    givenNames: string;
    surname: string;
    email?: string;
  };

  billing?: ContactInfo;

  shipping: ContactInfo;

  items: Array<OrderItem>;

  discounts?: Array<DiscountItem>;

  merchant: {
    redirectCancelUrl: string;
    redirectConfirmUrl: string;
  };

  merchantReference?: string;

  shippingAmount?: Amount;

  taxAmount?: Amount;

  type?: E_SCALAPAY_TYPE;

  product?: E_SCALAPAY_PRODUCT;

  frequency?: {
    number: number;
    frequencyType: string;
  };

  orderExpiryMilliseconds?: number;

  computeTotalAmount: () => void;

  fillMerchantInfo: () => void;
}

class SPCreateOrderReq implements ICreateOrderReq {
  public totalAmount: Amount;

  public consumer: {
    phoneNumber?: string;
    givenNames: string;
    surname: string;
    email?: string;
  };

  public billing?: ContactInfo;

  public shipping: ContactInfo;

  public items: Array<OrderItem>;

  public discounts?: Array<DiscountItem>;

  public merchant: {
    redirectCancelUrl: string;
    redirectConfirmUrl: string;
  };

  public merchantReference?: string;

  public shippingAmount?: Amount;

  public taxAmount?: Amount;

  public type?: E_SCALAPAY_TYPE;

  public product?: E_SCALAPAY_PRODUCT;

  public frequency?: {
    number: number;
    frequencyType: string;
  };

  public orderExpiryMilliseconds?: number;

  constructor() {
    this.totalAmount = {
      amount: '',
      currency: E_SCALAPAY_CURRENCY.EUR,
    };

    this.consumer = {
      givenNames: '',
      surname: '',
    };

    this.shipping = {
      countryCode: '',
      name: '',
      postcode: '',
      line1: '',
    };

    this.items = [];

    this.merchant = {
      redirectCancelUrl: '',
      redirectConfirmUrl: '',
    };

    this.type = E_SCALAPAY_TYPE.ONLINE; // TODO
  }

  computeTotalAmount() {
    let total = 0;

    this.items.forEach((i) => {
      total += Number(parseFloat(i.price.amount).toFixed(2)) * i.quantity;
    });

    if (!utils.isEmptyArray(this.discounts)) {
      this.discounts.forEach((d) => {
        total -= Number(parseFloat(d.amount.amount).toFixed(2));
      });
    }

    if (this.shippingAmount) {
      total += Number(parseFloat(this.shippingAmount.amount).toFixed(2));
    }

    if (this.taxAmount) {
      total += Number(parseFloat(this.taxAmount.amount).toFixed(2));
    }

    this.totalAmount.amount = String(total);
  }

  fillMerchantInfo() {
    this.merchant = {
      redirectCancelUrl: SCALAPAY_REDIRECT_CANCEL_URL,
      redirectConfirmUrl: SCALAPAY_REDIRECT_CONFIRM_URL,
    };
    this.merchantReference = SCALAPAY_MERCHANT_REFERENCE;
  }
}

interface ICreateOrderRes {
  token: string;
  expires: string;
  checkoutUrl: string;
}

class SPCreateOrderRes implements ICreateOrderRes {
  public token: string;
  public expires: string;
  public checkoutUrl: string;

  constructor() {
    this.token = '';
    this.expires = '';
    this.checkoutUrl = '';
  }
}

type SubmitOrderInput = Pick<
  ICreateOrderReq,
  Exclude<keyof SPCreateOrderReq, 'totalAmount' | 'merchant' | 'merchantReference' | 'type' | 'orderExpiryMilliseconds'>
>;

export { Amount, ContactInfo, OrderItem, DiscountItem, SPCreateOrderReq, SPCreateOrderRes, SubmitOrderInput };
