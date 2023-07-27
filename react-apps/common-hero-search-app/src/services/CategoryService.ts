const CategoryService = {
    async getCategories() : Promise<ICategory[]> {
        const apiGetCategories = `${process.env.COMMON_API_URL}/api/Category/all`;
        const getCategories = await fetch(apiGetCategories);
        const cats = await getCategories.json();

        return cats.map(
            (category: ICategory[]) => category
        );
    }
}

export default CategoryService;