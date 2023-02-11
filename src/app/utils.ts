export interface iResult {
    status: boolean,
    message: string,
    data: any
}

export interface iProduct {
    productId: number,
    categoryId: number,
    productDesc: string,
    productDetails: string,
    productName: string,
    categoryName: string,
    date: Date,
    pages: string,
    price: number,
    metaKeywords?: string,
    images?: iImages[],
    features?: iFeatures[]
}

export interface iImages {
    id: number,
    name: string,
    type?: string
}

export interface iFeatures {
    id: number,
    details: string,
    productId?: number
}