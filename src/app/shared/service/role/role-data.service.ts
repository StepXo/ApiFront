import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DropdownDataService } from '../../models/dropdownDataService';
import { DropdownItem } from '../../models/dropdownItem';

@Injectable({
  providedIn: 'root'
})
export class RoleDataService implements DropdownDataService {
  private readonly roles: DropdownItem[] = [
    { id: 1, name: 'Usuario' },
    { id: 2, name: 'Administrador' },
    { id: 3, name: 'Auxiliar de bodega' }
  ];

  getData(): Observable<DropdownItem[]> {
    return of(this.roles);
  }
}
