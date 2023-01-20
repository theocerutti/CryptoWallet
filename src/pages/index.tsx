"use client";

import React, {useState} from "react";
import {WALLETS_LOCAL_STORAGE_KEY} from "@/constants/wallet";
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {Alert, AlertIcon, Container, Divider, IconButton, InputRightElement, Text, Box} from "@chakra-ui/react";
import {Input, InputGroup} from "@chakra-ui/input";
import {CheckIcon, CloseIcon} from "@chakra-ui/icons";

export default function Home() {
  const [wallets, setWallets] = useLocalStorage<string[]>(WALLETS_LOCAL_STORAGE_KEY, []);
  const [currentInput, setCurrentInput] = useState<string>("");

  const handleChange = (event: any) => {
    setCurrentInput(event.target.value);
  };

  const addWallet = (value: any) => {
    setWallets([...wallets, value]);
    setCurrentInput("");
  };

  const removeWallet = (value: any) => {
    setWallets(wallets.filter(wallet => wallet !== value));
  };

  return (
    <Container width="50%">
      <Box marginBottom="16px">
        <Text fontSize="xl">Your wallets</Text>
        <Text fontSize="xs" as="em">Wallets are stored locally.</Text>
      </Box>
      {wallets && wallets.length > 0 ? wallets.map((wallet, index) => (
        <InputGroup marginTop="8px" key={index} size="sm">
          <Input defaultValue={wallet}/>
          <InputRightElement
            onClick={() => removeWallet(wallet)}
          >
            <IconButton size="xs" icon={<CloseIcon/>} aria-label="close"/>
          </InputRightElement>
        </InputGroup>
      )) : (
        <Alert h="2rem" status="warning">
          <AlertIcon/>You don't have any wallet!</Alert>
      )}
      <InputGroup marginTop="24px" size="sm">
        <Input value={currentInput} onChange={handleChange} placeholder="Create a new wallet..."/>
        <InputRightElement
          onClick={() => addWallet(currentInput)}
          onKeyDown={(event) => event.code === "Enter" ? addWallet(currentInput) : null}
        >
          <IconButton size="xs" icon={<CheckIcon/>} aria-label="check"/>
        </InputRightElement>
      </InputGroup>
      <Divider marginY="24px"/>
      <Text fontSize="xl">Details</Text>
    </Container>
  );
}