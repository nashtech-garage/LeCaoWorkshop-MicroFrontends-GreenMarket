import Configuration from "../../app.configuration.json";

const CategoryService = {
    async getCategories() : Promise<ICategory[]> {
        const getCategories = await fetch(Configuration.api.getCategories);
        const cats = await getCategories.json();

        return cats.data.categories.map(
            (category: ICategory[]) => category
        );
    }
}

export default CategoryService;