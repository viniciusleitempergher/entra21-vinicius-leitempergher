import React from 'react';

export class ComponentesControlados extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nome: '',
            email: '',
            cpf: '',
            sexo: ''
        }
    }

    handleChange = e => {
        const value = e.target.value;
        const name = e.target.name;

        this.setState({ [name]: value });
        console.log(this.state);
    }

    render() {
        return (
            <form>
                <label>
                    Nome:
                    <input type="text" name='nome' />
                </label>
                <label>
                    Email:
                    <input type="email" name='email' />
                </label>
                <label>
                    CPF:
                    <input type="" name='cpf' />
                </label> <br />
                <label>
                    <input type="radio" name="sexo" value='feminino' onChange={this.handleChange} /> Fem.
                </label>
                <label>
                    <input type="radio" name="sexo" value='masculino' onChange={this.handleChange} /> Masc.
                </label> <br />
                <select name="cidade" onChange={this.handleChange}>
                    <option value="blumenau" defaultChecked>Blumenau</option>
                    <option value="timbo">Timbó</option>
                    <option value="indaial">Indaial</option>
                </select>
                <button>Enviar</button>
            </form>
        )
    }
}