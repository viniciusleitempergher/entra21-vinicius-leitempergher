export function Aluno(props) {
    const situacao = props.media >= 6 ? "Aprovado" : "Reprovado";
    return (
        <>
            <h2>{props.nome}</h2>
            <p>{props.media}</p>
            <p><strong>Situação: </strong> {situacao}</p>
        </>
    );
}