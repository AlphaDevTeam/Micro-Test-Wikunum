import dayjs from 'dayjs/esm';

import { IItem, NewItem } from './item.model';

export const sampleWithRequiredData: IItem = {
  id: 89800,
  itemCode: 'Bedfordshire input',
  itemName: 'Borders mobile',
  transactionID: 'Jewelery grow',
  locationCode: 'Profit-focused',
  tenantCode: 'content-based next-generation Tasty',
};

export const sampleWithPartialData: IItem = {
  id: 47269,
  itemCode: 'Cotton Card',
  itemName: 'methodical enterprise',
  transactionID: 'invoice empower',
  locationCode: 'Texas Personal Utah',
  tenantCode: 'zero Keyboard',
};

export const sampleWithFullData: IItem = {
  id: 12101,
  itemCode: 'override Estate',
  itemName: 'Ethiopia',
  createdDate: dayjs('2022-10-26T09:02'),
  unitPrice: 28676,
  transactionID: 'Sausages',
  locationCode: 'architect Hawaii orchid',
  tenantCode: 'Plastic open protocol',
};

export const sampleWithNewData: NewItem = {
  itemCode: 'programming',
  itemName: 'Creative Principal engine',
  transactionID: 'system Planner Villages',
  locationCode: 'Arkansas',
  tenantCode: 'Handmade',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
