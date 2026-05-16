"use client";

import React, { useState } from "react";
import { Envelope } from "@gravity-ui/icons";
import { HiOutlinePencilAlt } from "react-icons/hi"; // Added missing import
import { 
  Button, 
  FieldError, 
  Input, 
  Label, 
  Select, 
  ListBox, 
  Modal, 
  Surface, 
  TextArea, 
  TextField 
} from "@heroui/react";
import { useRouter } from "next/navigation";


export function EditModal({ destination }) {

const router = useRouter()

     const { 
        _id,
    imageUrl, 
    price, 
    destinationName, 
    duration, 
    country, 
    rating, 
    description,
  } = destination;
    const onSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const updatedDestination = Object.fromEntries(formData.entries());

  try {
    const res = await fetch(
      `/destination/${_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDestination),
      }
    );

    const data = await res.json();

    console.log(data);

    // Refresh server component data
    router.refresh();
              router.push('/destinations')
  } catch (error) {
    console.log(error);
  }
};
      

  
  return (
    <Modal>
      {/* The trigger button must be inside the Modal component to work automatically */}
      <Button 
        variant="ghost" 
        className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50"
      >
        <HiOutlinePencilAlt className="text-gray-600" /> Edit
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
             
              <Modal.Heading>Edit Destination</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Update the destination details below. Changes will be saved immediately.
              </p>
            </Modal.Header>

            <Modal.Body className="p-0"> {/* Reduced padding to prevent double-spacing */}
              <Surface variant="default">
                <form
                  onSubmit={onSubmit}
                  className="p-6 space-y-6 w-full"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Destination Name */}
                    <div className="md:col-span-2">
                      <TextField defaultValue={destinationName} name="destinationName" isRequired className="w-full">
                        <Label>Destination Name</Label>
                        <Input  placeholder="Bali Paradise" className="rounded-2xl" />
                        <FieldError />
                      </TextField>
                    </div>

                    {/* Country */}
                    <TextField defaultValue={country} name="country" isRequired className="w-full">
                      <Label>Country</Label>
                      <Input placeholder="Indonesia" className="rounded-2xl" />
                      <FieldError />
                    </TextField>

                    {/* Category */}
                    <div>
                      <Select
                      defaultValue={destination.category}
                        name="category"
                        isRequired
                        className="w-full"
                        placeholder="Select category"
                      >
                        <Label>Category</Label>
                        <Select.Trigger className="rounded-2xl">
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            <ListBox.Item id="Beach">Beach</ListBox.Item>
                            <ListBox.Item id="Mountain">Mountain</ListBox.Item>
                            <ListBox.Item id="City">City</ListBox.Item>
                            <ListBox.Item id="Adventure">Adventure</ListBox.Item>
                            <ListBox.Item id="Cultural">Cultural</ListBox.Item>
                            <ListBox.Item id="Luxury">Luxury</ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>

                    {/* Price */}
                    <TextField defaultValue={price} name="price" type="number" isRequired className="w-full">
                      <Label>Price (USD)</Label>
                      <Input type="number" placeholder="1299" className="rounded-2xl" />
                      <FieldError />
                    </TextField>

                    {/* Duration */}
                    <TextField defaultValue={duration} name="duration" isRequired className="w-full">
                      <Label>Duration</Label>
                      <Input placeholder="7 Days / 6 Nights" className="rounded-2xl" />
                      <FieldError />
                    </TextField>

                    {/* Departure Date */}
                    <div className="md:col-span-2">
                      <TextField defaultValue={destination.departureDate} name="departureDate" type="date" isRequired className="w-full">
                        <Label>Departure Date</Label>
                        <Input type="date" className="rounded-2xl" />
                        <FieldError />
                      </TextField>
                    </div>

                    {/* Image URL */}
                    <div className="md:col-span-2">
                      <TextField defaultValue={imageUrl} name="imageUrl" isRequired className="w-full">
                        <Label>Image URL</Label>
                        <Input
                          type="url"
                          placeholder="https://example.com/image.jpg"
                          className="rounded-2xl"
                        />
                        <FieldError />
                      </TextField>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                      <TextField name="description" isRequired className="w-full">
                        <Label>Description</Label>
                        <TextArea
                          placeholder="Describe the experience..."
                          className="rounded-3xl"
                        />
                        <FieldError />
                      </TextField>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                  
              <Button type="submit" slot="close" variant="secondary">
                Save
              </Button>
                  </div>
                </form>
              </Surface>
            </Modal.Body>
            
            <Modal.Footer>
              
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}