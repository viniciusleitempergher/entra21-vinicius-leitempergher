import './App.css';
import { Card } from './components/Card';
import { Familia } from './components/Familia';
import { FirstComponent } from './components/FirstComponent';
import { ListaAlunos } from './components/ListaAlunos';
import { ManipulandoEventos } from './components/ManipulandoEventos';
import { MembroFamilia } from './components/MembroFamilia';
import { Relogio } from './components/Relogio';
import { ValorAleatorio } from './components/ValorAleatorio';
import { WithProps } from './components/WithProps';
import { ComponentesControlados } from './components/ComponentesControlados';
import { Contador } from './components/Contador';

function App() {
  return (
    <div className="App">
      <h1>Hello, World!</h1>
      <div className="cards">
        <Card titulo='Primeiro Componente' cor='#BABACA'>
          <FirstComponent />
        </Card>

        <Card titulo='Componente com Props'>
          <WithProps message='AOBA' />
        </Card>

        <Card titulo='Lista de Alunos'>
          <ListaAlunos />
        </Card>

        <Card titulo='Children'>
          <Familia sobrenome='Leite'>
            <MembroFamilia nome='Vini' />
          </Familia>
        </Card>

        <Card titulo='Manipulando Eventos'>
          <ManipulandoEventos />
        </Card>

        <Card titulo='States'>
          <Relogio />
          <ValorAleatorio max={100} />
        </Card>

        <Card titulo="Componentes Controlados">
          <ComponentesControlados />
        </Card>

        <Card titulo='State Assíncrono'>
          <Contador />
        </Card>
      </div>
    </div>
  );
}

export default App;
