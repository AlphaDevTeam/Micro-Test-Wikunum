import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { StockFormService, StockFormGroup } from './stock-form.service';
import { IStock } from '../stock.model';
import { StockService } from '../service/stock.service';
import { IItem } from 'app/entities/inventoryManagement/item/item.model';
import { ItemService } from 'app/entities/inventoryManagement/item/service/item.service';

@Component({
  selector: 'jhi-stock-update',
  templateUrl: './stock-update.component.html',
})
export class StockUpdateComponent implements OnInit {
  isSaving = false;
  stock: IStock | null = null;

  itemsSharedCollection: IItem[] = [];

  editForm: StockFormGroup = this.stockFormService.createStockFormGroup();

  constructor(
    protected stockService: StockService,
    protected stockFormService: StockFormService,
    protected itemService: ItemService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareItem = (o1: IItem | null, o2: IItem | null): boolean => this.itemService.compareItem(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ stock }) => {
      this.stock = stock;
      if (stock) {
        this.updateForm(stock);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const stock = this.stockFormService.getStock(this.editForm);
    if (stock.id !== null) {
      this.subscribeToSaveResponse(this.stockService.update(stock));
    } else {
      this.subscribeToSaveResponse(this.stockService.create(stock));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStock>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(stock: IStock): void {
    this.stock = stock;
    this.stockFormService.resetForm(this.editForm, stock);

    this.itemsSharedCollection = this.itemService.addItemToCollectionIfMissing<IItem>(this.itemsSharedCollection, stock.item);
  }

  protected loadRelationshipsOptions(): void {
    this.itemService
      .query()
      .pipe(map((res: HttpResponse<IItem[]>) => res.body ?? []))
      .pipe(map((items: IItem[]) => this.itemService.addItemToCollectionIfMissing<IItem>(items, this.stock?.item)))
      .subscribe((items: IItem[]) => (this.itemsSharedCollection = items));
  }
}
