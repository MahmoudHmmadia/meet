import Input from "./Input";
import { useForm, FieldValues, FieldErrors } from "react-hook-form";
import { FaUserCircle, FaMailBulk, FaLock } from "react-icons/fa";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import validationOptions from "../libs/validation";
import { auth } from "../libs/apiCalls";
import { useMutation } from "@tanstack/react-query";
import AppContext from "../context/AppContext";
import { myAxios } from "../api/myAxios";
type props = {
  type: string;
};

function Form({ type }: props) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const { setAuth, setIsRegister } = AppContext();
  const imageRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [serverError, setServerError] = useState<string | undefined>(undefined);
  const mutation = useMutation({
    mutationFn: auth,
    onSuccess: ({ data }) => {
      if (data.token) {
        setServerError(undefined);
        setAuth(data);
        if (type === "register") {
          setIsRegister(true);
        }
      }
    },
    onError(err: any) {
      setServerError(undefined);
      if (err.message == "Network Error")
        setServerError("THE SERVER IS NOT WORKING WRITE NOW");
    },
  });
  const handleRegistration = (data: FieldValues) => {
    const formData = new FormData();
    formData.append("profile", imageRef.current?.files![0]!);
    formData.append("data", JSON.stringify(data));
    formData.append("imageName", imageRef.current?.files![0].name!);
    mutation.mutate({
      data: type === "register" ? formData : data,
      endPoint: type,
    });
    reset();
  };
  const handleError = (errors: FieldErrors) => console.log(errors);
  function login() {}
  return (
    <>
      {mutation.error && !serverError && (
        <p className="text-rose-600 uppercase font-bold">
          {mutation.error.response.data}
        </p>
      )}
      {serverError && (
        <p className="text-rose-600 uppercase font-bold">{serverError}</p>
      )}
      <>
        {type == "register" && (
          <>
            {image ? (
              <div className="image overflow-hidden md:w-[200px] w-[150px] aspect-square flex justify-center items-center">
                <img
                  src={image.toString()}
                  alt=""
                  className="object-cover rounded-full aspect-square"
                />
              </div>
            ) : (
              <div className="image rounded-full overflow-hidden aspect-square flex justify-center items-center">
                <div className=" text-alt md:text-[200px] text-[150px]">
                  <FaUserCircle />
                </div>
              </div>
            )}
          </>
        )}
        <>
          {type == "register" && (
            <div className="image flex items-center">
              <h1 className="text-4xl text-main uppercase">register</h1>
              <img src="/logo2.png" width={80} alt="" />
            </div>
          )}
          <form
            className="uppercase flex flex-col gap-4 w-full"
            onSubmit={handleSubmit(handleRegistration, handleError)}
          >
            {type === "register" && (
              <Input
                Icon={FaUserCircle}
                errors={errors}
                id="name"
                label="Name"
                register={register}
              />
            )}
            <Input
              Icon={FaMailBulk}
              errors={errors}
              id="email"
              label="email"
              register={register}
              options={validationOptions.email}
            />
            <Input
              Icon={FaLock}
              errors={errors}
              id="password"
              label="password"
              register={register}
              options={validationOptions.password}
              type="password"
            />
            {type === "register" && (
              <>
                <Input
                  Icon={FaLock}
                  errors={errors}
                  id="confirm password"
                  label="confirm password"
                  register={register}
                  type="password"
                  options={{
                    required: "confirm password is required",
                    validate: (val: string) => {
                      if (watch("password") != val) {
                        return "Your passwords do no match";
                      }
                    },
                  }}
                />
                <div className="relative p-2 w-full flex justify-center text-white bg-orange-400 cursor-pointer hover:scale-95 transition-all">
                  <label
                    htmlFor="profile"
                    className="uppercase cursor-pointer relative flex-1 text-center"
                  >
                    add image
                  </label>
                  <input
                    type="file"
                    id="profile"
                    className="opacity-0 absolute hidden"
                    ref={imageRef}
                    name="profile"
                    onChange={
                      //   (e) => {
                      //   if (e.target.files && e.target.files[0]) {
                      //     setImage(URL.createObjectURL(e.target.files[0]));
                      //   }
                      // }
                      (event) => {
                        if (event.target.files && event.target.files[0]) {
                          let reader = new FileReader();
                          reader.onload = (e) => {
                            setImage(e.target!.result);
                          };
                          reader.readAsDataURL(event.target.files[0]);
                        }
                      }
                    }
                  />
                </div>
              </>
            )}
            <Button bg="bg-main" content={type} disabled={mutation.isLoading} />
          </form>
          <div className="flex w-full mt-4 flex-col gap-8 items-center">
            <div className="h-[1px] bg-alt relative w-10/12 m-auto">
              <div className="absolute left-1/2 text-xs -top-[20px] bg-[#eee] -translate-x-1/2 z-10 w-10 aspect-square rounded-full flex justify-center items-center font-bold">
                OR
              </div>
            </div>
            <Link
              to={type == "login" ? "register" : "login"}
              className="uppercase p-2 bg-alt text-white w-full justify-center flex hover:scale-95 transition-all"
            >
              {type == "login" ? "register" : "login"}
            </Link>
          </div>
        </>
      </>
    </>
  );
}

export default Form;
