import './App.css';
import { Card } from './components/Card';
import { Familia } from './components/Familia';
import { FirstComponent } from './components/FirstComponent';
import { ListaAlunos } from './components/ListaAlunos';
import { MembroFamilia } from './components/MembroFamilia';
import { WithProps } from './components/WithProps';

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
      </div>
    </div>
  );
}

export default App;
