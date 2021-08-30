import './styles.css';

export function FirstComponent() {
    const msg = ":D";
    return (
        <>
            <h2>Primeiro Componente</h2>
            <p className="emoji">{msg}</p>
        </>
    );
}