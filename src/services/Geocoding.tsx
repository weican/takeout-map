import { sendGetRequest } from "./Request"
import apikey from '../apikey.json';

const url = "https://maps.googleapis.com/maps/api/geocode/json";
// const placeUrl = "https://maps.googleapis.com/maps/api/place/autocomplete/json";
const placeUrl = 'https://maps.googleapis.com/maps/api/place/js/AutocompletionService.GetPredictionsJson';
export const getPlaceData = (address: string) => {
    const regexp = /#[0-9]+/;
    const modifyAddress = address.replace(regexp, '');
    return sendGetRequest(`${url}?address=${modifyAddress}&key=${apikey.key}`);
}

export const getAutocomplete = (name: string, cityLatLong: number[], radius: number) => {
    // return sendGetRequest(`${place}?input=${name}&location=${cityLatLong}&radius=${radius}`);
    return sendGetRequest(`${placeUrl}?input=${name}&location=${cityLatLong}&radius=${radius}&key=${apikey.key}&libraries=places`);
}
