import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedUiMaterialModule } from '@omnia/shared/ui-material';
import { ProductCategoriesComponent } from './product-categories.component';

describe('ProductCategoriesComponent', () => {
  let component: ProductCategoriesComponent<
    readonly { id: string; name: string }[]
  >;
  let fixture: ComponentFixture<
    ProductCategoriesComponent<readonly { id: string; name: string }[]>
  >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, SharedUiMaterialModule],
      declarations: [ProductCategoriesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
