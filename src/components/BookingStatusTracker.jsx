import React from "react";
import { CheckCircle, Clock, Truck, PackageCheck } from "lucide-react";

const steps = [
  { label: "Pending", icon: Clock },
  { label: "Accepted", icon: CheckCircle },
  { label: "Shipped", icon: Truck },
  { label: "Delivered", icon: PackageCheck },
];

const BookingStatusTracker = ({ status }) => {
  const currentStepIndex = steps.findIndex((step) => step.label === status);

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-8 gap-6 relative px-2">
      {steps.map((step, idx) => {
        const isCompleted = idx < currentStepIndex;
        const isActive = idx === currentStepIndex;
        const Icon = step.icon;

        return (
          <div
            key={step.label}
            className="flex items-center md:flex-col gap-3 md:gap-2 relative w-full md:w-auto group"
          >
            {/* Circle Icon */}
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                isCompleted
                  ? "bg-green-500 text-white border-green-500"
                  : isActive
                  ? "border-blue-500 text-blue-500 bg-white"
                  : "border-gray-300 text-gray-400 bg-white"
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>

            {/* Label */}
            <span
              className={`text-sm md:text-xs transition-all ${
                isCompleted
                  ? "text-green-600 font-medium"
                  : isActive
                  ? "text-blue-600"
                  : "text-gray-400"
              }`}
            >
              {step.label}
            </span>

            {/* Connector Line */}
            {idx < steps.length - 1 && (
              <div
                className={`absolute ${
                  // horizontal line on md+, vertical line on mobile
                  "md:top-5 md:left-full md:w-10 md:h-1 md:translate-y-0" +
                  " top-10 left-5 w-1 h-10 md:hidden"
                } ${isCompleted ? "bg-green-400" : "bg-gray-300"}`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BookingStatusTracker;
