export class PageConstants {
    static readonly FORM_NAME_M: string = "Crear Marca";
    static readonly FORM_NAME_C: string = "Crear Categoria";
    static readonly FORM_NAME_I: string = "Crear Articulo";

    static readonly BUTTON_LABEL: string = "Enviar";
    static readonly NAME: string = 'name';
    static readonly LABEL_NAME: string = 'Nombre';
    static readonly DESCRIPTION: string = 'description';
    static readonly LABEL_DESCRIPTION: string = 'Descripción';
    static readonly INPUT: string = 'input';
    static readonly TEXT_AREA: string = 'textarea';
    static readonly ORDER: string = 'asc';

    static readonly ERROR_BRANDS: string = 'Error fetching brands';
    static readonly ERROR_CATEGORIES: string = 'Error fetching categories';
    static readonly ERROR_ITEMS: string = 'Error fetching items';


    static readonly PATTERN: string = '^[a-zA-Z0-9 ñÑáéíóúÁÉÍÓÚüÜ]*$';
    static readonly ID: string = 'ID';
    static readonly PAGE_SIZE: number = 10;
    static readonly FIRST: number = 1;
    static readonly MIN_LENGTH: number = 3;
    static readonly MAX_NAME_LENGTH: number = 50;
    static readonly MAX_DESCRIPTION_LENGTH_1: number = 90;
    static readonly MAX_DESCRIPTION_LENGTH_2: number = 120;

    static readonly CATEGORY_LABEL: string = 'Categorias';
    static readonly BRAND_LABEL: string = 'Marcas';
    static readonly ITEM_LABEL: string = 'Articulos';
    static readonly CLIENT_LABEL: string = 'Clientes';
    static readonly CATEGORY_ROUTE: string = '/category';
    static readonly BRAND_ROUTE: string = '/brand';
    static readonly ITEM_ROUTE: string = '/item';
    static readonly CLIENT_ROUTE: string = '';
}
