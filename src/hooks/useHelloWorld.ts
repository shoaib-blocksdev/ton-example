import {useTonClient} from "./useTonClient";
import {useAsyncInitialize} from "./useAsyncInitialize";
import {Address, OpenedContract} from "ton-core";
import {useQuery} from "@tanstack/react-query";
import {FirstContract} from "../contracts/FirstContract";
import { useState } from "react";

export function useHelloWorld() {
  const [fetchCount, setFetchCount] = useState(0);
  const { client } = useTonClient();

  const helloWorldContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new FirstContract(
      Address.parse("EQCXNLCB69GbI_Iop1V-jFxO2x--afGA2PoY5cjaIigi9vkU")
    );
    return client.open(contract) as OpenedContract<FirstContract>;
  }, [client]);

  const { data, isFetching } = useQuery(
    ["counter"],
    async () => {
      if (fetchCount >= 2) return null;
      if (!helloWorldContract) return null;
      setFetchCount(prev => prev + 1);
      return (await helloWorldContract!.getGreeting()).toString();
    },
    { refetchInterval: 3000, enabled: fetchCount < 2  },
  );

  return {
    value: data,
    address: helloWorldContract?.address.toString()
  };
}
