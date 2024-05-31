import React, { useEffect } from "react";
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
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

const updateOrder = async (updatedOrder) => {
  // Mimic API call to update an order
  return updatedOrder;
};

export const EditOrderModal = ({
  isOpen,
  onClose,
  order,
  readOnly,
  setShema,
  salesSch,
}) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, setValue } = useForm();

  const mutation = useMutation(updateOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries("orders");
      onClose();
      toast({
        title: "Order updated.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  console.log(salesSch);

  const updateSalesSchema = (salesSchema, ID, updatedValues) => {
    return salesSchema.map((sale) =>
      // console.log(sale.customer_id,customer_id)
      sale.customer_id == ID ? { ...sale, ...updatedValues } : sale
    );
  };

  useEffect(() => {
    if (order) {
      setValue("invoice_no", order.invoice_no);
      setValue("invoice_date", order.invoice_date);
      setValue("paid", order.paid);
    }
  }, [order, setValue]);

  // const onSubmit = (data) => {
  //   const updatedOrderData = {
  //     ...order,
  //     ...data,
  //   };
  //   mutation.mutate(updatedOrderData);
  // };

  const onSubmit = (data) => {
    const updatedValues = {
      ...order,
      ...data,
    };

    console.log(data, updatedValues);
    const updatedSalesSchema = updateSalesSchema(
      salesSch,
      order?.id,
      updatedValues
    );
    setShema(updatedSalesSchema);
    mutation.mutate(updatedSalesSchema);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Sale Order</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Invoice No</FormLabel>
            <Input
              {...register("invoice_no", { required: true })}
              isReadOnly={readOnly}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Invoice Date</FormLabel>
            <Input
              type="date"
              {...register("invoice_date", { required: true })}
              isReadOnly={readOnly}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Paid</FormLabel>
            <Checkbox {...register("paid")} isReadOnly={readOnly} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          {!readOnly && (
            <Button colorScheme="blue" mr={3} onClick={handleSubmit(onSubmit)}>
              Save
            </Button>
          )}
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
