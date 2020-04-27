export interface Place {
    name: string,
    category: any,
    address: string,
    city: string,
    postcode: string,
    state: string,
    country: string,
    latitude: number,
    longitude: number,
    notes: string,
    phone: string,
    open_time: string,
    website: string,
    updated_at: Date | null,
    created_at: Date,
  }
  
  
export const PlaceData: Place = {
  name: "",
  category: null,
  address: "",
  city: "",
  postcode: "",
  state: "",
  country: "",
  latitude: 0.0,
  longitude: 0.0,
  notes: "",
  phone: "",
  open_time: "",
  website: "",
  updated_at: null,
  created_at: new Date()
}