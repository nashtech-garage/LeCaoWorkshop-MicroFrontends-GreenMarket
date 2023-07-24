const BannerService = {
    async getBannerInfo() : Promise<IBannerInfo> {
        const apiGetBannerInfo = `${process.env.COMMON_API_URL}/api/MainHeroBanner/all`;
        const getBannerInfo = await fetch(apiGetBannerInfo);
        const bannerInfo = await getBannerInfo.json();
        return bannerInfo.length > 0 ? bannerInfo[0] : bannerInfo;
    }
}

export default BannerService;