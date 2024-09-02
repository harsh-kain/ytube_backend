import { Card, CardHeader, CardBody, CardFooter, Typography, Avatar, Tooltip } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const VideoCard = ({ data }) => {
    return (
        <>
            {data?.map((val) => (
                <Link to={`/videos/${val?._id}`} key={val.title}>
                    <Card className="w-[300px] overflow-hidden m-[.5rem] cursor-pointer" key={val?.title}>
                        <CardHeader floated={false} shadow={false} color="transparent" className="m-0 rounded-none ">
                            <img src={val.thumbnail} alt={val.title} className="w-full h-[150px] object-cover" />
                        </CardHeader>
                        <CardBody className="px-4 py-2">
                            <Typography variant="paragraph" color="blue-gray">
                                <Avatar size="sm" variant="circular" alt="natali craig" src={val?.owner?.avatar} className="border-2 border-white hover:z-10" />
                                {val.title}
                            </Typography>
                        </CardBody>
                        <CardBody className="px-4 py-2">
                            <Typography variant="paragraph" color="blue-gray">
                                {val?.owner?.username}
                            </Typography>
                            <Typography variant="paragraph" color="blue-gray">
                                {val.views} Views • 1 day to ago
                            </Typography>
                        </CardBody>
                    </Card>
                </Link>
            ))}
        </>
    );
};

export default VideoCard;
