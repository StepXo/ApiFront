import { Observable } from 'rxjs';
import { DropdownItem } from './dropdownItem';

export interface DropdownDataService {
    getData(): Observable<DropdownItem[]>;
}
