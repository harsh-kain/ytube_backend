import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { postRequest } from "../utils/FetchAPI";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { login } from "../redux/slices/AuthSlice";
const Login = () => {
    const dispatch = useDispatch();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const parseErrorMessage = (htmlString) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, "text/html");
        const preElement = doc.querySelector("pre");
        if (preElement) {
            // Extract the text content of the <pre> element
            const fullErrorText = preElement.textContent || "";

            // Use regex to capture everything before the " at " or new line
            const errorMessageMatch = fullErrorText.match(/^(.*?)(\s+at\s|\n)/);

            // If a match is found, return the first capture group (the main error message)
            if (errorMessageMatch && errorMessageMatch.length > 1) {
                return errorMessageMatch[1].replace("Error: ", "").trim();
            }
        }
        return "Unknown error occurred";
    };
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        const { password, email } = data;

        const formData = {
            email,
            password,
        };

        try {
            const response = await postRequest("/users/login", formData);
            console.log(response);
            if(response.success){
                dispatch(login(response.data.accessToken))
                toast.success("Logged in Successfully", {
                    onClose: () => {
                        if (response.success) {
                            navigate("/");
                        }
                    },
                });
            }
        } catch (error) {
            console.log(error);
            const htmlString = error;
            const errorMessage = parseErrorMessage(htmlString);
            console.error(errorMessage);
            toast.error(`Errro: ${errorMessage}`);
        }
    };
    return (
        <div className="wrap flex justify-center items-center flex-col w-full">
            <ToastContainer autoClose={2000}
            />

            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Login
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Nice to meet you! Enter your details to register.
                </Typography>
                <form
                    className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="mb-1 flex flex-col gap-6">
                        <div className="email">
                            <Typography
                                variant="h6"
                                color="blue-gray"
                                className="mb-1"
                            >
                                Your Email
                            </Typography>
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Invalid email address",
                                    },
                                }}
                                render={({ field }) => (
                                    <>
                                    <Input
                                        size="lg"
                                        placeholder="name@mail.com"
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        {...field}
                                        labelProps={{
                                            className:
                                            "before:content-none after:content-none",
                                        }}
                                        />
                                        {errors.email && (
                                            <span className="text-red-500 text-sm">
                                                {errors.email.message}
                                            </span>
                                        )}
                                        </>
                                )}
                            />
                        </div>
                        <div className="password">
                            <Typography
                                variant="h6"
                                color="blue-gray"
                                className="mb-1"
                            >
                                Password
                            </Typography>
                            <Controller
                                name="password"
                                control={control}
                                rules={{
                                    required: "Password is required",
                                    
                                }}
                                render={({ field }) => (
                                    <>
                                        <Input
                                            type="password"
                                            {...field}
                                            size="lg"
                                            placeholder="********"
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                                className:
                                                    "before:content-none after:content-none",
                                            }}
                                        />
                                        {errors.password && (
                                            <span className="text-red-500 text-sm">
                                                {errors.password.message}
                                            </span>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                    </div>

                    <Button className="mt-6" fullWidth type="submit">
                        Login
                    </Button>
                    <Typography
                        color="gray"
                        className="mt-4 text-center font-normal"
                    >
                        Already have an account?{" "}
                        <Link
                            to="/signup"
                            className="font-medium text-gray-900"
                        >
                            Sign Up
                        </Link>
                    </Typography>
                </form>
            </Card>
        </div>
    );
};

export default Login;
