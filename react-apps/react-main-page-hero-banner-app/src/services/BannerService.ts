const BannerService = {
    async getBannerInfo() : Promise<IBannerInfo> {
        const apiGetBannerInfo = `${process.env.API_ENDPOINT}/data/data.json`;
        const getBannerInfo = await fetch(apiGetBannerInfo);
        const bannerInfo = await getBannerInfo.json();

        return bannerInfo.data.mainHeroBanner;
    }
}

export default BannerService;