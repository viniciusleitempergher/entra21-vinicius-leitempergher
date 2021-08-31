export function ManipulandoEventos() {
    function handleClick() {
        alert('Você clicou no botão!');
    }

    function handleMouseOver() {
        console.log('Você está passando pelo botão :D');
    }

    function handleMouseLeave() {
        console.log('Você está saindo do botão :C');
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log('Form enviado!');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" />
            <button
                onClick={handleClick}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
            >
                Clique!
            </button>
        </form>
    );
}