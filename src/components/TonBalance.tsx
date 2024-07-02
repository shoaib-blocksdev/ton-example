import {Card, Ellipsis, FlexBoxCol, FlexBoxRow,} from "./styled/styled";
import {useBalance} from "../hooks/useBalance";

export function TonBalance() {
  const balance = useBalance()
  return (
    <div className="Container">
      <Card>
        <FlexBoxCol>
          <h3>Ton Balance</h3>
          <FlexBoxRow>
            <Ellipsis>{balance} TON</Ellipsis>
          </FlexBoxRow>
        </FlexBoxCol>
      </Card>
    </div>
  );
}
