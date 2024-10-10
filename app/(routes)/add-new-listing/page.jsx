"use client"
import React, { useState } from 'react'
import AddressSearch from '../../_components/AddressSearch'
import { Button } from '@/components/ui/button'
import { supabase } from '@/utils/supabase/client'
import { useUser } from '@clerk/nextjs'
import { toast } from "sonner"
import { Loader } from 'lucide-react'


export default function AddNewListing() {
  const [selectedAddress, setSelectedAddress] = useState("")
  const [coordinates, setCoordinates] = useState("")
  const { user } = useUser()
  const [loader, setLoader] = useState(false);
  // console.log(user.primaryEmailAddress.emailAddress)

  const nextHandler = async () => {
    setLoader(true)
    console.log(selectedAddress, coordinates)
    const { data, error } = await supabase
      .from('listing')
      .insert([
        {
          address: selectedAddress.label,
          coordinates: coordinates,
          createdBy: user?.primaryEmailAddress.emailAddress
        },
      ])
      .select()
    if (data) {
      setLoader(false)
      toast("New Addres added for listing")
      console.log("New data added", data)
    } else {
      setLoader(false)
      console.log(error)
      toast("Serverside error")
    }
  }
  return (
    <div className='mt-10 md:mx-56 lg:mx-80'>
      <div className='p-10 flex flex-col gap-5 items-center justify-center'>
        <h2 className='font-bold text-2xl'>Add New Listing</h2>
        <div className='p-10 w-full rounded-lg border shadow-md flex flex-col'>
          <h2 className='text-gray-500'>Enter Address You Want Listed</h2>
          <AddressSearch
            selectedAddress={(value) => setSelectedAddress(value)}
            coordinates={(value) => setCoordinates(value)}
          />

          <Button
            onClick={nextHandler}
            disabled={!selectedAddress || !coordinates || loader}
          >
            {loader ? <Loader className="animate-spin" /> :
              'Next'}</Button>
        </div>
      </div>
    </div>

  )
}
