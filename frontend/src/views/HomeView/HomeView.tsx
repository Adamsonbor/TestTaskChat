import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './HomeView.css';

import { getCookie } from '../../utils/utils';
import { IMessage } from '../../components/Chat/Message/Message';
import { IUser } from '../../components/ChatUserCard/ChatUserCard';

import Chat from '../../components/Chat/Chat';
import Friends from '../../components/Friends/Friends';


let socket: WebSocket;


export default function HomeView() {
	const navigate = useNavigate();
	const [ messages, setMessages ] = useState<IMessage[]>([]);
	const [ friends, setFriends ] = useState<IUser[]>([]);
	const [selectedUser, setSelectedUser] = useState<string>("server_fastapi_chat_global_bot");

	// get message history from server by clicking on user
	function onClickUser(username: string) {
		setMessages(getMessageHistory(username));
	}

	function getMessageHistory(username: string = 'test') {
		return []
	}

	// send message to server
	function sendMessage(message: string) {
		if (getUsername() === undefined) return;
		if (message === '' || message.replace(/^\s+|\s+$/g, '') === '') return;

		if (socket && socket.readyState === WebSocket.OPEN) {
			const data: any = {
				"data": {
					'username': getCookie('username'),
					'message': message,
					'timestamp': new Date().getTime().toString()
				}
			};
			// if global bot is selected, send message to global chat
			if (selectedUser !== 'server_fastapi_chat_global_bot') data.to = selectedUser;
			socket.send(JSON.stringify(data));
		}
	}

	// get username from cookie or redirect to login
	function getUsername(): string | undefined {
		if (getCookie('username') === undefined) {
			console.log('redirecting to login');
			navigate('/login');
			return;
		}
		return getCookie('username');
	}

	// check if user is logged in
	// if not, redirect to login
	// set up socket
	// get friends
	useEffect(() => {
		socket = new WebSocket("ws://localhost:8080/ws/chat/" + getUsername());
	}, []);

	// set up socket
	useEffect(() => {
		socket.onmessage = function(event: any) {
			// parse message
			const data = JSON.parse(event.data);
			// new user joined
			if (data.from === "server_fastapi_chat_new_user") {
				console.log(data.data);
				setFriends([...data.data, {"username": "server_fastapi_chat_global_bot"}]);
				return;
			}
			// user left
			if (data.from === "server_fastapi_chat_user_left") {
				setFriends((friends) => friends.filter((friend: any) => { return friend.username !== data.data.username }));
				return;
			}
			// new message
			setMessages((messages) => [...messages, data.data]);
			console.log(messages);
		};
		socket.onopen = function() { console.log('Соединение установлено.'); };
		socket.onclose = function(event: any) {
			if (event.wasClean) { console.log('Соединение закрыто чисто'); }
			else { console.log('Обрыв соединения'); }
		};
		socket.onerror = function(error: any) { console.log('Ошибка ' + error.message); };
	}, [messages]);

	return (
		<div>
			<div className='home-view__container d-flex justify-content-end p-3'>
				<Chat 
					messages={ messages }
					sendMessage={ sendMessage }
					className='col-md-8 h-100'/>
				<div className='col-md-4 h-100'>
					<Friends
						selectedUser={selectedUser}
						setSelectedUser={setSelectedUser}
						onClick={onClickUser}
						friends={friends}/>
				</div>
			</div>
		</div>
	);
}
