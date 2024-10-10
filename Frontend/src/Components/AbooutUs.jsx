import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            About Us
          </h1>
          <p className="text-lg text-gray-600">
            Discover fashion, redefine style with Rentify.
          </p>
        </div>

        {/* Main Content Section */}
        <div className="bg-white shadow-lg rounded-lg p-8 sm:p-10">
          <p className="text-xl text-gray-800 mb-6">
            Welcome to <span className="font-semibold">Rentify</span>, your
            ultimate online destination for shopping and renting top-quality
            fashion and accessories. At Rentify, we believe in giving you the
            best of both worlds – the option to shop for your favorite clothing,
            shoes, and jewelry, and the ability to rent high-end fashion pieces
            for those special occasions.
          </p>

          <p className="text-xl text-gray-800 mb-6">
            Our platform offers a carefully curated collection of the latest
            trends and timeless classics, ensuring you can always find something
            that suits your style and budget. Whether you are looking for
            everyday wear, a stunning outfit for a special event, or luxury
            accessories, we have something for everyone.
          </p>

          {/* Mission Section */}
          <h2 className="text-3xl font-semibold text-gray-900 mt-10 mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Our mission is simple – to make fashion accessible to everyone,
            whether you want to own it or just wear it for a while. By offering
            both shopping and rental options, we aim to revolutionize the way
            people think about fashion, making it more sustainable and flexible
            for all.
          </p>

          {/* Why Choose Us Section */}
          <h2 className="text-3xl font-semibold text-gray-900 mt-10 mb-4">
            Why Choose Rentify?
          </h2>
          <ul className="list-disc pl-5 text-lg text-gray-700 space-y-4 mb-6">
            <li>Shop the latest trends in clothing, shoes, and jewelry.</li>
            <li>
              Rent luxury fashion items for special occasions at a fraction of
              the price.
            </li>
            <li>Wide range of options for all styles and preferences.</li>
            <li>Affordable pricing and flexible rental plans.</li>
            <li>Convenient shopping experience with secure payment options.</li>
          </ul>

          {/* Vision Section */}
          <h2 className="text-3xl font-semibold text-gray-900 mt-10 mb-4">
            Our Vision
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            We envision a world where fashion is sustainable, affordable, and
            accessible to all. With Rentify, you can embrace the freedom to
            experiment with your style without compromising on quality or
            breaking the bank. Whether you’re purchasing or renting, we’re
            committed to delivering a seamless shopping experience that puts
            your needs first.
          </p>

          <p className="text-lg text-gray-700">
            Thank you for choosing{" "}
            <span className="font-semibold">Rentify</span>. We’re excited to be
            part of your fashion journey!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
