import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { NextPage } from "next";
import Link from "next/link";
import { useUserStore } from "../lib/pb";
import { getDate } from "../lib/utils";

const itemVariant = { hidden: { opacity: 0 }, show: { opacity: 1 } };

const Home: NextPage = () => {
  const user = useUserStore((state) => state.user);

  return (
    <Center minH="100vh">
      {user && (
        <Button
          position="fixed"
          top={0}
          w="100vw"
          rounded="none"
          colorScheme="blue"
          rightIcon={<ChevronRightIcon boxSize={6} />}
          size="sm"
          fontWeight="bold"
          href={`/byte/${getDate()}`}
          as={Link}
        >
          Read Today's Byte
        </Button>
      )}
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
      </Box>
    </Center>
  );
};

export default Home;
