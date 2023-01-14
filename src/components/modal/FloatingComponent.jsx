import React from "react";

const CustomFloatingButtons = ({ icon, onClick, bg_color }) => {
	return (
		<div
			onClick={onClick}
			className={`flex justify-center items-center rounded-full h-8 w-8 shadow-lg my-4   z-90 bg-white ${bg_color}`}
		>
			{icon}
		</div>
	);
};

export default CustomFloatingButtons;
