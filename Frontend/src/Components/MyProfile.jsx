import React, { useState } from "react";

function MyProfile() {
  const [form, setform] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    email: "",
    number: "",
    address: "",
  });

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", form);
  };

  return (
    <>
      <div className="mt-10 rounded-lg h-full w-[800px] border-2 border-gray-300 shadow-lg bg-gradient-to-br from-blue-50 to-slate-100 mx-auto">
        <div className="bg-blue-600 rounded-t-lg py-5">
          <h1 className="text-white text-4xl text-center font-bold">
            Personal Information
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="flex flex-col items-center">
            <input
              className="w-full p-3 text-[20px] bg-slate-200 text-black rounded-xl focus:ring-4 focus:ring-blue-300"
              type="text"
              placeholder="First Name"
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
            />
            <input
              className="w-full p-3 text-[20px] bg-slate-200 text-black rounded-xl mt-4 focus:ring-4 focus:ring-blue-300"
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={form.lastname}
              onChange={handleChange}
            />
          </div>

          <h2 className="text-black text-2xl mt-4 font-semibold">
            Your Gender
          </h2>
          <div className="flex space-x-5 mt-3">
            <label className="flex items-center text-lg">
              <input
                className="mr-2"
                type="radio"
                name="gender"
                value="Male"
                checked={form.gender === "Male"}
                onChange={handleChange}
              />
              Male
            </label>

            <label className="flex items-center text-lg">
              <input
                className="mr-2"
                type="radio"
                name="gender"
                value="Female"
                checked={form.gender === "Female"}
                onChange={handleChange}
              />
              Female
            </label>

            <label className="flex items-center text-lg">
              <input
                className="mr-2"
                type="radio"
                name="gender"
                value="Transgender"
                checked={form.gender === "Transgender"}
                onChange={handleChange}
              />
              Transgender
            </label>
          </div>

          <label className="block text-black text-2xl font-semibold mt-4">
            Email Address
          </label>
          <input
            className="w-full p-3 mt-2 text-[20px] bg-slate-200 text-black rounded-xl focus:ring-4 focus:ring-blue-300"
            type="email"
            placeholder="Your Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <label className="block text-black text-2xl font-semibold mt-4">
            Phone Number
          </label>
          <input
            className="w-full p-3 mt-2 text-[20px] bg-slate-200 text-black rounded-xl focus:ring-4 focus:ring-blue-300"
            type="number"
            placeholder="Your Number"
            name="number"
            value={form.number}
            onChange={handleChange}
          />

          <label className="block text-black text-2xl font-semibold mt-4">
            Address
          </label>
          <textarea
            className="w-full p-3 mt-2 text-[20px] bg-slate-200 text-black rounded-xl focus:ring-4 focus:ring-blue-300"
            placeholder="Your Address"
            name="address"
            value={form.address}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="text-white bg-gradient-to-r from-blue-500 to-indigo-600 text-3xl p-3 rounded-xl mt-6 w-full hover:shadow-lg transition-transform duration-300 transform hover:scale-105"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default MyProfile;
