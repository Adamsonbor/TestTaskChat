export default function TextInput(props: any) {

	return (
		<input
			className={ `form-control ${props?.className}` }
			value={ props?.value?? "" }
			autoFocus={ props?.autoFocus?? false }
			onChange={ props?.onChange?? (() => console.error("onChange does not exist")) }
			onKeyDown={ props?.onKeyDown?? props?.onChange?? (() => console.error("onKeyDown does not exist"))}
			type="text"
			placeholder={ props?.placeholder?? "Type message ..." }/>
	);
}
