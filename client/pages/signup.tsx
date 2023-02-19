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

const itemVariant = { hidden: { opacity: 0 }, show: { opacity: 1 } };

const Signup: NextPage = () => {
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
        <VStack mt={4} alignItems="flex-start" spacing={4}>
          <Input
            placeholder="Email Address"
            variants={itemVariant}
            as={motion.input}
          />
          <Input
            placeholder="Password"
            variants={itemVariant}
            as={motion.input}
          />
          <Checkbox
            colorScheme="blue"
            defaultChecked
            variants={itemVariant}
            as={motion.label}
          >
            I agree to the receiving daily emails
          </Checkbox>
          <Button w="full" variants={itemVariant} as={motion.button}>
            Get Access
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default Signup;
