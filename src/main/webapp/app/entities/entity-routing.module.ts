import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'order-details',
        data: { pageTitle: 'wikunumApp.inventoryManagementOrderDetails.home.title' },
        loadChildren: () =>
          import('./inventoryManagement/order-details/order-details.module').then(m => m.InventoryManagementOrderDetailsModule),
      },
      {
        path: 'item',
        data: { pageTitle: 'wikunumApp.inventoryManagementItem.home.title' },
        loadChildren: () => import('./inventoryManagement/item/item.module').then(m => m.InventoryManagementItemModule),
      },
      {
        path: 'stock',
        data: { pageTitle: 'wikunumApp.inventoryManagementStock.home.title' },
        loadChildren: () => import('./inventoryManagement/stock/stock.module').then(m => m.InventoryManagementStockModule),
      },
      {
        path: 'order',
        data: { pageTitle: 'wikunumApp.inventoryManagementOrder.home.title' },
        loadChildren: () => import('./inventoryManagement/order/order.module').then(m => m.InventoryManagementOrderModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
