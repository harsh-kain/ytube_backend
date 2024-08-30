import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { postRequest } from "../utils/FetchAPI";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const SignUp = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            fullName: "",
            username: "",
            email: "",
            password: "",
            avatar: "",
            coverimage: "",
        },
    });
    const parseErrorMessage = (htmlString) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const preElement = doc.querySelector('pre');
        if (preElement) {
            // Extract the text content of the <pre> element
            const fullErrorText = preElement.textContent || '';
            
            // Use regex to capture everything before the " at " or new line
            const errorMessageMatch = fullErrorText.match(/^(.*?)(\s+at\s|\n)/);
            
            // If a match is found, return the first capture group (the main error message)
            if (errorMessageMatch && errorMessageMatch.length > 1) {
                return errorMessageMatch[1].replace('Error: ', '').trim();
            }
        }
        return "Unknown error occurred";
    };
    const [ava, setAva] = useState(null);
    const [cover, setCover] = useState(null);

    const handleAvatar = (e) => {
        setAva(e.target.files[0]);
    };

    const handleCoverImage = (e) => {
        setCover(e.target.files[0]);
    };
    const onSubmit = async (data) => {
        const { fullName, username, password, email } = data;

        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        if (ava) formData.append("avatar", ava); 
        if (cover) formData.append("coverImage", cover); 

        try {
            const response = await postRequest(
                "/users/register",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(response);
            toast.success(`Signup Successfully`);
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
            <ToastContainer />
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Sign Up
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Nice to meet you! Enter your details to register.
                </Typography>
                <form
                    className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="mb-1 flex flex-col gap-3">
                        <div className="fullname">
                            <Typography
                                variant="h6"
                                color="blue-gray"
                                className="mb-1"
                            >
                                FullName
                            </Typography>
                            <Controller
                                name="fullName"
                                control={control}
                                rules={{ required: "Fullname is required" }}
                                render={({ field }) => (
                                    <>
                                        <Input
                                            size="lg"
                                            {...field}
                                            placeholder="William Jhonson "
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                                className:
                                                    "before:content-none after:content-none",
                                            }}
                                        />
                                        {errors.fullName && (
                                            <span className="text-red-500 text-sm">
                                                {errors.fullName.message}
                                            </span>
                                        )}
                                    </>
                                )}
                            />
                        </div>

                        <div className="username">
                            <Typography
                                variant="h6"
                                color="blue-gray"
                                className="mb-1"
                            >
                                Username
                            </Typography>
                            <Controller
                                name="username"
                                control={control}
                                rules={{ required: "Username is required" }}
                                render={({ field }) => (
                                    <>
                                        <Input
                                            size="lg"
                                            {...field}
                                            placeholder="williamjhonson"
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                                className:
                                                    "before:content-none after:content-none",
                                            }}
                                        />
                                        {errors.username && (
                                            <span className="text-red-500 text-sm">
                                                {errors.username.message}
                                            </span>
                                        )}
                                    </>
                                )}
                            />
                        </div>

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
                                            {...field}
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
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
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Password must be at least 6 characters long",
                                    },
                                    pattern: {
                                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                                        message:
                                            "Password must contain at least one letter and one number",
                                    },
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
                        <div className="avatar">
                            <Typography
                                variant="h6"
                                color="blue-gray"
                                className="mb-1"
                            >
                                Avatar
                            </Typography>

                            <div className="mb-3 w-96">
                                <input
                                    className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                                    type="file"
                                    id="avatar"
                                    onChange={handleAvatar}
                                />
                            </div>
                        </div>
                        <div className="coverimage">
                            <Typography
                                variant="h6"
                                color="blue-gray"
                                className="mb-1"
                            >
                                Cover Image (
                                <span className="text-black text-sm">
                                    Optional
                                </span>
                                )
                            </Typography>

                            <div className=" w-96">
                                <input
                                    className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                                    type="file"
                                    id="coverimage"
                                    onChange={handleCoverImage}
                                />
                            </div>
                        </div>
                    </div>

                    <Button className="mt-6" fullWidth type="submit">
                        sign up
                    </Button>
                    <Typography
                        color="gray"
                        className="mt-4 text-center font-normal"
                    >
                        Already have an account?{" "}
                        <Link to="/login" className="font-medium text-gray-900">
                            Sign In
                        </Link>
                    </Typography>
                </form>
            </Card>
        </div>
    );
};

export default SignUp;
