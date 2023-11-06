import { IconType } from "react-icons";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { useState } from "react";
interface props {
  label: string;
  Icon: IconType;
  id: string;
  disabled?: boolean;
  options?: any;
  register: UseFormRegister<FieldValues>;
  value?: string;
  errors: FieldErrors;
  type?: string;
}

function Input({
  Icon,
  errors,
  id,
  label,
  register,
  disabled,
  options,
  value,
  type = "text",
}: props) {
  const [isAnimate, setIsAnimate] = useState(false);
  return (
    <>
      <div className="input-container relative cursor-pointer mb-3">
        <label
          htmlFor={id}
          className={`flex gap-2 items-center absolute left-4 transition-all cursor-pointer
        ${
          isAnimate
            ? " text-xs -top-2 text-main"
            : "top-1/2 text-sm -translate-y-1/2 text-alt"
        }
        
        `}
        >
          <span className="absolute top-1/2 w-[150%] -translate-y-1/2 bg-[#eee] h-[3px] -left-2"></span>
          <span className="flex relative">
            <Icon />
          </span>
          <span className=" relative">{label}</span>
        </label>
        <input
          id={id}
          type={type}
          disabled={disabled}
          className={`p-2 w-full outline-none bg-inherit  border transition-all rounded-md ${
            errors[id] ? "border-rose-700" : "border-alt"
          }`}
          {...register(id, options)}
          onFocus={() => setIsAnimate(true)}
          onBlur={(e) => {
            e.currentTarget.value ? setIsAnimate(true) : setIsAnimate(false);
          }}
          autoComplete="off"
          value={value}
        />
        <div className="absolute">
          {errors[id] && (
            <h1 className="text-rose-600 text-xs font-bold">
              {errors[id]?.message?.toString()}
            </h1>
          )}
        </div>
      </div>
    </>
  );
}

export default Input;
