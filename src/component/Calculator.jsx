import React from "react";
import { useState, useEffect } from "react";

function Calculator() {
  const [isInput, setIsInput] = useState({ day: "", month: "", year: "" });
  const [error, setError] = useState({
    dayError: "",
    monthError: "",
    yearError: "",
  });
  const [calculator, setCalculator] = useState({
    years: "--",
    months: "--",
    days: "--",
  });
  const currentDate = new Date();
  const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsInput({ ...isInput, [name]: value });
  };

  useEffect(() => {
    // console.log(isInput);
    if (
      isInput.day &&
      (isNaN(isInput.day) || isInput.day < 1 || isInput.day > 31)
    ) {
      setError((prevError) => ({
        ...prevError,
        dayError: "Please enter a valid day",
      }));
    } else {
      setError((prevError) => ({ ...prevError, dayError: "" }));
    }

    if (
      isInput.year &&
      (isNaN(isInput.year) ||
        isInput.year < 1 ||
        isInput.year >= currentDate.getFullYear())
    ) {
      setError((prevError) => ({
        ...prevError,
        yearError: "Please enter a valid year in the past.",
      }));
    } else {
      setError((prevError) => ({ ...prevError, yearError: "" }));
    }

    if (
      isInput.month &&
      (isNaN(isInput.month) || isInput.month < 1 || isInput.month > 12)
    ) {
      setError((prevError) => ({
        ...prevError,
        monthError: "Please enter a valid month.",
      }));
    } else {
      setError((prevError) => ({ ...prevError, monthError: "" }));
    }

    if (
      isInput.year &&
      (isInput.year % 400 === 0 ||
        (isInput.year % 100 !== 0 && isInput.year % 4 === 0))
    ) {
      monthLengths[1] = 29; // Leap Year
    }

    if (
      isInput.day &&
      isInput.month &&
      isInput.day > monthLengths[isInput.month - 1]
    ) {
      setError((prevError) => ({
        ...prevError,
        dayError: "Please enter a valid day for the given month.",
      }));
    }
  }, [isInput]);

  const calculateAge = () => {
    if (
      !error.dayError &&
      !error.monthError &&
      !error.yearError &&
      isInput.day.length !== 0 &&
      isInput.month.length !== 0 &&
      isInput.year.length !== 0
    ) {
      const birthDate = new Date(
        parseInt(isInput.year),
        parseInt(isInput.month) - 1,
        parseInt(isInput.day)
      );

      const years = currentDate.getFullYear() - birthDate.getFullYear();
      const birthMonth = birthDate.getMonth();
      const currentMonth = currentDate.getMonth();

      let months = currentMonth - birthMonth;
      if (currentDate.getDate() < birthDate.getDate()) {
        months--;
      }

      const days = currentDate.getDate() - birthDate.getDate();

      setCalculator({
        years: years,
        months: months < 0 ? 12 + months : months,
        days:
          days < 0
            ? days +
              new Date(currentDate.getFullYear(), currentMonth, 0).getDate()
            : days,
      });
    }
  };

  return (
    <section className="flex items-center h-screen p-6 bg-offWhite">
      <div className="w-full max-w-lg p-6 mx-auto bg-white rounded-3xl rounded-br-[100px]">
        <div className="relative flex pt-5 pb-12 border-b-2 sm:pt-0 sm:pb-6 gap-7 border-b-lightGrey">
          <label className="max-w-[100px] w-full">
            <p
              className={`text-sm font-bold tracking-widest ${
                !error.dayError ? "text-smokeyGrey " : "text-lightRed"
              }`}
            >
              DAY
            </p>
            <input
              type="text"
              placeholder="DD"
              name="day"
              maxLength={2}
              value={isInput.day}
              onChange={handleChange}
              required
              className="w-full p-2 text-lg font-extrabold border-2 rounded-lg sm:text-2xl border-lightGrey placeholder:font-medium focus:ring-purple focus:border-purple focus:border-2 hover:border-purple focus:outline-none"
            />
            <p className="pt-1 text-xs text-lightRed"> {error.dayError} </p>
          </label>
          <label className="max-w-[100px] w-full">
            <p
              className={`text-sm font-bold tracking-widest ${
                !error.monthError ? "text-smokeyGrey " : "text-lightRed"
              }`}
            >
              MONTH
            </p>
            <input
              type="text"
              placeholder="MM"
              name="month"
              maxLength={2}
              value={isInput.month}
              onChange={handleChange}
              required
              className="p-2 text-lg sm:text-2xl font-extrabold border-2 rounded-lg w-full max-w-[100px] border-lightGrey  placeholder:font-medium focus:ring-purple focus:border-purple focus:border-2 hover:border-purple focus:outline-none"
            />
            <p className="pt-1 text-xs text-lightRed"> {error.monthError} </p>
          </label>
          <label className="max-w-[100px] w-full">
            <p
              className={`text-sm font-bold tracking-widest ${
                !error.yearError ? "text-smokeyGrey " : "text-lightRed"
              }`}
            >
              YEAR
            </p>
            <input
              type="text"
              placeholder="YYYY"
              name="year"
              maxLength={4}
              input={isInput.year}
              onChange={handleChange}
              required
              className="p-2 text-lg sm:text-2xl font-extrabold border-2 rounded-lg w-full max-w-[100px] border-lightGrey  placeholder:font-medium focus:ring-purple focus:border-purple focus:border-2 hover:border-purple focus:outline-none"
            />
            <p className="pt-1 text-xs text-lightRed"> {error.yearError} </p>
          </label>
          <div className="absolute translate-x-1/2 sm:translate-x-0 right-1/2 sm:right-0 -bottom-8">
            <button
              className="p-4 rounded-full bg-purple"
              onClick={(e) => calculateAge()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 46 44"
              >
                <g fill="none" stroke="#FFF" stroke-width="2">
                  <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
                </g>
              </svg>
            </button>
          </div>
        </div>
        <div className="my-10 sm:my-5">
          <h1 className="mb-2 text-5xl italic font-extrabold sm:text-6xl text-offBlack">
            <span className=" text-purple"> {calculator.years} </span> years
          </h1>
          <h1 className="mb-2 text-5xl italic font-extrabold sm:text-6xl text-offBlack">
            <span className=" text-purple"> {calculator.months} </span> months
          </h1>
          <h1 className="text-5xl italic font-extrabold sm:text-6xl text-offBlack">
            <span className=" text-purple"> {calculator.days} </span> days
          </h1>
        </div>
      </div>
    </section>
  );
}

export default Calculator;
