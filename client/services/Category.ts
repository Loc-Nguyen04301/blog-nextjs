import api from "./axios"


const getAllCategories = () => {
    return api.get("/category")
}

const CategoryService = {
    getAllCategories
}

export default CategoryService