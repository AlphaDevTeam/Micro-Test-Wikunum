import dayjs from 'dayjs/esm';

export interface IItem {
  id: number;
  itemCode?: string | null;
  itemName?: string | null;
  createdDate?: dayjs.Dayjs | null;
  unitPrice?: number | null;
  transactionID?: string | null;
  locationCode?: string | null;
  tenantCode?: string | null;
}

export type NewItem = Omit<IItem, 'id'> & { id: null };
