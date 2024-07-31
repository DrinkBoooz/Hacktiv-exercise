import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

// Country codes data
const countries = [
  { code: "+1", name: "United States" },
  { code: "+44", name: "United Kingdom" },
  { code: "+63", name: "Philippines" },
];

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [countryCode, setCountryCode] = useState("+63"); // Default to Philippines
  const [visible, setVisible] = useState(false);
  const toggleVisibility = (event) => {
    event.preventDefault();
    setVisible(!visible);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      mobileNumber: "",
      email: "",
      address: "",
      gender: "",
      password: "",
      confirmPassword: "",
      birthdate: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(2).max(50).required("Required"),
      mobileNumber: Yup.string()
        .matches(
          new RegExp(`^${countryCode.replace(/\+/g, "\\+")}\\d{9}$`),
          "Invalid mobile number"
        )
        .required("Required"),
      email: Yup.string()
        .email("Invalid email address")
        .matches(
          /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Email must end with a valid domain"
        )
        .required("Required"),
      address: Yup.string().required("Required"),
      gender: Yup.string()
        .oneOf(["male", "female", "prefer not to say"], "Invalid gender")
        .required("Required"),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;"'<>,.?/~`|-]).{8,}$/,
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one special character"
        )
        .required(
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one special character"
        ),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
      birthdate: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const action = await dispatch(registerUser(values));
        if (registerUser.fulfilled.match(action)) {
          navigate("/login");
        } else {
          alert("Registration failed. Please try again.");
        }
      } catch (error) {
        alert("Registration failed. Please try again.", error);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-100 shadow-lg rounded-lg">
        <button
          onClick={() => navigate("/")}
          className="mb-4 py-2 px-4 bg-gray-300 text-black font-bold rounded-md hover:scale-110 transition-transform duration-200"
        >
          <ArrowLeftOutlined className="mr-2" />
          Homepage
        </button>
        <h2 className="text-gray-700 text-2xl font-bold text-center hover:scale-110 transition-transform duration-200">
          Register
        </h2>
        {/* Country Selector */}
        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <select
            id="country"
            name="country"
            onChange={(e) => setCountryCode(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm hover:scale-110 transition-transform duration-200"
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              {...formik.getFieldProps("name")}
              placeholder="John Doe"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm hover:scale-110 transition-transform duration-200"
            />
            {formik.errors.name && (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            )}
          </div>
          {/* Mobile Number */}
          <div>
            <label
              htmlFor="mobileNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Mobile Number
            </label>
            <input
              id="mobileNumber"
              name="mobileNumber"
              type="tel"
              placeholder={countryCode}
              {...formik.getFieldProps("mobileNumber")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm hover:scale-110 transition-transform duration-200"
            />
            {formik.errors.mobileNumber && (
              <div className="text-red-500 text-sm">
                {formik.errors.mobileNumber}
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 hover:scale-110 transition-transform duration-200"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="JohnDoe@gmail.com"
              {...formik.getFieldProps("email")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm hover:scale-110 transition-transform duration-200"
            />
            {formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>
          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder="123 Main Street, Barangay Central, Quezon City, Philippines, 1100"
              {...formik.getFieldProps("address")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm hover:scale-110 transition-transform duration-200"
            />
            {formik.errors.address && (
              <div className="text-red-500 text-sm">
                {formik.errors.address}
              </div>
            )}
          </div>
          {/* Gender */}
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              {...formik.getFieldProps("gender")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm hover:scale-110 transition-transform duration-200"
            >
              <option value="" label="Select Gender" />
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="prefer not to say">Prefer not to say</option>
            </select>
            {formik.errors.gender && (
              <div className="text-red-500 text-sm">{formik.errors.gender}</div>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={visible ? "text" : "password"}
                {...formik.getFieldProps("password")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm hover:scale-110 transition-transform duration-200 pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3"
                onClick={toggleVisibility}
                aria-label={visible ? "Hide password" : "Show password"}
              >
                {visible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              </button>
            </div>
            {formik.errors.password && (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={visible ? "text" : "password"}
                {...formik.getFieldProps("confirmPassword")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm hover:scale-110 transition-transform duration-200 pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3"
                onClick={toggleVisibility}
                aria-label={visible ? "Hide password" : "Show password"}
              >
                {visible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              </button>
            </div>
            {formik.errors.confirmPassword && (
              <div className="text-red-500 text-sm">
                {formik.errors.confirmPassword}
              </div>
            )}
          </div>

          {/* Birthdate */}
          <div>
            <label
              htmlFor="birthdate"
              className="block text-sm font-medium text-gray-700"
            >
              Birthdate
            </label>
            <input
              id="birthdate"
              name="birthdate"
              type="date"
              {...formik.getFieldProps("birthdate")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm hover:scale-110 transition-transform duration-200"
            />
            {formik.errors.birthdate && (
              <div className="text-red-500 text-sm">
                {formik.errors.birthdate}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-400 text-white font-bold rounded-md hover:bg-indigo-700 scale-110 transition-transform duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
