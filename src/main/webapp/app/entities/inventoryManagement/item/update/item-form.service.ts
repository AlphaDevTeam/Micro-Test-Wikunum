import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IItem, NewItem } from '../item.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IItem for edit and NewItemFormGroupInput for create.
 */
type ItemFormGroupInput = IItem | PartialWithRequiredKeyOf<NewItem>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IItem | NewItem> = Omit<T, 'createdDate'> & {
  createdDate?: string | null;
};

type ItemFormRawValue = FormValueOf<IItem>;

type NewItemFormRawValue = FormValueOf<NewItem>;

type ItemFormDefaults = Pick<NewItem, 'id' | 'createdDate'>;

type ItemFormGroupContent = {
  id: FormControl<ItemFormRawValue['id'] | NewItem['id']>;
  itemCode: FormControl<ItemFormRawValue['itemCode']>;
  itemName: FormControl<ItemFormRawValue['itemName']>;
  createdDate: FormControl<ItemFormRawValue['createdDate']>;
  unitPrice: FormControl<ItemFormRawValue['unitPrice']>;
  transactionID: FormControl<ItemFormRawValue['transactionID']>;
  locationCode: FormControl<ItemFormRawValue['locationCode']>;
  tenantCode: FormControl<ItemFormRawValue['tenantCode']>;
};

export type ItemFormGroup = FormGroup<ItemFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ItemFormService {
  createItemFormGroup(item: ItemFormGroupInput = { id: null }): ItemFormGroup {
    const itemRawValue = this.convertItemToItemRawValue({
      ...this.getFormDefaults(),
      ...item,
    });
    return new FormGroup<ItemFormGroupContent>({
      id: new FormControl(
        { value: itemRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      itemCode: new FormControl(itemRawValue.itemCode, {
        validators: [Validators.required],
      }),
      itemName: new FormControl(itemRawValue.itemName, {
        validators: [Validators.required],
      }),
      createdDate: new FormControl(itemRawValue.createdDate),
      unitPrice: new FormControl(itemRawValue.unitPrice),
      transactionID: new FormControl(itemRawValue.transactionID, {
        validators: [Validators.required],
      }),
      locationCode: new FormControl(itemRawValue.locationCode, {
        validators: [Validators.required],
      }),
      tenantCode: new FormControl(itemRawValue.tenantCode, {
        validators: [Validators.required],
      }),
    });
  }

  getItem(form: ItemFormGroup): IItem | NewItem {
    return this.convertItemRawValueToItem(form.getRawValue() as ItemFormRawValue | NewItemFormRawValue);
  }

  resetForm(form: ItemFormGroup, item: ItemFormGroupInput): void {
    const itemRawValue = this.convertItemToItemRawValue({ ...this.getFormDefaults(), ...item });
    form.reset(
      {
        ...itemRawValue,
        id: { value: itemRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ItemFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdDate: currentTime,
    };
  }

  private convertItemRawValueToItem(rawItem: ItemFormRawValue | NewItemFormRawValue): IItem | NewItem {
    return {
      ...rawItem,
      createdDate: dayjs(rawItem.createdDate, DATE_TIME_FORMAT),
    };
  }

  private convertItemToItemRawValue(
    item: IItem | (Partial<NewItem> & ItemFormDefaults)
  ): ItemFormRawValue | PartialWithRequiredKeyOf<NewItemFormRawValue> {
    return {
      ...item,
      createdDate: item.createdDate ? item.createdDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
