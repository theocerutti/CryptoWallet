import {WEI_1} from "@/constants/ethereum";

export const weiToETH = (wei: string) => {
  return Number(wei) / WEI_1;
}