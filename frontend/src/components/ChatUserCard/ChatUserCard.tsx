import React from 'react';
import { useState } from 'react';
import './ChatUserCard.css';

export interface IUser {
	username: string;
	online?: boolean;
}

interface IChatUserCardProps {
	user: IUser;
	className?: string;
	onClick?: (username: string) => void;
}

export default function ChatUserCard(props: IChatUserCardProps) {
	return (
		<div
			onClick={props.onClick? () => props.onClick!(props.user.username) : undefined}
			className={`chat-user-card card p-2 ${props.className?? ""}`}>
			<div className='d-flex h-100 gap-2'>
				<div className='h-100'>
					<img
						className='chat-user-card__image w-100 h-100 rounded-circle border'
						src='https://cdn2.iconfinder.com/data/icons/delivery-and-logistic/64/Not_found_the_recipient-no_found-person-user-search-searching-4-512.png'
						alt='user' />
				</div>
				<div className='chat-user-card__username d-flex align-items-center'>
					{props.user.username}
				</div>
			</div>
		</div>
	);
}
