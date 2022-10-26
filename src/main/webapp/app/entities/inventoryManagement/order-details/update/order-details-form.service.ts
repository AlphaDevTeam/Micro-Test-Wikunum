import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IOrderDetails, NewOrderDetails } from '../order-details.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IOrderDetails for edit and NewOrderDetailsFormGroupInput for create.
 */
type OrderDetailsFormGroupInput = IOrderDetails | PartialWithRequiredKeyOf<NewOrderDetails>;

type OrderDetailsFormDefaults = Pick<NewOrderDetails, 'id'>;

type OrderDetailsFormGroupContent = {
  id: FormControl<IOrderDetails['id'] | NewOrderDetails['id']>;
  notes: FormControl<IOrderDetails['notes']>;
  orderedQty: FormControl<IOrderDetails['orderedQty']>;
  order: FormControl<IOrderDetails['order']>;
  item: FormControl<IOrderDetails['item']>;
};

export type OrderDetailsFormGroup = FormGroup<OrderDetailsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class OrderDetailsFormService {
  createOrderDetailsFormGroup(orderDetails: OrderDetailsFormGroupInput = { id: null }): OrderDetailsFormGroup {
    const orderDetailsRawValue = {
      ...this.getFormDefaults(),
      ...orderDetails,
    };
    return new FormGroup<OrderDetailsFormGroupContent>({
      id: new FormControl(
        { value: orderDetailsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      notes: new FormControl(orderDetailsRawValue.notes),
      orderedQty: new FormControl(orderDetailsRawValue.orderedQty, {
        validators: [Validators.required],
      }),
      order: new FormControl(orderDetailsRawValue.order),
      item: new FormControl(orderDetailsRawValue.item),
    });
  }

  getOrderDetails(form: OrderDetailsFormGroup): IOrderDetails | NewOrderDetails {
    return form.getRawValue() as IOrderDetails | NewOrderDetails;
  }

  resetForm(form: OrderDetailsFormGroup, orderDetails: OrderDetailsFormGroupInput): void {
    const orderDetailsRawValue = { ...this.getFormDefaults(), ...orderDetails };
    form.reset(
      {
        ...orderDetailsRawValue,
        id: { value: orderDetailsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): OrderDetailsFormDefaults {
    return {
      id: null,
    };
  }
}
