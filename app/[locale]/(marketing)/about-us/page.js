export async function generateMetadata() {
  return {
    title: "About Us - Meseji's Whastapp API Marketing Solution",
    description:
      "We are a team of developers who are passionate about building software that makes a difference. We believe in the power of technology to change the world and we are committed to building software that helps people.",
    url: "https://meseji.app/about-us",
    image: "/og-image.png",
    date: "2024-06-23",
  };
}

export default function About() {
  const  t  = useTranslations("about");
  return (
    <div className="flex justify-center items-center h-screen bg-slate-50">
      <div>
        <h1 className="text-4xl font-semibold text-black">{t("title")}</h1>
        <p className="text-lg text-gray-500">
          {t("description")}
        </p>
      </div>
    </div>
  );
}
