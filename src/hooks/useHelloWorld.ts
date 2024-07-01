import {useTonClient} from "./useTonClient";
import {useAsyncInitialize} from "./useAsyncInitialize";
import {Address, OpenedContract} from "ton-core";
import {useQuery} from "@tanstack/react-query";
import {FirstContract} from "../contracts/FirstContract";

export function useHelloWorld() {
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
      if (!helloWorldContract) return null;
      return (await helloWorldContract!.getGreeting()).toString();
    },
    { refetchInterval: 3000 }
  );

  return {
    value: isFetching ? null : data,
    address: helloWorldContract?.address.toString()
  };
}
