import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Button, VStack, HStack, useColorModeValue } from "@chakra-ui/react";

const Index = () => {
  const [time, setTime] = useState(1500); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval);
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleStart = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(1500);
  };

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} minH="100vh" py={10} px={6}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center">
          Pomodoro Timer
        </Heading>
        <Text fontSize="6xl" fontWeight="bold">
          {formatTime(time)}
        </Text>
        <HStack spacing={4}>
          <Button colorScheme="blue" size="lg" onClick={handleStart} width={40}>
            {isRunning ? "Pause" : "Start"}
          </Button>
          <Button colorScheme="gray" size="lg" onClick={handleReset} width={40}>
            Reset
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Index;
