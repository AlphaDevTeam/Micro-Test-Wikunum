import { IStock, NewStock } from './stock.model';

export const sampleWithRequiredData: IStock = {
  id: 51685,
  stockQty: 12476,
  locationCode: 'invoice middleware Toys',
  tenantCode: 'redundant payment JBOD',
};

export const sampleWithPartialData: IStock = {
  id: 28290,
  stockQty: 19565,
  locationCode: 'RAM',
  tenantCode: 'China bluetooth Soft',
};

export const sampleWithFullData: IStock = {
  id: 30558,
  stockQty: 80603,
  locationCode: 'Bedfordshire Optimization International',
  tenantCode: 'Wyoming Bacon',
};

export const sampleWithNewData: NewStock = {
  stockQty: 52201,
  locationCode: 'compressing',
  tenantCode: 'Object-based Pound',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
