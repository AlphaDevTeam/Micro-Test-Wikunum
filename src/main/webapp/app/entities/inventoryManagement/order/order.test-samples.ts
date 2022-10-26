import dayjs from 'dayjs/esm';

import { IOrder, NewOrder } from './order.model';

export const sampleWithRequiredData: IOrder = {
  id: 47761,
  orderID: 'firewall web-enabled',
  orderNumber: 'Handcrafted Account Ville',
  customerCode: 'Wisconsin Officer',
  transactionID: 'microchip',
  locationCode: 'reinvent',
  tenantCode: 'Kwacha bypassing Face',
};

export const sampleWithPartialData: IOrder = {
  id: 94385,
  orderID: 'Ford Director',
  orderNumber: 'Fresh',
  customerCode: 'Ville benchmark',
  createdDate: dayjs('2022-10-25T22:06'),
  transactionID: 'Shoes revolutionary',
  locationCode: 'Ball Wooden',
  tenantCode: 'blue Frozen',
};

export const sampleWithFullData: IOrder = {
  id: 82518,
  orderID: 'Small Loti',
  orderNumber: 'SSL SMTP',
  customerCode: 'Portugal calculate orange',
  createdDate: dayjs('2022-10-26T03:56'),
  transactionID: 'Rial',
  locationCode: 'lavender',
  tenantCode: 'Supervisor invoice',
};

export const sampleWithNewData: NewOrder = {
  orderID: 'Pizza Liaison Adaptive',
  orderNumber: 'invoice Shoes',
  customerCode: 'SMS',
  transactionID: 'asymmetric user',
  locationCode: 'Generic end-to-end',
  tenantCode: 'moratorium SMTP plug-and-play',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
