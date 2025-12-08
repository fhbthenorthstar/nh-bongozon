import DosageSection from "./components/DosageSection";
import HowItWorks from "./components/HowItWorks";
import FaqSection from "./components/FaqSection";
import ViolentFeatures from "./components/ViolentFeatures";
import ProductViewContentTikTok from "./components/ProductViewContentTikTok";
import StickyNightTicker from "./components/StickyNightTicker";
import OrderWizardv3 from "./components/CODWizard";
import Link from "next/link";
import GuaranteeStrip from "./components/GuaranteeStrip";

export default function Tiktok() {
  return (
    <div>
      <ProductViewContentTikTok />
      <StickyNightTicker />
      <GuaranteeStrip/>
     
      <ViolentFeatures
        src="/Review-2.png"
        alt="Night Horse Review-4.png"
        priority
      />
      <div className="flex justify-center px-4 bg-[#111214] py-6">
        <Link
          href="/#order-wizard"
          className="text-black inline-flex w-full max-w-[720px] items-center justify-center rounded-xl px-8 sm:px-12 py-4 text-[18px] sm:text-[22px] font-semibold bg-gradient-to-b from-[#8AE233] to-[#66C214] transition-colors"
        >
          আমিও অর্ডার করতে চাই
        </Link>
      </div>

      {/* <BenefitsHighlight/> */}
      <ViolentFeatures
        src="/Review-3.png"
        alt="Night Horse Review-4.png"
        priority
      />
      <div className=" flex justify-center px-4 bg-[#111214] py-6">
        <Link
          href="/#order-wizard"
          className="text-black inline-flex w-full max-w-[720px] items-center justify-center rounded-xl px-8 sm:px-12 py-4 text-[18px] sm:text-[22px] font-semibold bg-gradient-to-b from-[#8AE233] to-[#66C214] transition-colors"
        >
          আমিও অর্ডার করতে চাই
        </Link>
      </div>
      <ViolentFeatures
        src="/static-ads/5.webp"
        alt="Night Horse Review-4.png"
        priority
      />
      <HowItWorks />
      <ViolentFeatures
        src="/static-ads/8.webp"
        alt="Night Horse Review-4.png"
        priority
      />
      <ViolentFeatures
        src="/Review-4.png"
        alt="Night Horse Review-4.png"
        priority
      />
      <div className=" flex justify-center px-4 bg-[#111214] py-6">
        <Link
          href="/#order-wizard"
          className="text-black inline-flex w-full max-w-[720px] items-center justify-center rounded-xl px-8 sm:px-12 py-4 text-[18px] sm:text-[22px] font-semibold bg-gradient-to-b from-[#8AE233] to-[#66C214] transition-colors"
        >
          আমিও অর্ডার করতে চাই
        </Link>
      </div>
      <DosageSection />
      <ViolentFeatures
        src="/Review-1.webp"
        alt="Night Horse Review-4.png"
        priority
      />
      <ViolentFeatures
        src="/static-ads/4.webp"
        alt="Night Horse Review-4.png"
        priority
      />
      <OrderWizardv3 channel="Landing Page" />
      <ViolentFeatures
        src="/static-ads/7.webp"
        alt="Night Horse Review-4.png"
        priority
      />
      <FaqSection />
    </div>
  );
}
