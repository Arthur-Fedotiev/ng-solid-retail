import { ProductsNavigationManagerService } from './products-navigation-manager.service';
import { Router } from '@angular/router';
import { ROUTES } from './constants';

describe('ProductsNavigationManagerService', () => {
  it('should navigate to display', () => {
    const { service, navigateByUrlSpy } = setup();
    service.navigateToDisplay();
    expect(navigateByUrlSpy).toHaveBeenCalledWith(ROUTES.display());
  });

  it('should navigate to product', () => {
    const { service, navigateByUrlSpy } = setup();
    const id = '1';
    service.navigateToProduct(id);
    expect(navigateByUrlSpy).toHaveBeenCalledWith(ROUTES.details(id));
  });

  function setup() {
    const routerMock = {
      navigateByUrl: jest.fn(),
    } as unknown as Router;

    const service = new ProductsNavigationManagerService(routerMock);
    return { service, navigateByUrlSpy: routerMock.navigateByUrl };
  }
});
