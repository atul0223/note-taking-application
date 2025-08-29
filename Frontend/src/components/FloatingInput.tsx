import { useState } from "react";

const FloatingInput = ({
  label,
  type = "text",
  error,
  helperText,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  error?: string;
  helperText?: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const isActive = isFocused || value;

  return (
    <div className="relative w-full mb-3">
      <input
        type={type}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required
        className={`
          w-full px-3 py-4 bg-transparent border-2 rounded-xl outline-none transition-colors duration-200
          ${
            error
              ? "border-red-500 focus:border-red-600"
              : isFocused
              ? "border-blue-500"
              : "border-gray-300 hover:border-gray-400"
          }
        `}
      />

      {/* Label with border break effect */}
      <label
        className={`
        absolute left-3 px-1 bg-white transition-all duration-200 pointer-events-none
        ${
          isActive
            ? `-top-2.5 text-xs ${
                error
                  ? "text-red-600"
                  : isFocused
                  ? "text-blue-600"
                  : "text-gray-600"
              }`
            : "top-4 text-base text-gray-500"
        }
      `}
      >
        {label}
      </label>

      {/* Helper text or error message */}
      {(helperText || error) && (
        <p
          className={`mt-1 text-xs ${error ? "text-red-500" : "text-gray-500"}`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};
export default FloatingInput;
