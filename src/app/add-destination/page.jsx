"use client";
import { 
  Button, 
  Card, 
  FieldError, 
  Input, 
  Label, 
  ListBox, 
  Select, 
  TextArea, 
  TextField 
} from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const AddDestinationPage = () => {
    const router = useRouter();
    // Select ki value state mein rakhna behtar hai taaki form data miss na ho
    const [category, setCategory] = useState("");

   
    const onSubmit = async (e) => {
        e.preventDefault();
        
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Manually adding category and converting price
        const destination = {
            ...data,
            category: category, // Select ki state value
            price: Number(data.price),
        };

        // Basic Validation
        if(!destination.category) {
            alert("Please select a category");
            return;
        }

        try {
            const res = await fetch('${process.env.NEXT_PUBLIC_SERVER_URL}/destinations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // authorization:`Bearer ${token}`

                },
                body: JSON.stringify(destination)
            });

            if (res.ok) {
                alert("Destination Added Successfully! 🎉");
                router.push('/destinations');
                router.refresh();
            } else {
                alert("Failed to add destination. Check server.");
            }
        } catch (error) {
            console.error("Network error:", error);
            alert("Server connection failed!");
        }
    };
   
    return (
        <div className='p-5 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-black text-slate-800 mb-8 tracking-tighter'>
                ADD NEW DESTINATION
            </h1>
            
            <Card className="shadow-2xl shadow-slate-200 border-none rounded-[2.5rem]">
                <form onSubmit={onSubmit} className="p-10 space-y-8 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Destination Name */}
                        <div className="md:col-span-2">
                            <TextField name="destinationName" isRequired className="w-full">
                                <Label className="text-sm font-bold text-slate-700 mb-2 block uppercase tracking-wider">Destination Name</Label>
                                <Input placeholder="Bali Paradise Resort" className="rounded-2xl border-slate-200 focus:border-cyan-500" />
                                <FieldError className="text-red-500 text-xs mt-2 italic" />
                            </TextField>
                        </div>

                        {/* Country */}
                        <TextField name="country" isRequired className="w-full">
                            <Label className="text-sm font-bold text-slate-700 mb-2 block uppercase tracking-wider">Country</Label>
                            <Input placeholder="Indonesia" className="rounded-2xl border-slate-200" />
                            <FieldError />
                        </TextField>

                        {/* Category Fix with onSelectionChange */}
                        <div className="flex flex-col">
                            <Label className="text-sm font-bold text-slate-700 mb-2 block uppercase tracking-wider">Category</Label>
                            <Select
                                isRequired
                                placeholder="Choose a vibe"
                                onSelectionChange={(selected) => setCategory(selected)}
                                className="w-full"
                            >
                                <Select.Trigger className="rounded-2xl h-12 bg-slate-50 border-slate-200">
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>
                                <Select.Popover>
                                    <ListBox className="rounded-xl p-2">
                                        <ListBox.Item id="Beach">🏖️ Beach</ListBox.Item>
                                        <ListBox.Item id="Mountain">⛰️ Mountain</ListBox.Item>
                                        <ListBox.Item id="City">🏙️ City</ListBox.Item>
                                        <ListBox.Item id="Adventure">🧗 Adventure</ListBox.Item>
                                        <ListBox.Item id="Cultural">🏛️ Cultural</ListBox.Item>
                                        <ListBox.Item id="Luxury">💎 Luxury</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        {/* Price */}
                        <TextField name="price" isRequired className="w-full">
                            <Label className="text-sm font-bold text-slate-700 mb-2 block uppercase tracking-wider">Price (USD)</Label>
                            <Input type="number" placeholder="1299" className="rounded-2xl border-slate-200" />
                            <FieldError />
                        </TextField>

                        {/* Duration */}
                        <TextField name="duration" isRequired className="w-full">
                            <Label className="text-sm font-bold text-slate-700 mb-2 block uppercase tracking-wider">Duration</Label>
                            <Input placeholder="7 Days / 6 Nights" className="rounded-2xl border-slate-200" />
                            <FieldError />
                        </TextField>

                        {/* Date */}
                        <TextField name="departureDate" isRequired className="w-full">
                            <Label className="text-sm font-bold text-slate-700 mb-2 block uppercase tracking-wider">Departure Date</Label>
                            <Input type="date" className="rounded-2xl h-12 bg-slate-50 border-slate-200" />
                            <FieldError />
                        </TextField>

                        {/* Image URL */}
                        <div className="md:col-span-2">
                            <TextField name="imageUrl" isRequired className="w-full">
                                <Label className="text-sm font-bold text-slate-700 mb-2 block uppercase tracking-wider">Image URL</Label>
                                <Input type="url" placeholder="https://unsplash.com/photo-..." className="rounded-2xl border-slate-200" />
                                <FieldError />
                            </TextField>
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <TextField name="description" isRequired className="w-full">
                                <Label className="text-sm font-bold text-slate-700 mb-2 block uppercase tracking-wider">Description</Label>
                                <TextArea 
                                    placeholder="Tell travelers about this amazing place..." 
                                    className="rounded-[2rem] min-h-[120px] p-4 bg-slate-50 border-slate-200" 
                                />
                                <FieldError />
                            </TextField>
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button 
                            type="submit" 
                            className="rounded-2xl w-full bg-slate-900 hover:bg-cyan-600 text-white font-black text-lg py-8 transition-all duration-300 shadow-xl shadow-slate-200"
                        >
                            PUBLISH DESTINATION
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default AddDestinationPage;