import React from 'react';
import './Friends.css';

import ChatUserCard from '../ChatUserCard/ChatUserCard';
import { IUser } from '../ChatUserCard/ChatUserCard';

interface IFriendsProps {
	friends: IUser[];
	onClick: (username: string) => void;
}

export default function FriendsComponent(props: IFriendsProps) {
	return (
		<div className='d-flex flex-column gap-2'>
			{
				props.friends.map((friend: IUser, index: number) => {
					return (
						<ChatUserCard
							className='friends__user-card'
							onClick={props.onClick}
							key={index}
							user={friend} />
					);
				})
			}
		</div>
	);
}
