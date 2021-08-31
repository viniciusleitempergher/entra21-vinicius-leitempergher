import React from 'react';

export class ValorAleatorio extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            valor: 0
        }
    }

    handleClick = () => {
        const valorAleatorio = parseInt(Math.random() * (this.props.max - this.props.min) + this.props.min)
        this.setState({ valor: valorAleatorio });
    }

    render() {
        return (
            <>
                <p>{this.state.valor}</p>
                <button onClick={this.handleClick}>Gerar Valor</button>
            </>
        )
    }
}

ValorAleatorio.defaultProps = {
    min: 0,
    max: 10
};