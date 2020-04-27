import { sendPutRequest, sendGetRequest } from "./Request"
import { url } from "./Restaurant";

export const getCategories = () => {
    return sendGetRequest(`${url}categories?sort=name,asc`);
}

export const createCatgoryWithRestaurant = (restaurantUrl: string, categoryUrl: string) => {
    return sendPutRequest(restaurantUrl,categoryUrl, "text/uri-list");
}