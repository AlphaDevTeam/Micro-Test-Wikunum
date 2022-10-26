import { IOrderDetails, NewOrderDetails } from './order-details.model';

export const sampleWithRequiredData: IOrderDetails = {
  id: 38246,
  orderedQty: 51069,
};

export const sampleWithPartialData: IOrderDetails = {
  id: 18925,
  orderedQty: 31715,
};

export const sampleWithFullData: IOrderDetails = {
  id: 5009,
  notes: 'Soft overriding',
  orderedQty: 61640,
};

export const sampleWithNewData: NewOrderDetails = {
  orderedQty: 65161,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
