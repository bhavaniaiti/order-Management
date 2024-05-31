import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorMode,
  IconButton,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { AddOrderModal } from "../AddOrderModal";
import { EditOrderModal } from "../EditOrderModal";
import { useNavigate } from "react-router-dom";

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

const salesSchema = [
  {
    customer_id: 11908,
    items: [
      {
        sku_id: 220,
        price: 12,
        quantity: 12,
      },
    ],
    paid: false,
    invoice_no: "Invoice - 1212121",
    invoice_date: "2024-05-07",
  },
];

export const SalesOrders = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editOrder, setEditOrder] = useState(null);
  const [salesSch, setShema] = useState(salesSchema);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (localStorage.getItem("authenticated") === "false") {
      toast({
        title: "User not Authenticated",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      navigate("/");
    }
  }, []);

  const fetchOrders = async () => {
    // Mimic fetching orders using the provided schemas
    return salesSch.map((sale) => {
      const customer = customerSchema.find(
        (c) => c.customer_profile.id === sale.customer_id
      );
      return {
        id: sale.customer_id,
        customer: customer ? customer.customer_profile.name : "Unknown",
        status: sale.paid ? "completed" : "active",
        invoice_no: sale.invoice_no,
        invoice_date: sale.invoice_date, // Include invoice_date in the response
        price: sale?.items?.reduce(
          (total, item) =>
            total +
            item.price *
              (productSchema[0].sku.find((sku) => sku.id === item.sku_id)
                ?.amount || 0),
          0
        ),
        last_modified: new Date().toISOString().split("T")[0],
      };
    });
  };

  const { data: orders, refetch } = useQuery("orders", fetchOrders);

  const handleAddOrder = (newOrder) => {
    const updatedOrders = [...salesSchema, newOrder];
    setShema(updatedOrders);
    queryClient.invalidateQueries("orders");
  };

  useEffect(() => {
    setTimeout(() => {
      refetch();
    }, 500);
  }, [salesSch]);

  return (
    <Box p={4} minH="100vh">
      <AddOrderModal
        isOpen={isOpen}
        onClose={onClose}
        refetchOrders={refetch}
        onAddSales={handleAddOrder} // Pass the handleAddOrder function
      />

      {editOrder && (
        <EditOrderModal
          isOpen={true}
          order={editOrder}
          onClose={() => setEditOrder(null)}
          readOnly={editOrder.status === "completed"}
          setShema={setShema}
          salesSch={salesSch}
        />
      )}

      <IconButton
        aria-label="Toggle dark mode"
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        mb={4}
      />
      <Button onClick={onOpen} colorScheme="blue" mb={4} ml={80}>
        + Sale Order
      </Button>
      <Tabs isFitted>
        <TabList>
          <Tab>Active Sale Orders</Tab>
          <Tab>Completed Sale Orders</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Customer Name</Th>
                  <Th>Price</Th>
                  <Th>Last Modified</Th>
                  <Th>Edit</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders &&
                  orders
                    .filter((order) => order.status === "active")
                    .map((order) => (
                      <Tr key={order.id}>
                        <Td>{order.id}</Td>
                        <Td>{order.customer}</Td>
                        <Td>{order.price}</Td>
                        <Td>{order.last_modified}</Td>
                        <Td>
                          <IconButton
                            aria-label="Edit order"
                            icon={<Box as="span">...</Box>}
                            onClick={() => setEditOrder(order)}
                          />
                        </Td>
                      </Tr>
                    ))}
              </Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Customer Name</Th>
                  <Th>Price</Th>
                  <Th>Last Modified</Th>
                  <Th>Edit</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders &&
                  orders
                    .filter((order) => order.status === "completed")
                    .map((order) => (
                      <Tr key={order.id}>
                        <Td>{order.id}</Td>
                        <Td>{order.customer}</Td>
                        <Td>{order.price}</Td>
                        <Td>{order.last_modified}</Td>
                        <Td>
                          <IconButton
                            aria-label="View order"
                            icon={<Box as="span">...</Box>}
                            onClick={() => setEditOrder(order)}
                          />
                        </Td>
                      </Tr>
                    ))}
              </Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
