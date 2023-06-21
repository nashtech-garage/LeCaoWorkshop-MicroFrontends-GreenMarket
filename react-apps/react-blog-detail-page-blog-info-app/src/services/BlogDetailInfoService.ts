const BlogDetailInfoService = {
    async getBlogDetailInfoById(id:number) : Promise<IBlogDetailInfo> {
        const apiGetInfo = `${process.env.API_ENDPOINT}/data/data.json`;
        const getBlogDetailInfo = await fetch(apiGetInfo);
        const blogDetailInfo = await getBlogDetailInfo.json();
        const blogs: Array<IBlogDetailInfo> = blogDetailInfo.data.blog;
        const filteredById = Object.values(blogs).find(x => x.id === id);
        return filteredById;
    }
}

export default BlogDetailInfoService;