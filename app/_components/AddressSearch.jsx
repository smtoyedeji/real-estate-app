"use client"
import React from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

export default function AddressSearch() {
  return (
    <div>
      <GooglePlacesAutocomplete
          apiKey='process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY'
        />
    </div>
  )
}
