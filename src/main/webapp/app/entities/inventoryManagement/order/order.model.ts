import dayjs from 'dayjs/esm';

export interface IOrder {
  id: number;
  orderID?: string | null;
  orderNumber?: string | null;
  customerCode?: string | null;
  createdDate?: dayjs.Dayjs | null;
  transactionID?: string | null;
  locationCode?: string | null;
  tenantCode?: string | null;
}

export type NewOrder = Omit<IOrder, 'id'> & { id: null };
