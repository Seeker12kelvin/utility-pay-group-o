import { FaBolt } from "react-icons/fa6";
import { BsShieldCheck } from "react-icons/bs";
import { FaRankingStar } from "react-icons/fa6";

const WhyUsSection = () => {
  const cards = [
    {
      id: 1,
      icon: <FaBolt size={20} />,
      iconBgColor: "0052CC",
      title: "Military-Grade Security",
      desc: "Your data is encrypted with AES-256 standards. We prioritize your privacy.",
    },
    {
      id: 2,
      icon: <BsShieldCheck size={20} />,
      iconBgColor: "50DCFF",
      title: "Instant Processing",
      desc: "Payments are cleared in milliseconds. No more waiting days for confirmation.",
    },
    {
      id: 3,
      icon: <FaRankingStar size={20} />,
      iconBgColor: "82F9BE",
      title: "Usage Analytics",
      desc: "Visual charts and predictive insights help you reduce consumption and save money.",
    },
  ];

  return (
    <section className="bg-[#F0F3FF] w-full min-h-96.5 h-fit px-10 py-16 flex flex-col gap-8 justify-between items-center">
      <h1 className="text-[32px] font-semibold text-[#091C35]">
        Why UtilityPay?
      </h1>

      <div className="flex flex-wrap gap-5 w-full items-center justify-center">
        {cards.map((data) => (
          <div
            key={data.id}
            className="bg-white w-[384px] min-h-44.5 h-fit flex flex-col gap-3 justify-between items-center p-6 rounded-sm border border-[#DFE1E6]"
          >
            <div
              style={{ background: `#${data.iconBgColor}` }}
              className="size-10 flex justify-center items-center rounded-sm"
            >
              {data.icon}
            </div>

            <h3 className="text-xl font-normal text-[#091C35]">{data.title}</h3>

            <p className="text-center text-sm font-normal">{data.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUsSection;
