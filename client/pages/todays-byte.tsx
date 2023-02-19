import {
    Box,
    Button,
    Center,
    Heading,
    VStack,
    Wrap,
    WrapItem,
  } from "@chakra-ui/react";
  import { motion } from "framer-motion";
  import { NextPage } from "next";
  import useSWR from "swr";
  
  import { CheckIcon } from "@chakra-ui/icons";
  import { useState } from "react";
  import { API_URL } from "../lib/constants";
  import { fetcher } from "../lib/utils";
  import { useForm } from "react-hook-form";
  
  const itemVariant = { hidden: { opacity: 0 }, show: { opacity: 1 } };
  
  const CustomCheckbox: React.FC<React.PropsWithChildren> = ({ register, options, name, children, ...rest }) => {
    const [checked, setChecked] = useState(false);
    return (
      <Button
        display="inline-flex"
        variant="outline"
        colorScheme={checked ? "blue" : "gray"}
        leftIcon={checked ? <CheckIcon /> : undefined}
        onClick={() => setChecked(!checked)}
        rounded="full"
      >
        {children}
      </Button>
    );
  };
  
  const TodayBytes: NextPage = () => {
    const { register, handleSubmit } = useForm();
    const { data, isLoading } = useSWR<string[]>(`${API_URL}/api/categories`, fetcher);
  
    return (
      <Center minH="100vh" py={16} px={5}>
        {!isLoading && (
          <VStack
            spacing={4}
            align="stretch"
            w="xl"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            initial="hidden"
            animate="show"
            as={motion.div}
          >
            <Heading size="xl" variants={itemVariant} as={motion.h1}>
              Choose your interests.
            </Heading>
            <Wrap>
              {data?.map((category, index) => (
                <WrapItem key={index} variants={itemVariant} as={motion.div}>
                  <CustomCheckbox>{category}</CustomCheckbox>
                </WrapItem>
              ))}
            </Wrap>
            <Button
              variants={itemVariant}
              w="full"
              as={motion.button}
              type="submit"
              colorScheme="blue"
              mt={4}
            >
              Next
            </Button>
          </VStack>
        )}
      </Center>
     );
  };
  
  export default TodayBytes;
  