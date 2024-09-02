import { IconButton } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { ButtonGroup, Button } from "@material-tailwind/react";
import { postRequest } from "../utils/FetchAPI";
const RefreshToken = () => {

    const refreshToken = async () => {
        try {
            const response = await postRequest("/users/refresh-token")
            console.log(response);

        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className="flex justify-center items-center w-full " >
                <ButtonGroup>
                    <Button onClick={refreshToken}>Refresh Token</Button>
                </ButtonGroup>
        </div>
    );
};

export default RefreshToken;
