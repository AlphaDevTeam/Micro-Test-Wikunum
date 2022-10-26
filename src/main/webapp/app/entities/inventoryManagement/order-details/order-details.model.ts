import { IOrder } from 'app/entities/inventoryManagement/order/order.model';
import { IItem } from 'app/entities/inventoryManagement/item/item.model';

export interface IOrderDetails {
  id: number;
  notes?: string | null;
  orderedQty?: number | null;
  order?: Pick<IOrder, 'id' | 'orderNumber'> | null;
  item?: Pick<IItem, 'id' | 'itemCode'> | null;
}

export type NewOrderDetails = Omit<IOrderDetails, 'id'> & { id: null };
