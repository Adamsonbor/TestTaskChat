export function getCookie(name: string) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop()?.split(';').shift();
}

export function setCookie(name: string, value: string, seconds: number) {
	const d = new Date();
	d.setTime(d.getTime() + (seconds*1000));
	const expires = `expires=${d.toUTCString()}`;
	document.cookie = `${name}=${value};${expires};path=/`;
}
