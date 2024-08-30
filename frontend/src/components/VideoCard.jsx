import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Avatar,
    Tooltip,
} from "@material-tailwind/react";

const VideoCard = () => {
    return (
        <Card className="max-w-[300px] overflow-hidden">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none"
            >
                <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                    alt="ui/ux review check"
                />
            </CardHeader>
            <CardBody className="px-4 py-2">
                <Typography variant="paragraph" color="blue-gray">
                <Tooltip content="Natali Craig">
                        <Avatar
                            size="sm"
                            variant="circular"
                            alt="natali craig"
                            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
                            className="border-2 border-white hover:z-10"
                        />
                    </Tooltip>UI/UX Review Check
                </Typography>
            </CardBody>
            <CardBody className="px-4 py-0">
                <Typography variant="paragraph" color="blue-gray">
                    UI/UX Review Check 
                </Typography>
            </CardBody>
            <CardBody className="px-4 py-0">
                <Typography variant="paragraph" color="blue-gray">
                    UI/UX Review Check
                </Typography>
            </CardBody>
            {/* <CardFooter className="flex items-center justify-start bg-red-300 p-2">
                <div className="flex items-start justify-start ">
                    <Tooltip content="Natali Craig">
                        <Avatar
                            size="sm"
                            variant="circular"
                            alt="natali craig"
                            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
                            className="border-2 border-white hover:z-10"
                        />
                    </Tooltip>
                </div>
                <Typography className="font-normal">January 10</Typography>
            </CardFooter> */}
        </Card>
    );
};

export default VideoCard;
