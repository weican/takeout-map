import { sendPostRequest, sendGetRequest, sendDeleteRequest } from "./Request"

export const url = "https://takeout-map.herokuapp.com/";

export const getAllRestaurants = () => {
    return sendGetRequest(url + 'restaurants');
}

export const getRestaurantsByLocation = () => {

}