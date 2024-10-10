import React from 'react'
import AddressSearch from '../../_components/AddressSearch'


export default function AddNewListing() {
  return (
    <div className='p-10 flex flex-col gap-5 items-center justify-center'>
      <h2 className='font-bold text-2xl'>Add New Listing</h2>
      <div>
        <h2 className='text-gray-500'>Enter Address You Want Listed</h2>
        <AddressSearch />
      </div>
    </div>
  )
}
