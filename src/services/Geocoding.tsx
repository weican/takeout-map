import { sendGetRequest } from "./Request"
import apikey from '../apikey.json';

export const url = "https://maps.googleapis.com/maps/api/geocode/json";
export const getPlaceData = (address: string) => {
    return sendGetRequest(`${url}?address=${address}&key=${apikey.key}`);
}
