import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IOrder, NewOrder } from '../order.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IOrder for edit and NewOrderFormGroupInput for create.
 */
type OrderFormGroupInput = IOrder | PartialWithRequiredKeyOf<NewOrder>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IOrder | NewOrder> = Omit<T, 'createdDate'> & {
  createdDate?: string | null;
};

type OrderFormRawValue = FormValueOf<IOrder>;

type NewOrderFormRawValue = FormValueOf<NewOrder>;

type OrderFormDefaults = Pick<NewOrder, 'id' | 'createdDate'>;

type OrderFormGroupContent = {
  id: FormControl<OrderFormRawValue['id'] | NewOrder['id']>;
  orderID: FormControl<OrderFormRawValue['orderID']>;
  orderNumber: FormControl<OrderFormRawValue['orderNumber']>;
  customerCode: FormControl<OrderFormRawValue['customerCode']>;
  createdDate: FormControl<OrderFormRawValue['createdDate']>;
  transactionID: FormControl<OrderFormRawValue['transactionID']>;
  locationCode: FormControl<OrderFormRawValue['locationCode']>;
  tenantCode: FormControl<OrderFormRawValue['tenantCode']>;
};

export type OrderFormGroup = FormGroup<OrderFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class OrderFormService {
  createOrderFormGroup(order: OrderFormGroupInput = { id: null }): OrderFormGroup {
    const orderRawValue = this.convertOrderToOrderRawValue({
      ...this.getFormDefaults(),
      ...order,
    });
    return new FormGroup<OrderFormGroupContent>({
      id: new FormControl(
        { value: orderRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      orderID: new FormControl(orderRawValue.orderID, {
        validators: [Validators.required],
      }),
      orderNumber: new FormControl(orderRawValue.orderNumber, {
        validators: [Validators.required],
      }),
      customerCode: new FormControl(orderRawValue.customerCode, {
        validators: [Validators.required],
      }),
      createdDate: new FormControl(orderRawValue.createdDate),
      transactionID: new FormControl(orderRawValue.transactionID, {
        validators: [Validators.required],
      }),
      locationCode: new FormControl(orderRawValue.locationCode, {
        validators: [Validators.required],
      }),
      tenantCode: new FormControl(orderRawValue.tenantCode, {
        validators: [Validators.required],
      }),
    });
  }

  getOrder(form: OrderFormGroup): IOrder | NewOrder {
    return this.convertOrderRawValueToOrder(form.getRawValue() as OrderFormRawValue | NewOrderFormRawValue);
  }

  resetForm(form: OrderFormGroup, order: OrderFormGroupInput): void {
    const orderRawValue = this.convertOrderToOrderRawValue({ ...this.getFormDefaults(), ...order });
    form.reset(
      {
        ...orderRawValue,
        id: { value: orderRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): OrderFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdDate: currentTime,
    };
  }

  private convertOrderRawValueToOrder(rawOrder: OrderFormRawValue | NewOrderFormRawValue): IOrder | NewOrder {
    return {
      ...rawOrder,
      createdDate: dayjs(rawOrder.createdDate, DATE_TIME_FORMAT),
    };
  }

  private convertOrderToOrderRawValue(
    order: IOrder | (Partial<NewOrder> & OrderFormDefaults)
  ): OrderFormRawValue | PartialWithRequiredKeyOf<NewOrderFormRawValue> {
    return {
      ...order,
      createdDate: order.createdDate ? order.createdDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
