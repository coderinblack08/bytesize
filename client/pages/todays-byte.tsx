import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  HStack,
  IconButton,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { NextPage } from "next";
import router, { useRouter } from "next/router";
import useSWR from "swr";

import { CheckIcon } from "@chakra-ui/icons";
import { useEffect, useMemo, useState } from "react";
import { pb, useUserStore } from "../lib/pb";

const itemVariant = { hidden: { opacity: 0 }, show: { opacity: 1 } };

const CustomCheckbox: React.FC<React.PropsWithChildren> = ({ children }) => {
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

let startOfToday = new Date();
startOfToday.setHours(0, 0, 0, 0);

const TodayBytes: NextPage = () => {
  const [playing, setPlaying] = useState(false);
  const user = useUserStore((state) => state.user);
  const { data, isLoading } = useSWR<any[]>("/articles/list", () =>
    pb.collection("articles").getFullList(200, {
      // filter: `created >= "${startOfToday.toISOString()}"`,
    })
  );
  useEffect(() => {
    window.speechSynthesis.cancel();
  }, []);
  const utterThis = useMemo(() => {
    if (typeof window === "undefined") return null;

    const transcript =
      "Welcome to today's byte, personalized for you. Up first, " +
      data
        ?.map((article) => {
          return `In ${article.category} today, ${article.title} as reported by ${article.publisher}. ${article.content}`;
        })
        .join("\n");

    return new SpeechSynthesisUtterance(transcript);
  }, [data]);

  return (
    <Center minH="100vh" w="100vw" p={5}>
      {/* <div className="gradient"></div> */}
      <Box>
        <HStack mt={5} mb={10} spacing={8}>
          <Heading size="2xl" letterSpacing="tight">
            Today's Bytes
          </Heading>
          <IconButton
            onClick={() => {
              const synth = window.speechSynthesis;
              if (playing) {
                synth.pause();
              } else {
                if (synth.paused) {
                  synth.resume();
                } else {
                  synth.speak(utterThis!);
                }
              }
              setPlaying(!playing);
            }}
            aria-label="play"
            colorScheme="blue"
            rounded="full"
            size="xl"
            p={1.5}
            icon={
              !playing ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 96 960 960"
                  height="40px"
                  width="40px"
                >
                  <path d="M320 853V293l440 280-440 280Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 96 960 960"
                  height="40px"
                  width="40px"
                >
                  <path d="M565 856V296h155v560H565Zm-325 0V296h155v560H240Z" />
                </svg>
              )
            }
          />
          <Button
            mb={8}
            size="lg"
            onClick={() => {
              pb.authStore.clear();
              useUserStore.getState().set(null);
              router.push("/");
            }}
          >
            Sign out
          </Button>
        </HStack>
        {!isLoading && (
          <SimpleGrid
            columns={3}
            spacing={4}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
            initial="hidden"
            animate="show"
            as={motion.div}
          >
            {data?.map((article: any, index: number) => {
              console.log(user);

              if (user.categories.includes(article.category)) {
                return (
                  <Box
                    key={index}
                    variants={itemVariant}
                    as={motion.div}
                    bg="rgba(0, 0, 0, 80%)"
                    rounded="xl"
                    overflow="hidden"
                    shadow="lg"
                  >
                    <Box userSelect="none" position="relative">
                      {article.image && (
                        <Image
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                          src={article.image}
                        />
                      )}
                      <Box p={5}>
                        <Heading mb={4} size="lg" letterSpacing="tight">
                          {article.title}
                        </Heading>
                        <Text fontWeight="bold">By {article.publisher}</Text>
                        <Divider my={4} />
                        <Text lineHeight="tall" color="whiteAlpha.700">
                          {article.content}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                );
              }
            })}
          </SimpleGrid>
        )}
      </Box>
    </Center>
  );
};

export default TodayBytes;
