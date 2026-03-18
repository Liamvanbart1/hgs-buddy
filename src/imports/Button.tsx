import svgPaths from "./svg-zsvn3w5wwl";

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <p className="col-1 font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[20px] ml-[30px] mt-0 relative row-1 text-[16px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Stel een andere vraag aan HGS Buddy
      </p>
      <div className="col-1 h-[18.25px] ml-0 mt-px relative row-1 w-[18.031px]" data-name="Vector_2">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.0315 18.2503">
          <path d={svgPaths.p26c44bf0} fill="var(--fill-0, white)" id="Vector_2" />
        </svg>
      </div>
    </div>
  );
}

export default function Button() {
  return (
    <div className="bg-[#86a201] content-stretch flex items-center justify-center px-[10px] py-[7px] relative rounded-[50px] size-full" data-name="Button">
      <Group />
    </div>
  );
}