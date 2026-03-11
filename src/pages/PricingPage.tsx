import { CustomerInfoSection } from "../components/CustomerInfoSection"
import { OrderSummary } from "../components/OrderSummary";
import { StickerDetailsSection } from "../components/StickerDetailsSection";
import { useAppState } from "../hooks/useAppState";
import { useCalculations } from "../hooks/useCalculations";
import { handleOrderSubmit } from "../utils/orderHandler";
import { validateForm } from "../utils/validation";

const PricingPage = () => {
const state = useAppState();

    useCalculations(
    state.length, state.width, state.quantity, state.gaping, state.rollWidth,
    state.shape, state.cornerType, state.printType, state.designCount, state.material,
    state.hasLamination, state.hasEmbossing, state.embossingColor,
    state.hasSilkScreen, state.hasSpotUV, state.assembly,
    state.customerName, state.customerNumber, state.salesRep, state.salesRepPhone,
    (data) => {
      state.setSubtotal(data.subtotal);
      state.setTax(data.tax);
      state.setTotal(data.total);
      state.setUnitPrice(data.unitPrice);
      state.setMatCost(data.MatCost);
    },
    (data) => {
      state.setRequiredLengthMeters(data.requiredLengthMeters);
      state.setStickersPerMeter(data.stickersPerMeter);
      state.setRequiredAreaM2(data.requiredAreaM2);
      state.setStickersAcrossWidth(data.stickersAcrossWidth);
    },
    (isValid) => state.setIsFormValid(isValid),
    () => validateForm(state.customerName, state.customerNumber, state.salesRep, state.salesRepPhone, state.length, state.width, state.quantity)
    );
    const handleSubmit = () => {
    handleOrderSubmit(
      state.customerName, state.customerNumber, state.salesRep, state.salesRepPhone,
      state.length, state.width, state.quantity, state.shape, state.cornerType,
      state.printType, state.designCount, state.material, state.hasLamination,
      state.hasEmbossing, state.embossingColor, state.hasSilkScreen, state.hasSpotUV,
      state.assembly, state.rollDirection, state.rollWidth, state.gaping, state.date,
      state.subtotal, state.tax, state.total, state.unitPrice,
      state.requiredLengthMeters, state.stickersPerMeter, state.requiredAreaM2, state.stickersAcrossWidth
    );
  };
  return (
      <>
      <div className="mb-4">
          <CustomerInfoSection
            date={state.date}
            customerName={state.customerName}
            setCustomerName={state.setCustomerName}
            customerNumber={state.customerNumber}
            setCustomerNumber={state.setCustomerNumber}
            salesRep={state.salesRep}
            setSalesRep={state.setSalesRep}
            salesRepPhone={state.salesRepPhone}
            setSalesRepPhone={state.setSalesRepPhone}
          />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <StickerDetailsSection
              length={state.length}
              setLength={state.setLength}
              width={state.width}
              setWidth={state.setWidth}
              quantity={state.quantity}
              setQuantity={state.setQuantity}
              shape={state.shape}
              setShape={state.setShape}
              cornerType={state.cornerType}
              setCornerType={state.setCornerType}
              printType={state.printType}
              setPrintType={state.setPrintType}
              designCount={state.designCount}
              setDesignCount={state.setDesignCount}
              material={state.material}
              setMaterial={state.setMaterial}
              hasLamination={state.hasLamination}
              setHasLamination={state.setHasLamination}
              hasEmbossing={state.hasEmbossing}
              setHasEmbossing={state.setHasEmbossing}
              embossingColor={state.embossingColor}
              setEmbossingColor={state.setEmbossingColor}
              laminationType={state.laminationType}
              setLaminationType={state.setLaminationType}
              hasSilkScreen={state.hasSilkScreen}
              setHasSilkScreen={state.setHasSilkScreen}
              hasSpotUV={state.hasSpotUV}
              setHasSpotUV={state.setHasSpotUV}
              varnishType={state.varnishType}
              setVarnishType={state.setVarnishType}
              varneshCover={state.varneshCover}
              setVarneshCover={state.setVarneshCover}
              assembly={state.assembly}
              setAssembly={state.setAssembly}
              rollDirection={state.rollDirection}
              setRollDirection={state.setRollDirection}
              gaping={state.gaping}
              setGaping={state.setGaping}
              rollWidth={state.rollWidth}
              setRollWidth={state.setRollWidth}
              stickersAcrossWidth={state.stickersAcrossWidth}
              workFee={state.workFee}
              setWorkFee={state.setWorkFee}
            />
          </div>
          <div className="lg:col-span-1">
            <OrderSummary
              MatCost={state.MatCost}
              wasteAreaM2={state.requiredAreaM2 * 0.1}
              subtotal={state.subtotal}
              tax={state.tax}
              total={state.total}
              onSubmit={handleSubmit}
              requiredLengthMeters={state.requiredLengthMeters}
              stickersPerMeter={state.stickersPerMeter}
              requiredAreaM2={state.requiredAreaM2}
            />
          </div>
        </div>
      </>
  )
}

export default PricingPage