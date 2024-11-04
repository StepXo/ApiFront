import { TestBed } from '@angular/core/testing';
import { RoleDataService } from './role-data.service';
import { DropdownItem } from '../../models/dropdownItem';

describe('RoleDataService', () => {
  let service: RoleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleDataService);
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería devolver los datos de roles como Observable<DropdownItem[]>', (done) => {
    const expectedRoles: DropdownItem[] = [
      { id: 1, name: 'Usuario' },
      { id: 2, name: 'Administrador' },
      { id: 3, name: 'Auxiliar de bodega' }
    ];

    service.getData().subscribe((roles) => {
      expect(roles).toEqual(expectedRoles);
      done();
    });
  });
});
