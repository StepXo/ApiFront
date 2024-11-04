import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupplyComponent } from './supply.component';
import { AuthService } from 'src/app/shared/service/auth/auth.service';
import { ItemService } from 'src/app/shared/service/item/item.service';
import { TransactionService } from 'src/app/shared/service/transaction/transaction.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { SupplyRequest } from 'src/app/shared/models/supplyRequest';
import { SupplyResponse } from 'src/app/shared/models/supplyResponse';
import { ValidationsService } from 'src/app/shared/service/validations/validations.service';

describe('SupplyComponent', () => {
  let component: SupplyComponent;
  let fixture: ComponentFixture<SupplyComponent>;
  let authServiceMock: jest.Mocked<AuthService>;
  let itemServiceMock: jest.Mocked<ItemService>;
  let transactionServiceMock: jest.Mocked<TransactionService>;
  let routerMock: jest.Mocked<Router>;

  beforeEach(async () => {
    authServiceMock = {
      getRole: jest.fn().mockReturnValue('ROLE_WAREHOUSE_AUX')
    } as unknown as jest.Mocked<AuthService>;

    itemServiceMock = {
    } as unknown as jest.Mocked<ItemService>;

    transactionServiceMock = {
      createSupply: jest.fn()
    } as unknown as jest.Mocked<TransactionService>;

    routerMock = {
      navigate: jest.fn()
    } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      declarations: [SupplyComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: ItemService, useValue: itemServiceMock },
        { provide: TransactionService, useValue: transactionServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home if the user is not warehouse auxiliary', () => {
    authServiceMock.getRole.mockReturnValue('ROLE_USER');
    
    fixture = TestBed.createComponent(SupplyComponent);
    component = fixture.componentInstance;
  
    component.ngOnInit();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
  });
  

  it('should initialize formFieldsConfig with necessary fields', () => {
    expect(component.formFieldsConfig.length).toBe(3);
    const itemField = component.formFieldsConfig.find(field => field.name === 'itemId');
    const quantityField = component.formFieldsConfig.find(field => field.name === 'quantity');
    const dateField = component.formFieldsConfig.find(field => field.name === 'date');
    expect(itemField).toBeTruthy();
    expect(quantityField).toBeTruthy();
    expect(dateField).toBeTruthy();
  });

  it('should set errorMessage on validation error from backend', () => {
    const errorResponse = { status: 404, message: 'Item not found' };
    jest.spyOn(ValidationsService, 'validateSupply').mockReturnValue('Error: Item not found');

    transactionServiceMock.createSupply.mockReturnValue(throwError(() => errorResponse));
    component.onFormSubmit({ itemId: 1, quantity: 10 });

    expect(component.errorMessage).toBe('Error: Item not found');
    expect(transactionServiceMock.createSupply).toHaveBeenCalled();
  });

  it('should reset errorMessage on successful submission', () => {
    const supplyRequest: SupplyRequest = { itemId: 1, quantity: 10 };
    const supplyResponse: SupplyResponse = {id:1, idUser: 1, idItem: 1, quantity: 10, date: "today", };

    transactionServiceMock.createSupply.mockReturnValue(of(supplyResponse));

    component.onFormSubmit(supplyRequest);

    expect(component.errorMessage).toBeNull();
    expect(transactionServiceMock.createSupply).toHaveBeenCalledWith(supplyRequest);
  });

  it('should initialize backButtonConfig correctly', () => {
    component.ngOnInit();
    expect(component.backButtonConfig).toEqual({
      label: 'Volver',
      size: component.size,
      route: '/register'
    });
  });

  it('should call initializeButtonConfigs on ngOnInit', () => {
    const initializeButtonConfigsSpy = jest.spyOn(component as any, 'initializeButtonConfigs');
    component.ngOnInit();
    expect(initializeButtonConfigsSpy).toHaveBeenCalled();
  });
});
