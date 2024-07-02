import {useTonWallet} from "@tonconnect/ui-react";
import {useEffect, useState} from "react";
import {fromNano, Address} from "ton-core";
import {useTonClient} from "./useTonClient";

export const useBalance = () => {
    const [balance, setBalance] = useState('0')
    const {client} = useTonClient();
    const wallet = useTonWallet();

    useEffect(() => {
        (async () => {
            if (!client) return false;
            if (!wallet) return false;
            const balance = await client.getBalance(Address.parse(wallet.account.address));
            setBalance(fromNano(balance));
        })();
    }, [client, wallet])

    return balance
}