import { Observable } from 'rxjs';

export interface ResolvedVmData<T extends object = object> {
  vm$: Observable<T>;
}
