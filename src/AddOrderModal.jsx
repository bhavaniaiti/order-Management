import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

const customerSchema = [
  {
    id: 9,
    customer: 11908,
    customer_profile: {
      id: 11908,
      name: "Ram",
      color: [182, 73, 99],
      email: "jesus_christ@church.com",
      pincode: "Mumbai",
      location_name: "Mumbai, Maharashtra, India",
      type: "C",
      profile_pic: null,
      gst: "",
    },
  },
];

const productSchema = [
  {
    id: 209,
    display_id: 8,
    owner: 1079,
    name: "New Product",
    category: "The god of War",
    characteristics: "New Product Characteristics",
    features: "",
    brand: "New Product Brand",
    sku: [
      {
        id: 248,
        selling_price: 54,
        max_retail_price: 44,
        amount: 33,
        unit: "kg",
        quantity_in_inventory: 0,
        product: 209,
      },
      {
        id: 247,
        selling_price: 32,
        max_retail_price: 32,
        amount: 33,
        unit: "kg",
        quantity_in_inventory: 0,
        product: 209,
      },
      {
        id: 246,
        selling_price: 23,
        max_retail_price: 21,
        amount: 22,
        unit: "kg",
        quantity_in_inventory: 1,
        product: 209,
      },
    ],
    updated_on: "2024-05-24T12:46:41.995873Z",
    adding_date: "2024-05-24T12:46:41.995828Z",
  },
];

const createOrder = async (newOrder) => {
  // Mimic API call to create an order
  return newOrder;
};

export const AddOrderModal = ({
  isOpen,
  onClose,
  refetchOrders,
  onAddSales,
}) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();
  const [selectedItem, setSelectedItem] = useState(null);
  const mutation = useMutation(createOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries("orders");
      refetchOrders();
      onClose();
      reset();
      toast({
        title: "Order created.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  //onAddSales(data)

  const onSubmit = (data) => {
    const orderData = {
      ...data,
      customer_id: Number(data?.customer_id),
      items: [selectedItem], // Include selected item in items array
    };
    mutation.mutate(orderData);
    onAddSales(orderData);
  };

  const getItemDetails = (id) => {
    const product = productSchema.find((item) => item.id === id);
    if (product) {
      const sku = product.sku.find((i) => i.quantity_in_inventory > 0);
      if (sku) {
        return {
          sku_id: sku.id,
          price: sku.selling_price,
          quantity: sku.quantity_in_inventory,
        };
      }
    }
    return null;
  };

  const handleItemSelect = (itemId) => {
    const itemDetails = getItemDetails(Number(itemId));
    console.log(itemDetails);
    setSelectedItem(itemDetails);
  };

  console.log(selectedItem);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Sale Order</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Customer</FormLabel>
            <Select {...register("customer_id", { required: true })}>
              <option value="">Select customer</option>
              {customerSchema.map((customer) => (
                <option
                  key={customer.customer_profile.id}
                  value={customer.customer_profile.id}
                >
                  {customer.customer_profile.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Select Product</FormLabel>
            <Select
              {...register("item_id", { required: true })}
              onChange={(e) => handleItemSelect(e.target.value)}
            >
              <option value="">Select item</option>
              {productSchema.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </Select>
          </FormControl>
          {selectedItem && (
            <>
              <FormControl mt={4}>
                <FormLabel>Price</FormLabel>
                <Input value={selectedItem?.price} isReadOnly />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Quantity</FormLabel>
                <Input value={selectedItem?.quantity} isReadOnly />
              </FormControl>
            </>
          )}
          <FormControl mt={4}>
            <FormLabel>Invoice No</FormLabel>
            <Input {...register("invoice_no", { required: true })} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Invoice Date</FormLabel>
            <Input
              type="date"
              {...register("invoice_date", { required: true })}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Paid</FormLabel>
            <Checkbox {...register("paid")} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
