const ShopDetailService = {
    async getShopDetailInfo() : Promise<IShopDetailInfo> {
        const apiGetInfo = `${process.env.API_ENDPOINT}/data/data.json`;
        const getShopDetailInfo = await fetch(apiGetInfo);
        const shopDetailInfo = await getShopDetailInfo.json();

        return shopDetailInfo.data.shopdetailPage;
    }
}

export default ShopDetailService;