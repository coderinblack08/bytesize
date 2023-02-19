import {
  Button,
  Center,
  Flex,
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

const itemVariant = { hidden: { opacity: 0 }, show: { opacity: 1 } };

const CustomCheckbox: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [checked, setChecked] = useState(false);
  return (
    <Button
      display="inline-flex"
      colorScheme={checked ? "blue" : "gray"}
      leftIcon={checked ? <CheckIcon /> : undefined}
      onClick={() => setChecked(!checked)}
    >
      {children}
    </Button>
  );
};

const Categories: NextPage = () => {
  const { data } = useSWR<string[]>(`${API_URL}/api/categories`, fetcher);

  return (
    <Center minH="100vh" py={16} px={5}>
      <VStack spacing={4} align="stretch" w="xl">
        <Heading size="xl" variants={itemVariant} as={motion.h1}>
          Choose your interests
        </Heading>
        <Wrap>
          {data?.map((category, index) => (
            <WrapItem key={index}>
              <CustomCheckbox>{category}</CustomCheckbox>
            </WrapItem>
          ))}
        </Wrap>
      </VStack>
    </Center>
  );
};

export default Categories;
