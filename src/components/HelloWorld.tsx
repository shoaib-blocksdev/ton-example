import {TonConnectButton} from "@tonconnect/ui-react";
import {useHelloWorld} from "../hooks/useHelloWorld";

import {Card, Ellipsis, FlexBoxCol, FlexBoxRow,} from "./styled/styled";

export function HelloWorld() {
  const { value, address } = useHelloWorld();

  return (
    <div className="Container">
      <TonConnectButton />

      <Card>
        <FlexBoxCol>
          <h3>Hello World from contract</h3>
          <FlexBoxRow>
            <b>Address</b>
            <Ellipsis>{address}</Ellipsis>
          </FlexBoxRow>
          <FlexBoxRow>
            <b>Value</b>
            <div>{value ?? "Loading..."}</div>
          </FlexBoxRow>
        </FlexBoxCol>
      </Card>
    </div>
  );
}
