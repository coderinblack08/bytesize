import {
  Button,
  Center,
  Heading,
  useToast,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { NextPage } from "next";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { CheckIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { API_URL } from "../lib/constants";
import { fetcher } from "../lib/utils";
import { pb, useUserStore } from "../lib/pb";
import { useRouter } from "next/router";

const itemVariant = { hidden: { opacity: 0 }, show: { opacity: 1 } };

const CustomCheckbox: React.FC<
  React.PropsWithChildren<{
    toggleCategory: () => void;
    hasCategory: boolean;
  }>
> = ({ toggleCategory, hasCategory, children }) => {
  const [checked, setChecked] = useState(false);
  return (
    <Button
      display="inline-flex"
      variant="outline"
      colorScheme={hasCategory ? "blue" : "gray"}
      leftIcon={hasCategory ? <CheckIcon /> : undefined}
      onClick={toggleCategory}
      rounded="full"
    >
      {children}
    </Button>
  );
};

async function updateCategories(_: any, { arg: { categories } }: any) {
  await pb.collection("users").update(pb.authStore.model!.id, {
    categories: JSON.stringify(categories),
  });
}

const Categories: NextPage = () => {
  const toast = useToast();
  const user = useUserStore((state) => state.user);
  const { trigger, isMutating } = useSWRMutation(
    "/categories/update",
    updateCategories
  );
  const [categories, setCategories] = useState<string[]>([]);
  const { data, isLoading } = useSWR<string[]>(
    `${API_URL}/api/categories`,
    fetcher
  );

  useEffect(() => {
    if (user) {
      setCategories(user.categories);
    }
  }, [user]);

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
                <CustomCheckbox
                  hasCategory={categories.includes(category)}
                  toggleCategory={() => {
                    if (categories.includes(category)) {
                      setCategories(categories.filter((c) => c !== category));
                    } else {
                      setCategories([...categories, category]);
                    }
                  }}
                >
                  {category}
                </CustomCheckbox>
              </WrapItem>
            ))}
          </Wrap>
          <Button
            variants={itemVariant}
            w="full"
            as={motion.button}
            type="submit"
            colorScheme="blue"
            onClick={async () => {
              if (categories.length === 0) {
                toast({
                  title: "Please select at least one category.",
                  status: "error",
                  duration: 5000,
                });
              }
              await trigger({ categories });
            }}
            isLoading={isMutating}
            mt={4}
          >
            Next
          </Button>
        </VStack>
      )}
    </Center>
  );
};

export default Categories;
