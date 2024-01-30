import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "./LoginView.css";

import { setCookie } from "../../utils/utils";
import TextInput from "../../components/TextInput/TextInput";


export default function LoginView() {
	const [name, setName] = useState("");
	const navigate = useNavigate();

	function keyPress(e: KeyboardEvent) {
		if (e.key === "Enter") {
			console.log("Enter pressed");
			setCookie("username", name, 3600);
			setName("");
			navigate("/");
		}
	}

	return (
		<div className="login-view w-100 d-flex justify-content-center align-items-center">
			<div className="col-md-4">
				<h1>Your name</h1>
				<div className="d-flex">
					<TextInput
						value={name}
						onChange={(e: any) => setName(e.target.value)}
						placeholder="Enter your name"
						onKeyDown={keyPress}
						className="rounded-0 rounded-start"/>
					<button className="btn btn-outline-secondary rounded-0 rounded-end">Submit</button>
				</div>
			</div>
		</div>
	);
}
