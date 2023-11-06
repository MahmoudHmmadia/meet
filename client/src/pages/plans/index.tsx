import Container from "../../components/Container";
import { plans } from "../../constant/plans";
import PricingPlan from "./components/PriceingPlan";

function Plans() {
  return (
    <div className="py-20 w-full h-full">
      <Container>
        <div
          className="grid gap-10 w-full"
          style={{
            gridTemplateColumns: "repeat(auto-fill , minmax(350px,1fr))",
          }}
        >
          <PricingPlan
            bg={plans.free.bg}
            color={plans.free.color}
            numberOfBytes={plans.free.numberOfBytes}
            numberOfCalls={plans.free.numberOfCalls}
            price={plans.free.price}
            title={plans.free.title}
            numberOfVideoCalls={plans.free.numberOfVideoCalls}
          />
          <PricingPlan
            bg={plans.pro.bg}
            color={plans.pro.color}
            numberOfBytes={plans.pro.numberOfBytes}
            numberOfCalls={plans.pro.numberOfCalls}
            price={plans.pro.price}
            title={plans.pro.title}
            numberOfVideoCalls={plans.pro.numberOfVideoCalls}
          />
          <PricingPlan
            bg={plans.premium.bg}
            color={plans.premium.color}
            numberOfBytes={plans.premium.numberOfBytes}
            numberOfCalls={plans.premium.numberOfCalls}
            price={plans.premium.price}
            title={plans.premium.title}
            numberOfVideoCalls={plans.premium.numberOfVideoCalls}
          />
        </div>
      </Container>
    </div>
  );
}

export default Plans;
