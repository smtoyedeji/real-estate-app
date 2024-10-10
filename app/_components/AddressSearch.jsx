"use client"
import { MapPin } from 'lucide-react'
import React from 'react'
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'

export default function AddressSearch({ selectedAddress, coordinates }) {
  return (
    <div className='flex items-center w-full'>
      <MapPin className='h-10 w-10 p-2 rounded-sm text-primary bg-purple-500' />
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
        selectProps={{
          placeholder: 'Search Property Address',
          isClearable: true,
          className: 'w-full',
          onChange: (place) => {
            console.log(place)
            // Handle case where address is cleared
            if (!place) {
              selectedAddress(null); // Clear the selected address
              coordinates(null);  // Clear the coordinates
              return;
            }
            selectedAddress(place)
            geocodeByAddress(place.label)
              .then(result => getLatLng(result[0]))
              .then(({ lat, lng }) => {
                coordinates({ lat, lng })
              })
          }
        }}
      />
    </div>
  )
}
