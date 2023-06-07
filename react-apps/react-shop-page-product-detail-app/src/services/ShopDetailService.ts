const ShopDetailService = {
    async getProductById(id:number) : Promise<IShopDetailInfo> {
        const apiGetInfo = `${process.env.API_ENDPOINT}/data/data.json`;
        const getShopDetailInfo = await fetch(apiGetInfo);
        const shopDetailInfo = await getShopDetailInfo.json();
        const products: Array<IShopDetailInfo> = shopDetailInfo.data.products;

        const filteredById = Object.values(products).find(x => x.id === id);
        console.log(filteredById);
        
        
        return filteredById;
    }
}

export default ShopDetailService;