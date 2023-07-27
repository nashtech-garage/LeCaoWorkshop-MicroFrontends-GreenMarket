export type Product = {
    id: number,
    name: string,
    price: number,
    category_id: number,
    weight: number,
    description_short: string,
    description: string,
    information: string,
    color: string,
    discount: number,
    availability: boolean,
    main_image_url: string,
    images_urls: string[],
    is_featured: boolean,
    count: number,
    is_latest: boolean,
    review_count: number,
}