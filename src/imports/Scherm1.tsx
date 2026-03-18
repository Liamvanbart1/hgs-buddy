import imgAchtergrond from "figma:asset/6f4181edf0c44bcc0d04ceee1c1a1dbeb2e6c2d5.png";

export default function Scherm() {
  return (
    <div className="bg-white relative size-full" data-name="Scherm 1">
      <div className="absolute h-[1024px] left-0 top-0 w-[2009px]" data-name="Achtergrond">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgAchtergrond} />
      </div>
    </div>
  );
}