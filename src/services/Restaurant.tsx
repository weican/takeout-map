import { sendPostRequest, sendGetRequest, sendDeleteRequest } from "./Request"
import { Place } from "../components/ModalDialog";

export const url = "https://takeout-map.herokuapp.com/";
// export const url = "http://localhost:8080/";

export const getAllRestaurants = () => {
    return sendGetRequest(url + 'restaurants');
}

export const createRestaurant = (place : Place) => {
    return sendPostRequest(url + 'restaurants', place);
}

export const deleteRestaurant = (url: string) => {
    return sendDeleteRequest(url);
}

export const getRestaurantsByLocation = () => {

}