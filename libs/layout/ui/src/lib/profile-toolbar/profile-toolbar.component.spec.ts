import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedUiMaterialModule } from '@sr/shared/ui-material';

import { ProfileToolbarComponent } from './profile-toolbar.component';

describe('ProfileToolbarComponent', () => {
  let component: ProfileToolbarComponent;
  let fixture: ComponentFixture<ProfileToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedUiMaterialModule],
      declarations: [ProfileToolbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileToolbarComponent);
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
