import React from "react";

import "./Message.css";

interface MessageProps {
	data: IMessage;
	timestamp?: string;
	className?: string;
	other?: boolean;
}


export interface IMessage {
	username: string;
	message: string;
	timestamp?: string;
}

export default function Message(props: MessageProps) {

	function parseTimestamp(timestamp: string | undefined) {
		const time = new Date(timestamp?? Date.now());
		return `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`;
	}

	return (
		<div className={`message card ${props?.className?? ""} ${props?.other? "bg-white ms-4 text-end" : "bg-secondary text-white me-4"}`}>
			<div className="message__message">
				{ props.data.message }
			</div>
			<div className={`message__time ${props?.other? "text-end" : "text-start"}`}>
				{ props.data.username } { parseTimestamp(props.data.timestamp) }
			</div>
		</div>
	);
}
