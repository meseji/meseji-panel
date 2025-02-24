import Image from "next/image";
import SectionBackground from "../shared/section-bg";
import Title from "../shared/Title";
import { useTranslations } from "next-intl";

export function Solutions() {
  const t = useTranslations("home.solutions");
  const solutions = [
    {
      key: "revolutionary_project",
      image: "/feat1.webp",
    },
    {
      key: "app_integrations",
      image: "/feat2.webp",
    },
    {
      key: "data_reporting",
      image: "/feat3.webp",
    },
    {
      key: "workflow_builder",
      image: "/feat4.webp",
    },
  ];
  return (
    <SectionBackground className="bg-gradient-to-t from-white to-gray-50/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <Title tag={"Solution"}>
          {t("title")}
            {/* Comprehensive WhatsApp <br />
            Solutions */}
          </Title>
          <p className="text-lg font-normal text-gray-500 max-w-md md:max-w-2xl mx-auto">
          {t("description")}
            {/* Experience seamless WhatsApp messaging with
            <br />
            our high-quality, cost-effective service. */}
          </p>
        </div>
        <div className="flex justify-center items-center gap-x-5 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
          {solutions.map((solution, index) => (
            <article key={index} className="relative w-full text-center max-md:max-w-sm max-md:mx-auto group md:w-2/5 lg:w-1/4">
              <div className="rounded-lg flex justify-center items-center mb-5 w-20 h-20 mx-auto cursor-pointer transition-all duration-500">
                <Image src={solution.image} alt={t(`${solution.key}.title`)} width={80} height={80} quality={100} />
              </div>
              <div role="heading" aria-level="3" className="text-lg font-medium text-gray-900 mb-3 capitalize">
                {t(`${solution.key}.title`)}
              </div>
              <p className="text-sm font-normal text-gray-500">
                {t(`${solution.key}.description`)}
              </p>
            </article>
          ))}
        </div>
        {/* <div className="flex justify-center items-center gap-x-5 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
          <article className="relative w-full text-center max-md:max-w-sm max-md:mx-auto group md:w-2/5 lg:w-1/4">
            <div className="rounded-lg flex justify-center items-center mb-5 w-20 h-20 mx-auto cursor-pointer transition-all duration-500">
              <Image
                src="/feat1.webp"
                alt="Revolutionary Projectview"
                width={80}
                height={80}
                quality={100}
              />
            </div>
            <div
              role="heading"
              aria-level="3"
              className="text-lg font-medium text-gray-900 mb-3 capitalize"
            >
              Revolutionary Project
            </div>
            <p className="text-sm font-normal text-gray-500">
              Plan and structure work how you want. Quickly organizing tasks.
            </p>
          </article>
          <article className="relative w-full text-center max-md:max-w-sm max-md:mx-auto group md:w-2/5 lg:w-1/4">
            <div className="rounded-lg flex justify-center items-center mb-5 w-20 h-20 mx-auto cursor-pointer transition-all duration-500">
              <Image
                src="/feat2.webp"
                alt="App Integrations"
                width={80}
                height={80}
                quality={100}
              />
            </div>
            <div
              role="heading"
              aria-level="3"
              className="text-lg font-medium text-gray-900 mb-3 capitalize"
            >
              App Integrations
            </div>
            <p className="text-sm font-normal text-gray-500">
              Bring all your tools and data together. Also join with hundreds of
              other apps.
            </p>
          </article>
          <article className="relative w-full text-center max-md:max-w-sm max-md:mx-auto group md:w-2/5 lg:w-1/4">
            <div className="rounded-lg flex justify-center items-center mb-5 w-20 h-20 mx-auto cursor-pointer transition-all duration-500">
              <Image
                src="/feat3.webp"
                alt="Data Reporting"
                width={80}
                height={80}
                quality={100}
              />
            </div>
            <div
              role="heading"
              aria-level="3"
              className="text-lg font-medium text-gray-900 mb-3 capitalize"
            >
              Data Reporting
            </div>
            <p className="text-sm font-normal text-gray-500">
              Get real-time insight into progress and allows teams to track
              their work habits.
            </p>
          </article>
          <article className="relative w-full text-center max-md:max-w-sm max-md:mx-auto group md:w-2/5 lg:w-1/4">
            <div className="rounded-lg flex justify-center items-center mb-5 w-20 h-20 mx-auto cursor-pointer transition-all duration-500">
              <Image
                src="/feat4.webp"
                alt="Workflow Builder"
                width={80}
                height={80}
                quality={100}
              />
            </div>
            <div
              role="heading"
              aria-level="3"
              className="text-lg font-medium text-gray-900 mb-3 capitalize"
            >
              Workflow Builder
            </div>
            <p className="text-sm font-normal text-gray-500">
              Automated processes to coordinate your teams and increase
              communication.
            </p>
          </article>
        </div> */}
      </div>
    </SectionBackground>
  );
}
