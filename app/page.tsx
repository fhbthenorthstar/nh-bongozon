import HowItWorks from "./components/HowItWorks";
import FaqSection from "./components/FaqSection";
import ProductViewContentTikTok from "./components/ProductViewContentTikTok";
import OrderWizardv3 from "./components/CODWizard";
import GuaranteeStrip from "./components/GuaranteeStrip";

export default function Tiktok() {
  return (
    <div>
      
      <ProductViewContentTikTok />
      <GuaranteeStrip/>
      <HowItWorks />
      <OrderWizardv3 channel="Landing Page" />
      <FaqSection />
    </div>
  );
}
