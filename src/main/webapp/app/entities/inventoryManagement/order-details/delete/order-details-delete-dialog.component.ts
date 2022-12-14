import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IOrderDetails } from '../order-details.model';
import { OrderDetailsService } from '../service/order-details.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './order-details-delete-dialog.component.html',
})
export class OrderDetailsDeleteDialogComponent {
  orderDetails?: IOrderDetails;

  constructor(protected orderDetailsService: OrderDetailsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.orderDetailsService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
