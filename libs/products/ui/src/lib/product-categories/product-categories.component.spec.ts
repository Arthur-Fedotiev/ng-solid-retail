import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedUiMaterialModule } from '@sr/shared/ui-material';
import { TRACK_BY_ID_OR_IDX } from '@sr/shared/util';
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
      providers: [
        {
          provide: TRACK_BY_ID_OR_IDX,
          useValue: () => 'id',
        },
      ],
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

  it('should use track by id token', () => {
    expect(component.trackById).toBeTruthy();
  });
});
