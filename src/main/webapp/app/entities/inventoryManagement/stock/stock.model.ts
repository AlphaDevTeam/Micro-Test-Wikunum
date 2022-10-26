import { IItem } from 'app/entities/inventoryManagement/item/item.model';

export interface IStock {
  id: number;
  stockQty?: number | null;
  locationCode?: string | null;
  tenantCode?: string | null;
  item?: Pick<IItem, 'id' | 'itemCode'> | null;
}

export type NewStock = Omit<IStock, 'id'> & { id: null };
