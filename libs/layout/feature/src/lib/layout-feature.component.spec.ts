import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutFeatureComponent } from './layout-feature.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedUiMaterialModule } from '@omnia/shared/ui-material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutUiModule } from '@omnia/layout/ui';

describe('LayoutFeatureComponent', () => {
  let component: LayoutFeatureComponent;
  let fixture: ComponentFixture<LayoutFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedUiMaterialModule,
        NoopAnimationsModule,
        LayoutUiModule,
      ],
      declarations: [LayoutFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});
