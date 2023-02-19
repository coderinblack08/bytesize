import {
  Box,
  Button,
  Center,
  Checkbox,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { pb } from "../lib/pb";

const itemVariant = { hidden: { opacity: 0 }, show: { opacity: 1 } };

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }: any) => {
    const authData = await pb
      .collection("users")
      .authWithPassword(email, password);
    console.log(authData);
  };

  return (
    <Center minH="100vh">
      <Box
        w="lg"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
        initial="hidden"
        animate="show"
        as={motion.div}
      >
        <Heading size="xl" variants={itemVariant} as={motion.h1}>
          Sign up
        </Heading>
        <VStack
          mt={4}
          alignItems="flex-start"
          spacing={4}
          onSubmit={handleSubmit(onSubmit)}
          as="form"
        >
          <Input
            placeholder="Email Address"
            variants={itemVariant}
            as={motion.input}
            // type="email"
            {...register("email", { required: true })}
          />
          <Input
            placeholder="Password"
            variants={itemVariant}
            as={motion.input}
            type="password"
            {...register("password", { minLength: 8, required: true })}
          />
          <Checkbox
            colorScheme="blue"
            defaultChecked
            variants={itemVariant}
            as={motion.label}
          >
            I agree to the receiving daily emails
          </Checkbox>
          <Button
            w="full"
            variants={itemVariant}
            as={motion.button}
            type="submit"
          >
            Get Access
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default Login;
