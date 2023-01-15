import Chats from "./Chats";
import React, { useRef } from "react";
import { HiOutlinePaperClip, HiPaperAirplane } from "react-icons/hi";
import { useSnapshot } from "valtio";
import { actions, state } from "../../state";

export default function Chat({ src, online, name }) {

	const newMsgRef = useRef(null);
	const { me, messages, currentConversation } = useSnapshot(state);
	console.log('MESSAGES FROM SNAP', messages);
	//const [reciever, setReciever] = useState()

	// const getReciever = () => {

	//   if (currentConversation.members.find((id) => id !== me._id)) {
	//     setReciever(id)
	//   }
	// }



	const sendMessage = async (e) => {

		e.preventDefault();
		if (!newMsgRef.current.value) return;

		const message = {
			conversation: currentConversation?._id,
			sender: me._id,
			reciever: (currentConversation.members?.find((m) => m._id.toString() !== me._id.toString()))._id,
			message: newMsgRef.current.value,

		};

		try {

			console.log('CUURENT CONVERSATION', currentConversation)
			console.log('MESSAGE TO BE SENT', message)
			actions.sendMessage(message);

			//   console.log(state.socket)
			// if (socket && socket.connected) {
			// 	console.log('message in state before',message)
			// 	state.socket.emit('send_message', message)
			//}

		} catch (e) {
			console.log(e)
		}
		newMsgRef.current.value = ''

	}


	// useEffect(()=>{
	//   if (socket && socket.connected) {
	//     console.log('SOCKET STATE', socket.connected)
	//     socket.on('recieve_message', (message) => {
	//       actions.setMessage(message)
	//       console.log('MESSAGE Server', message);
	//     })
	//   }
	// }, [socket])

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
								className={`w-3 h-3  rounded-full left-10 ml-3 ${online ? "bg-green-400" : "bg-red"
									}`}
							></span>
							<small className=" ml-2 text-gray-900">
								{online ? "Online" : "offline"} <br />{" "}
							</small>
						</p>
					</div>
				</div>

				{/* Chart messages */}
				<Chats messages={messages} />

				<div className="bg-miingo-gray sticky bottom-16 lg:bottom-0 flex items-center justify-between w-full p-3 border-t border-gray-300 rounded-t-lg">
					{/* left */}
					<div className="flex items-center justify-between px-2 md:px-4 space-x-2 flex-grow bg-white  rounded-full text-sm shadow-lg overflow-hidden ">
						<input
							ref={newMsgRef}
							type="text"
							placeholder="Type a message"
							className="h-full py-3 placeholder-blueGray-300 text-blueGray-600  outline-none focus:outline-none"
							required
						/>

						<HiOutlinePaperClip className="w-5 h-5 cursor-pointer " />

					</div>

					{/* right */}
					<div className=" p-2 flex items-center justify-center space-x-3">

						<button
							onClick={sendMessage}
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
