import React from 'react';
import { useState, useRef, useEffect } from 'react';
import './Chat.css';

import { IMessage } from './Message/Message';

import { getCookie } from '../../utils/utils';
import TextInput from '../TextInput/TextInput';
import Message from './Message/Message';

interface ChatComponentProps {
	messages: IMessage[];
	sendMessage: (message: string) => void;
	onKeyDown?: (e: any) => void;
	className?: string;
	header?: string;
}

export default function ChatComponent(props: ChatComponentProps) {
	const chat_messages = useRef<HTMLDivElement>(null);
	const [ message, setMessage ] = useState<string>('');

	function keyDown(e: any) {
		if (e.key === 'Enter') {
			props.sendMessage(message);
			setMessage('');
		}
	}

	useEffect(() => {
		chat_messages.current?.scrollTo({
			top: chat_messages.current?.scrollHeight,
			behavior: 'smooth'
		});
	}, [props.messages]);


	return (
		<div className={`chat-component px-3 py-0 ${props?.className}`}>
			<div className='chat-component__messages card mb-3' ref={chat_messages}>
				{
					props.messages.map((data: IMessage, index: number) => {
						return (
							<Message
								className='mb-3 mx-2 p-2 shadow'
								key={ index }
								other={ data.username !== getCookie("username") }
								data={ data }/>
						);
					})
				}
			</div>
			<div className='chat-component__form d-flex'>
				<TextInput
					value={ message }
					onChange={ (e: any) => setMessage(e.target.value) }
					onKeyDown={ props.onKeyDown?? keyDown }
					autoFocus={ true }
					placeholder='Type message ...'
					className='chat-component__form-input rounded-0 rounded-start'/>
				<button
					onClick={ () => {
						props.sendMessage(message);
						setMessage('');
					}}
					className='btn btn-outline-secondary rounded-0 rounded-end'>send</button>
			</div>
		</div>
	);
}
