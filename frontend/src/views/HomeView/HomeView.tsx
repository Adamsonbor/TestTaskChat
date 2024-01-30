import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './HomeView.css';

import { getCookie } from '../../utils/utils';
import { IMessage } from '../../components/Chat/Message/Message';
import { IUser } from '../../components/ChatUserCard/ChatUserCard';

import Chat from '../../components/Chat/Chat';
import Friends from '../../components/Friends/Friends';

export default function HomeView(props: any) {
	const navigate = useNavigate();
	const [ messages, setMessages ] = useState(getMessageHistory());

	function onClickUser(username: string) {
		setMessages(getMessageHistory(username));
	}

	function getFriends(): IUser[] {
		return [
			{
				username: 'test',
				online: true
			},
			{
				username: 'leha',
				online: false
			},
			{
				username: 'sergo',
				online: true
			},
			{
				username: 'sanya',
				online: false
			},
		];
	}


	function getMessageHistory(username: string = 'test') {
		return [
			{
				'username': username,
				'message': 'hello world'
			},
			{
				'username': 'other',
				'message': 'hello world'
			},
			{
				'username': username,
				'message': 'hello world'
			},
			{
				'username': 'other',
				'message': 'hello world'
			},
			{
				'username': username,
				'message': 'hello world'
			},
		]
	}

	function sendMessage(message: string) {
		if (getUsername() === undefined) return;
		if (message === '' || message.replace(/^\s+|\s+$/g, '') === '') return;

		const new_message: IMessage = {
			'username': getCookie('username') || 'anonymous',
			'message': message,
			'timestamp': new Date().toString()
		};
		setMessages([...messages.slice(-20), new_message]);
	}

	function getUsername(): string | undefined {
		if (getCookie('username') === undefined) {
			console.log('redirecting to login');
			navigate('/login');
			return;
		}
		return getCookie('username');
	}

	useEffect(() => {
		if (getCookie('username') === undefined) {
			console.log('redirecting to login');
			navigate('/login');
		}
	}, []);

	return (
		<div>
			<div className='home-view__container d-flex justify-content-end p-3'>
				<Chat 
					messages={ messages }
					sendMessage={ sendMessage }
					className='col-md-8 h-100'/>
				<div className='col-md-4 h-100'>
					<Friends
						onClick={onClickUser}
						friends={getFriends()}/>
				</div>
			</div>
		</div>
	);
}
