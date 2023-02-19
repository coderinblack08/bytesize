import {
  Button,
  Container,
  Heading,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { pb, useUserStore } from "../lib/pb";

const Bytes: NextPage = () => {
  const router = useRouter();

  return (
    <Container p={8}>
      <Button
        size="sm"
        mb={8}
        onClick={() => {
          pb.authStore.clear();
          useUserStore.getState().set(null);
          router.push("/");
        }}
      >
        Logout
      </Button>
      <Heading size="xl">Archive</Heading>
      <Text color="dimgray">No past archived bytes found</Text>
    </Container>
  );
};

export default Bytes;
