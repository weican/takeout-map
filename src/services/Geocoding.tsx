import { sendGetRequest } from "./Request"

const url = "https://maps.googleapis.com/maps/api/geocode/json";

export const getPlaceData = (address: string) => {
    const regexp = /#[0-9]+/;
    const modifyAddress = address.replace(regexp, '');
    return sendGetRequest(`${url}?address=${modifyAddress}`);
}
