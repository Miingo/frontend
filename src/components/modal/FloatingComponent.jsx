import React from "react";
import { FloatingButton, Item } from "react-floating-button";
import { AiFillAudio } from "react-icons/ai";

const FloatingComponent = () => {
	return (
		<>
			<FloatingButton>
				  
				<Item
					imgSrc={<AiFillAudio />}
					onClick={() => {
						console.log("callback function here");
					}}
				/>
				  
				<Item
					imgSrc={<AiFillAudio />}
					onClick={() => {
						console.log("callback function here");
					}}
				/>
			</FloatingButton>
		</>
	);
};

export default FloatingComponent;
