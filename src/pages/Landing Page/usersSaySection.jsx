import user_avatar1 from "../../images/User Avatar1.png";
import user_avatar2 from "../../images/User Avatar.png";

const UsersSaySection = () => {
  const cards = [
    {
      id: 1,
      img: user_avatar1,
      userTitle: "Sarah Jenkins",
      userJob: "Homeowner, Austin",
      desc: "UtilityPay has completely changed how I manage my monthly expenses. The interface is clean and helpful.",
    },
    {
      id: 2,
      img: user_avatar2,
      userTitle: "Sarah Jenkins",
      userJob: "Business Owner, Seattle",
      desc: "Security was my main concern, but UtilityPay's transparency gave me the confidence to switch all my billings.",
    },
  ];

  return (
    <section className="bg-[#003D9B] w-full min-h-96.5 h-fit px-10 py-16 flex flex-col gap-8 justify-between items-center">
      <h2 className="text-[32px] font-semibold text-white">
        What our users say
      </h2>

      <div className="flex flex-wrap gap-5 w-full items-center justify-center">
        {cards.map((data) => (
          <div
            key={data.id}
            className="w-147 min-h-39.5 h-fit bg-[#ffffff13] backdrop-blur-2xl border-[#ffffff3b] border rounded-sm p-6 flex flex-col gap-4 justify-between"
          >
            <h3 className="italic text-white">"{data.desc}"</h3>

            <div className="flex gap-2.5 h-10">
              <img
                src={data.img}
                alt="A users profile picture"
                className="object-cover size-10"
              />
              <div className="h-full flex flex-col justify-between">
                <h4 className="text-sm text-white font-bold">
                  {data.userTitle}
                </h4>
                <p className="text-xs text-white font-normal opacity-60">
                  {data.userJob}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UsersSaySection;
