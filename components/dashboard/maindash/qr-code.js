import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

export default function QrCode() {
  return (
    <section className="relative ">
      <div className="lg:col-span-7 p-5 bg-gray-100 rounded-lg  flex flex-col justify-between max-lg:max-w-lg max-lg:mx-auto">
        <h2 className="font-manrope font-semibold text-sm sm:text-base leading-2 text-black w-full text-center">
          Scan to send a message and Learn How get started a with Meseji Free
        </h2>
        <div className="flex justify-center items-center w-full p-4">
          <Image
            src="https://res.cloudinary.com/dzldtra4j/image/upload/v1732396761/meseji/pvxq57mnos7aofbi1ieu.png"
            alt="meseji qr code"
            height={120}
            width={120}
          />
        </div>

        <Button
          variant="secondary"
          size="md"
          className="rounded-full justify-center"
        ><Link href="https://wa.me/message/TEG32RCER4QAM1">
          Send Message</Link>
        </Button>
      </div>
    </section>
  );
}
