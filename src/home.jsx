// /* eslint-disable no-unused-vars */

// import React, { useState, useEffect } from "react";
// import { Table, Row, Button, Tooltip, Input } from "antd";
// import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
// // import AddEditRole from "./addEditRole";
// import Styles from "./generalStyles.module.scss";
// import moment from "moment";

// const Home = () => {
//   const [modalData, setModalData] = useState({});

//   const customerSchema = [
//     {
//       id: 9,
//       customer: 11908,
//       customer_profile: {
//         id: 11908,
//         name: "Ram",
//         color: [182, 73, 99],
//         email: "jesus_christ@church.com",
//         pincode: "Mumbai",
//         location_name: "Mumbai, Maharashtra, India",
//         type: "C",
//         profile_pic: null,
//         gst: "",
//       },
//     },
//   ];

//   const productSchema = [
//     {
//       id: 209,
//       display_id: 8,
//       owner: 1079,
//       name: "New Product",
//       category: "The god of War",
//       characteristics: "New Product Characteristics",
//       features: "",
//       brand: "New Product Brand",
//       sku: [
//         {
//           id: 248,
//           selling_price: 54,
//           max_retail_price: 44,
//           amount: 33,
//           unit: "kg",
//           quantity_in_inventory: 0,
//           product: 209,
//         },
//         {
//           id: 247,
//           selling_price: 32,
//           max_retail_price: 32,
//           amount: 33,
//           unit: "kg",
//           quantity_in_inventory: 0,
//           product: 209,
//         },
//         {
//           id: 246,
//           selling_price: 23,
//           max_retail_price: 21,
//           amount: 22,
//           unit: "kg",
//           quantity_in_inventory: 1,
//           product: 209,
//         },
//       ],
//       updated_on: "2024-05-24T12:46:41.995873Z",
//       adding_date: "2024-05-24T12:46:41.995828Z",
//     },
//   ];
//   const columns = [
//     {
//       title: "ID",
//       dataIndex: "id",
//     },
//     {
//       title: "Customer Name",
//       dataIndex: "name",
//     },
//     {
//       title: "Price",
//       dataIndex: "Price",
//     },
//     {
//       title: "Last Modified",
//       dataIndex: "updated_on",
//       render: (text) => {
//         return moment(text).format("DD/MM/YYYY");
//       },
//     },
//     {
//       title: "Edit / View",
//       align: "left",
//       render: (record) => {
//         return <Tooltip title="Edit">...</Tooltip>;
//       },
//     },
//   ];

//   return (
//     <div style={{ margin: "0% 2%" }} className={Styles.pageConatiner}>
//       <AddEditRole modalData={modalData} setModalData={setModalData} />
//       <Row style={{ marginTop: "1.7%" }} justify={"space-between"}>
//         <Input
//           style={{ width: "30%", borderRadius: "8px" }}
//           placeholder="Search..."
//           prefix={<SearchOutlined />}
//         />
//         <Button
//           type="primary"
//           style={{
//             backgroundColor: "#5B76F0",
//             borderRadius: "10px",
//             height: 33,
//           }}
//           icon={<PlusOutlined />}
//           onClick={() => {
//             setModalData({
//               open: true,
//               type: "Add",
//               data: null,
//             });
//           }}
//         >
//           Add Roles
//         </Button>
//       </Row>
//       <Table
//         style={{ marginTop: "2%" }}
//         columns={columns}
//         dataSource={customerSchema}
//       />
//     </div>
//   );
// };

// export default Home;
