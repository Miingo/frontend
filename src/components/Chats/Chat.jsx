import Charts from "./Chats";
import React from "react";
import { HiOutlinePaperClip, HiPaperAirplane } from "react-icons/hi";
import CustomFloatingButtons from "../modal/FloatingComponent";
import {
	AiFillAudio,
	AiFillFile,
	AiTwotoneCamera,
	AiOutlineUser,
} from "react-icons/ai";

const { useState } = React;

export default function Chat({ src, online, name }) {
	const [openFloat, setOpenFloat] = useState(false);
	const data = [
		{
			icon: <AiFillAudio className="w-5 h-5  text-white" />,
			bg: "bg-regal-orange",
		},
		{
			icon: <AiFillFile className="w-5 h-5  text-white" />,
			bg: "bg-miingo-pink",
		},
		{
			icon: <AiTwotoneCamera className="w-5 h-5  text-white" />,
			bg: "bg-main",
		},
		{
			icon: <AiOutlineUser className="w-5 h-5  text-white" />,
			bg: "bg-buttonGreen",
		},
	];

	const handleOpenFloat = () => {
		setOpenFloat(!openFloat);
	};

	return (
		<div className="relative flex flex-col flex-grow  mx-2  mt-2">
			<div className="sticky top-20 flex flex-col space-y-2 ">
				<div className=" flex  items-center p-3 mb-4 shadow-md rounded-md">
					<img
						className="object-cover w-10 h-10 rounded-full"
						src={src}
						alt="username"
					/>
					<div>
						<h1 className=" ml-2 font-bold text-gray-600">
							{name} <br />{" "}
						</h1>
						<p className="flex items-center space-x-2">
							<span
								className={`w-3 h-3  rounded-full left-10 ml-3 ${
									online ? "bg-green-400" : "bg-red"
								}`}
							></span>
							<small className=" ml-2 text-gray-900">
								{online ? "Online" : "offline"} <br />{" "}
							</small>
						</p>
					</div>
				</div>

				{/* Chart messages */}
				<Charts src={src} />

				<div className="bg-miingo-gray sticky bottom-16 lg:bottom-0 flex items-center justify-between w-full p-3 border-t border-gray-300 rounded-t-lg">
					{/* left */}
					<div className="flex items-center justify-between px-2 md:px-4 space-x-2 flex-grow bg-white  rounded-full text-sm shadow-lg overflow-hidden ">
						<input
							type="text"
							placeholder="Type a message"
							className="h-full py-3 placeholder-blueGray-300 text-blueGray-600  outline-none focus:outline-none"
							required
						/>

						<div>
							<div className="relative ">
								<CustomFloatingButtons
									onClick={handleOpenFloat}
									icon={
										<HiOutlinePaperClip className="w-5 h-5 cursor-pointer text-white" />
									}
									bg_color="mr-0 inset-0 bg-red"
								/>
							</div>

							{openFloat && (
								<div className="absolute right-18 bottom-16  transition ease-in-out delay-150">
									{data.map((dta) => (
										<CustomFloatingButtons
											key={dta}
											icon={dta.icon}
											bg_color={`mr-0 inset-0 ${dta.bg}`}
										/>
									))}
								</div>
							)}
						</div>
					</div>

					{/* right */}
					<div className=" p-2 flex items-center justify-center space-x-3">
						<button
							className={`focus:outline-none outline-none border-none cursor-pointer 
                active:scale-90  rounded-full hover:bg-lightgraybg p-2 transition ease-in-out
                 duration-300
              `}
						>
							<HiPaperAirplane className="w-5 h-5 rotate-90" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
