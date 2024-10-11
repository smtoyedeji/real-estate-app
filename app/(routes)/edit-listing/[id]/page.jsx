"use client";
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { usePathname } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';
import { toast } from "sonner"

export default function EditListing() {
    // Initialize Formik
    const formik = useFormik({
        initialValues: {
            type: 'rent',
            propertyType: '',
            bedroom: '',
            bathroom: '',
            builtIn: '',
            parking: '',
            lotSize: '',
            area: '',
            price: '',
            hoa: '',
            description: '',
        },
        onSubmit: async (values) => {
            // Handle form submission here
            console.log(values);
            const { data, error } = await supabase
                .from('listing')
                .update(values)
                .eq('id', params.split('/')[2])
                .select()
                console.log(data)
                if (data) {
                    console.log('succecess')
                    toast('Listing updated successfully')
                } else {
                    console.log((error))
                    toast('Serverside error')
                }
        },
    });

    const params = usePathname()
    useEffect(() => {
        console.log(params.split('/')[2])
    })

    return (
        <div className='px-10 md:px-36 mt-10'>
            <h2 className='font-bold text-2xl mb-2'>
                Enter some more details about your listing
            </h2>
            <form onSubmit={formik.handleSubmit}>
                <div className='p-6 rounded-lg shadow-md'>
                    <div className='grid grid-cols-1 md:grid-cols-3'>
                        <div className='flex flex-col gap-2 m-2'>
                            <h2 className='text-lg text-slate-500'>Rent or Sell?</h2>
                            <RadioGroup
                                value={formik.values.type}
                                onValueChange={(value) => formik.setFieldValue('type', value)}
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="rent" id="rent" />
                                    <Label htmlFor="rent">Rent</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="sell" id="sell" />
                                    <Label htmlFor="sell">Sell</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className='flex flex-col m-2'>
                            <h2 className='text-lg text-slate-500'>Property Type</h2>
                            <Select
                                onValueChange={(value) => formik.setFieldValue('propertyType', value)}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select Property Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Single Family House">Single Family House</SelectItem>
                                    <SelectItem value="Town House">Town House</SelectItem>
                                    <SelectItem value="Condo">Condo</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className='flex flex-col m-2'>
                            <h2 className='text-lg text-slate-500'>Bedroom</h2>
                            <Input
                                type='number'
                                id='bedroom'
                                placeholder='Ex.2'
                                onChange={formik.handleChange}
                                value={formik.values.bedroom}
                            />
                        </div>

                        <div className='flex flex-col m-2'>
                            <h2 className='text-lg text-slate-500'>Bathroom</h2>
                            <Input
                                type='number'
                                id='bathroom'
                                placeholder='Ex.2'
                                onChange={formik.handleChange}
                                value={formik.values.bathroom}
                            />
                        </div>

                        <div className='flex flex-col m-2'>
                            <h2 className='text-lg text-slate-500'>Built In</h2>
                            <Input
                                type='number'
                                id='builtIn'
                                placeholder='Ex.1900'
                                onChange={formik.handleChange}
                                value={formik.values.builtIn}
                            />
                        </div>

                        <div className='flex flex-col m-2'>
                            <h2 className='text-lg text-slate-500'>Parking</h2>
                            <Input
                                type='number'
                                id='parking'
                                placeholder='Ex.2'
                                onChange={formik.handleChange}
                                value={formik.values.parking}
                            />
                        </div>

                        <div className='flex flex-col m-2'>
                            <h2 className='text-lg text-slate-500'>Lot Size (Sq.Ft)</h2>
                            <Input
                                type='number'
                                id='lotSize'
                                placeholder='Ex.1900 Sq.ft'
                                onChange={formik.handleChange}
                                value={formik.values.lotSize}
                            />
                        </div>

                        <div className='flex flex-col m-2'>
                            <h2 className='text-lg text-slate-500'>Area (Sq.FT)</h2>
                            <Input
                                type='number'
                                id='area'
                                placeholder='Ex.1900Sq.ft'
                                onChange={formik.handleChange}
                                value={formik.values.area}
                            />
                        </div>

                        <div className='flex flex-col m-2'>
                            <h2 className='text-lg text-slate-500'>Selling Price</h2>
                            <Input
                                type='number'
                                id='price'
                                placeholder='400000'
                                onChange={formik.handleChange}
                                value={formik.values.price}
                            />
                        </div>

                        <div className='flex flex-col m-2'>
                            <h2 className='text-lg text-slate-500'>HOA (Per Month)($)</h2>
                            <Input
                                type='number'
                                id='hoa'
                                placeholder='100'
                                onChange={formik.handleChange}
                                value={formik.values.hoa}
                            />
                        </div>
                    </div>

                    <div className='grid grid-cols-1 gap-10 m-2'>
                        <div className='flex flex-col'>
                            <h2 className='text-lg text-slate-500'>Description</h2>
                            <Textarea
                                placeholder="Type your message here."
                                id="description"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                            />
                        </div>
                    </div>

                    <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
