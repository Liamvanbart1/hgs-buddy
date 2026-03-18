import svgPaths from "./svg-naxmthzuvg";
import clsx from "clsx";
import { imgVector2 } from "./svg-nitxw";

function Icon1Vector({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute inset-1/4">
      <div className="absolute inset-[-8.33%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
          {children}
        </svg>
      </div>
    </div>
  );
}
type ButtonTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ButtonText({ text, additionalClassNames = "" }: ButtonTextProps) {
  return (
    <div className={clsx("absolute bg-[#f9fafb] border border-[rgba(0,0,0,0.1)] border-solid h-[30px] rounded-[1.67772e+07px] top-[410px] w-[191px]", additionalClassNames)}>
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16px] left-[95px] text-[#364153] text-[12px] text-center text-nowrap top-[6px] translate-x-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
        {text}
      </p>
    </div>
  );
}

export default function DigitalAssistant() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] size-full" data-name="DigitalAssistant">
      <div className="bg-[#86a201] h-[82px] relative shrink-0 w-[514.75px]" data-name="Container">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[16px] py-0 relative size-full">
          <div className="h-[50px] relative shrink-0 w-[184.695px]" data-name="Container">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
              <div className="absolute content-stretch flex flex-col items-start left-0 size-[24px] top-[13px]" data-name="Group">
                <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
                  <div className="absolute contents inset-0" data-name="Clip path group">
                    <div className="absolute contents inset-[0_0_8.75%_0]" data-name="Group">
                      <div className="absolute inset-[0_0_8.75%_0] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[24px_24px]" data-name="Vector_2" style={{ maskImage: `url('${imgVector2}')` }}>
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 21.9004">
                          <path d={svgPaths.p37845d00} fill="var(--fill-0, white)" id="Vector_2" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute content-stretch flex flex-col h-[50px] items-start left-[36px] top-0 w-[148.695px]" data-name="Container">
                <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 2">
                  <p className="absolute font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[30px] left-0 text-[20px] text-nowrap text-white top-[-1px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    HGS Buddy
                  </p>
                </div>
                <div className="h-[20px] opacity-90 relative shrink-0 w-full" data-name="Paragraph">
                  <p className="absolute font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[20px] left-0 text-[14px] text-nowrap text-white top-[0.5px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Uw Shopping Assistent
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative rounded-[4px] shrink-0 size-[28px]" data-name="Button">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[4px] px-[4px] relative size-full">
              <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
                <Icon1Vector>
                  <path d={svgPaths.p354ab980} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </Icon1Vector>
                <Icon1Vector>
                  <path d={svgPaths.p2a4db200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </Icon1Vector>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="basis-0 bg-[#f9fafb] grow min-h-px min-w-px relative shrink-0 w-[514.75px]" data-name="Container">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
          <div className="absolute bg-[#f3f4f6] h-[293px] left-[16px] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-[16px] w-[434.469px]" data-name="Container">
            <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold h-[17px] leading-[20px] left-[12px] text-[16px] text-black top-[11px] w-[378px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Welkom bij HorecaGrootKeukenshop.nl
            </p>
            <div className="absolute h-[200px] left-[12px] top-[40px] w-[410.469px]" data-name="Container">
              <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[-0.25px] text-[#1e2939] text-[14px] top-0 w-[419px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                <p className="mb-0">Ik ben de HGS Buddy, jouw digitale shoppingassistent.</p>
                <p className="mb-0">&nbsp;</p>
                <p className="font-['Open_Sans:Bold',sans-serif] font-bold mb-0" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Twijfel je tussen producten of weet je niet waar je moet beginnen?
                </p>
                <p className="mb-0">
                  <br aria-hidden="true" />
                  Twijfel je tussen producten of weet je niet waar je moet beginnen? Ik help je stap voor stap bij het kiezen van de juiste horeca-apparatuur.
                </p>
                <p className="mb-0">&nbsp;</p>
                <p className="mb-0">Beschrijf je situatie, zoals het type keuken, het gebruik of de beschikbare ruimte. Ik vergelijk opties voor je en geef gericht advies dat past bij jouw situatie.</p>
                <p>&nbsp;</p>
              </div>
            </div>
          </div>
          <div className="absolute content-stretch flex flex-col gap-[8px] h-[79px] items-start left-[0.75px] pb-0 pt-[13px] px-[12px] top-[335px] w-[514.75px]" data-name="Container">
            <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
            <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
              <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#4a5565] text-[12px] text-nowrap top-[-0.5px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Probeer bijvoorbeeld:
              </p>
            </div>
            <div className="h-[30px] relative shrink-0 w-full" data-name="Container">
              <div className="absolute bg-[#f9fafb] border border-[rgba(0,0,0,0.1)] border-solid h-[30px] left-0 rounded-[1.67772e+07px] top-0 w-[141px]" data-name="Button">
                <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16px] left-[70px] text-[#364153] text-[12px] text-center text-nowrap top-[6px] translate-x-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Ik zoek een product
                </p>
              </div>
              <div className="absolute bg-[#f9fafb] border border-[rgba(0,0,0,0.1)] border-solid h-[30px] left-[155px] rounded-[1.67772e+07px] top-0 w-[242px]" data-name="Button">
                <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16px] left-[120px] text-[#364153] text-[12px] text-center text-nowrap top-[6px] translate-x-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Is dit product geschikt voor mijn situatie
                </p>
              </div>
            </div>
          </div>
          <ButtonText text="Ik wil producten vergelijken" additionalClassNames="left-[12.75px]" />
          <ButtonText text="Leg de specificaties uit" additionalClassNames="left-[218.75px]" />
        </div>
      </div>
      <div className="bg-white h-[75px] relative shrink-0 w-[514.75px]" data-name="Container">
        <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[17px] px-[16px] relative size-full">
          <div className="content-stretch flex gap-[8px] h-[42px] items-start relative shrink-0 w-full" data-name="Container">
            <div className="basis-0 grow h-[42px] min-h-px min-w-px relative rounded-[10px] shrink-0" data-name="Text Input">
              <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[16px] py-[10px] relative size-full">
                  <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-[rgba(10,10,10,0.5)] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Stel uw vraag...
                  </p>
                </div>
              </div>
              <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
            </div>
            <div className="bg-[#86a201] h-[42px] relative rounded-[10px] shrink-0 w-[52px]" data-name="Button">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[11px] px-[16px] relative size-full">
                <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
                  <div className="absolute inset-[8.32%_8.32%_8.33%_8.33%]" data-name="Vector">
                    <div className="absolute inset-[-5%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3353 18.3353">
                        <path d={svgPaths.p228d3dc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute inset-[8.95%_8.94%_45.48%_45.47%]" data-name="Vector">
                    <div className="absolute inset-[-9.14%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.7833 10.7825">
                        <path d={svgPaths.p2920ab80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}