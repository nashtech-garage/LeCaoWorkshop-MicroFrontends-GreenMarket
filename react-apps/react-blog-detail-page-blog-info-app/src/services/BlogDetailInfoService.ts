const BlogDetailInfoService = {
    async getBlogDetailInfoById(id:number) : Promise<IBlogDetailInfo> {
        const apiGetInfo = `${process.env.COMMON_API_URL}/api/Blog?id=${id}`;
        const getBlogDetailInfo = await fetch(apiGetInfo);
        const blogDetailInfo = await getBlogDetailInfo.json();
        return blogDetailInfo;
    }
}

export default BlogDetailInfoService;