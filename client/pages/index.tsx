import { Link, Box, Button, Center, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import NextLink from "next/link";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUserStore } from "../lib/pb";

const itemVariant = { hidden: { opacity: 0 }, show: { opacity: 1 } };

const Home: NextPage = () => {
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push(`/my-bytes`);
    }
  }, [user]);

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
        <Heading
          size="xl"
          variants={itemVariant}
          as={motion.h1}
          layoutId="heading"
        >
          Read ByteSized.
        </Heading>
        <Text
          mt={2}
          color="dimgray"
          display="block"
          variants={itemVariant}
          as={motion.text}
        >
          Your Personalized Daily "Wrapped" For News
        </Text>
        <Link href="/signup">
          <Button
            w="full"
            mt={4}
            layoutId="cta"
            variants={itemVariant}
            as={motion.button}
          >
            Get your daily byte
          </Button>
        </Link>
        <NextLink href="/login">
          <Link as={motion.div} variants={itemVariant} color="blue.200" mt={4}>
            Already have an account?
          </Link>
        </NextLink>
      </Box>
    </Center>
  );
};

export default Home;
