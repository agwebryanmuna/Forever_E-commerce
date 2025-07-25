import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div class="flex flex-col items-center justify-center text-sm h-[400px]">
      <p class="font-medium text-lg text-gray-500">404 Error</p>
      <h2 class="md:text-6xl text-4xl font-semibold text-gray-800">
        Page Not Found
      </h2>
      <p class="text-base mt-4 text-gray-500">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <div class="flex items-center gap-4 mt-6">
        <button
          onClick={() => navigate("/")}
          class="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
        >
          Go back home
        </button>
        <button
          onClick={() => navigate("/contact")}
          class="group flex items-center gap-2 px-7 py-2.5 active:scale-95 transition"
        >
          Contact support
          <svg
            class="group-hover:translate-x-0.5 mt-1 transition"
            width="15"
            height="11"
            viewBox="0 0 15 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 5.5h13.092M8.949 1l5.143 4.5L8.949 10"
              stroke="#1F2937"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
