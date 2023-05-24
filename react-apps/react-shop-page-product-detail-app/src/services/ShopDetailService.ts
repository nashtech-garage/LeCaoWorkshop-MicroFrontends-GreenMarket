const ShopDetailService = {
    async getShopDetailInfo() : Promise<IShopDetailInfo> {
        const apiGetBannerInfo = `${process.env.API_ENDPOINT}/data/data.json`;
        const getBannerInfo = await fetch(apiGetBannerInfo);
        const bannerInfo = await getBannerInfo.json();

        return bannerInfo.data.shopdetailPage;
    }
}

export default ShopDetailService;