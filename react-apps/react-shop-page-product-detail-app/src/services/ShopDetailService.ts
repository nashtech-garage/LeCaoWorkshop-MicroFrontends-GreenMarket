const ShopDetailService = {
    async getProductById(id:number) : Promise<IShopDetailInfo> {
        // const apiGetInfo = `${process.env.API_ENDPOINT}/data/data.json`;
        const apiGetInfo = `${process.env.COMMON_API_URL}/api/Product?id=${id}`;
        const getShopDetailInfo = await fetch(apiGetInfo);
        const shopDetailInfo = await getShopDetailInfo.json();
        const product: IShopDetailInfo = shopDetailInfo;
        console.log(product);
        return product;

        // const filteredById = Object.values(products).find(x => x.id === id);
        // console.log(filteredById);
        // return filteredById;
    }
}

export default ShopDetailService;