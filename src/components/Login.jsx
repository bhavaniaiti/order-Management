import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input } from "@chakra-ui/react";

export const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Mimic authentication
    localStorage.setItem("authenticated", true);
    navigate("/home");
  };

  useEffect(() => {
    localStorage.setItem("authenticated", false);
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      style={{ minWidth: "100%" }}
    >
      <Box p={6} rounded="md" shadow="md">
        <Input placeholder="Username" mb={3} />
        <Input placeholder="Password" type="password" mb={3} />
        <Button onClick={handleLogin}>Login</Button>
      </Box>
    </Box>
  );
};
