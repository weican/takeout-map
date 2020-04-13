import { sendPostRequest, sendGetRequest, sendDeleteRequest } from "./Request"
import { Place } from "../components/ModalDialog";

// export const url = "https://takeout-map.herokuapp.com/";
export const url = "https://takeout-map-stage.herokuapp.com/";
// export const url = "http://localhost:8080/";

export const getAllRestaurants = (size = 500) => {
    return sendGetRequest(`${url}restaurants?size=${size}`);
}

export const createRestaurant = (place : Place) => {
    return sendPostRequest(`${url}restaurants`, place);
}

export const deleteRestaurant = (uuid: string) => {
    return sendDeleteRequest(`${url}restaurants/${uuid}`);
}

export const getRestaurantsByLocation = () => {

}