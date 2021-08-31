export function ParOuImpar(props) {
	return (
		<>
			{
				props.numero % 2 === 0 ?
					<p>Par</p>
					:
					<p>Ímpar</p>
			}
		</>
	);
}