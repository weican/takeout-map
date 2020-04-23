import { sendGetRequest } from "./Request"
import apikey from '../apikey.json';

const url = "https://maps.googleapis.com/maps/api/geocode/json";

export const getPlaceData = (address: string) => {
    const regexp = /#[0-9]+/;
    const modifyAddress = address.replace(regexp, '');
    return sendGetRequest(`${url}?address=${modifyAddress}&key=${apikey.key}`);
}
