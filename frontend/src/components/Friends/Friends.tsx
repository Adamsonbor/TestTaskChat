import React from 'react';
import { useState } from 'react';
import './Friends.css';

import ChatUserCard from '../ChatUserCard/ChatUserCard';
import { IUser } from '../ChatUserCard/ChatUserCard';
import { getCookie } from '../../utils/utils';

interface IFriendsProps {
	friends: IUser[] | null;
	onClick: (username: string) => void;
	selectedUser: string;
	setSelectedUser: (username: string) => void;
}

export default function Friends(props: IFriendsProps) {
	return (
		<div className='d-flex flex-column gap-2'>
			{
				props.friends?.map((friend: IUser, index: number) => {
					if (friend.username === getCookie('username') || friend.username == 'undefined') return;
					return (
						<ChatUserCard
							className={`friends__user-card ${props.selectedUser === friend.username ? 'friends__user-card--selected' : ''}`}
							onClick={() => {props.onClick(friend.username); props.setSelectedUser(friend.username); console.log(friend.username);}}
							key={index}
							user={friend} />
					);
				})
			}
		</div>
	);
}
