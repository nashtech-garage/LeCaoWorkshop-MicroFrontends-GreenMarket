const CategoryService = {
    async getCategories() : Promise<ICategory[]> {
        const apiGetCategories = `${process.env.API_ENDPOINT}/data/data.json`;
        const getCategories = await fetch(apiGetCategories);
        const cats = await getCategories.json();

        return cats.data.categories.map(
            (category: ICategory[]) => category
        );
    }
}

export default CategoryService;