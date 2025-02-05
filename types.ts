export type Products = {
    id?: string;
    name: string;
    discription: string;
    price: number;
    createdAt?: string;
    updatedAt?: string;
    userId?: string;
}

export interface SubItem {
    title: string;
    path: string;
}

export interface MenuItem {
    title: string;
    icon: string;
    path?: string;
    subItems?: SubItem[];
    click?: () => void;
}
