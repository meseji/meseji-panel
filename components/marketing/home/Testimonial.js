import Link from "next/link";
import Title from "../shared/Title";
import Script from "next/script";

export function Testimonial() {
  const testimonials = [
    {
      rating: 5,
      quote:
        "Meseji revolutionized our outreach—our customer engagement has never been higher.",
      image: "/images/testimonial1.jpg",
      alt: "Alex Turner",
      name: "Alex Turner",
      title: "CEO",
    },
    {
      rating: 5,
      quote:
        "With Meseji, our messaging flows are smart and automated. Its a total game changer for our marketing.",
      image: "/images/testimonial2.jpg",
      alt: "Maria Garcia",
      name: "Maria Garcia",
      title: "Marketing Director",
    },
    {
      rating: 5,
      quote:
        "Meseji&apos;s intuitive platform made setting up our campaigns a breeze. Our customer responses have been phenomenal!",
      image: "/images/testimonial3.jpg",
      alt: "David Lee",
      name: "David Lee",
      title: "Product Manager",
    },
  ];

  const reviewData = {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "WebApplication"],
    name: "Meseji",
    applicationCategory: [
      "SocialNetworkingApplication",
      "CommunicationApplication",
      "BrowserApplication",
      "DeveloperApplication",
      "BusinessApplication",
      "SocialNetworkingApplication",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      reviewCount: "207",
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Alex Turner",
        },
        datePublished: "2025-01-01",
        reviewBody:
          "Meseji revolutionized our outreach—our customer engagement has never been higher.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Maria Garcia",
        },
        datePublished: "2025-01-14",
        reviewBody:
          "With Meseji, our messaging flows are smart and automated. It's a total game changer for our marketing.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "David Lee",
        },
        datePublished: "2025-02-03",
        reviewBody:
          "Meseji's intuitive platform made setting up our campaigns a breeze. Our customer responses have been phenomenal!",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
      },
    ],
  };

  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
      <Script
        id="review-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewData) }}
      />
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          {/* Section Header */}
          <div className="text-center">
            <p className="text-lg font-medium text-gray-600 ">
              Many users and agency trust Meseji
            </p>
            <Title className="mt-4  text-gray-900">
              Hear What Our Clients Say
            </Title>
          </div>

          {/* Link to all reviews */}
          <div className="mt-6 text-center md:mt-8 lg:mt-10 md:order-3">
            <Link
              href="https://www.g2.com/products/meseji-best-marketing-tool-whatsapp-api-email-chatbot-and-more/reviews#reviews"
              title="View reviews"
              rel="nofollow noopener noreferrer"
              target="_blank"
              className="pb-2 text-base font-bold leading-7 text-gray-900 transition-all duration-200 border-b-2 border-gray-900 hover:border-gray-600 font-pj focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2 hover:text-gray-600"
            >
              Check reviews
            </Link>
          </div>

          {/* Testimonials Grid */}
          <div className="relative mt-10 md:mt-16 md:order-2">
            {/* <div className="absolute -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6">
              <div
                className="w-full h-full max-w-5xl mx-auto rounded-3xl opacity-30 blur-md filter"
                
                style={{ background: "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)" }}
              ></div>
            </div> */}

            <div className="relative grid max-w-lg grid-cols-1 gap-6 mx-auto md:max-w-none lg:gap-10 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex flex-col overflow-hidden border border-gray-200 rounded-lg "
                >
                  <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
                    <div className="flex-1">
                      {/* Star Rating */}
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: testimonial.rating }).map(
                          (_, i) => (
                            <svg
                              key={i}
                              className="w-5 h-5 text-[#FDB241]"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          )
                        )}
                      </div>

                      {/* Testimonial Quote */}
                      <blockquote className="flex-1 mt-8">
                        <p className="text-lg leading-relaxed text-gray-900 font-pj">
                          {testimonial.quote}
                        </p>
                      </blockquote>
                    </div>

                    {/* User Information */}
                    <div className="flex items-center mt-8">
                      {/* <img
                        className="flex-shrink-0 object-cover rounded-full w-11 h-11"
                        src={testimonial.image}
                        alt={testimonial.alt}
                      /> */}
                      <div className="ml-4">
                        <p className="text-base font-bold text-gray-900 font-pj">
                          {testimonial.name}
                        </p>
                        <p className="mt-0.5 text-sm font-pj text-gray-600">
                          {testimonial.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
