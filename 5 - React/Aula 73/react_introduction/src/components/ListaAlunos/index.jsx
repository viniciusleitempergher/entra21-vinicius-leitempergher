import { Aluno } from "../Aluno";

export function ListaAlunos() {
  const alunos = [
    { id: 1, nome: 'Pedro', media: 10 },
    { id: 2, nome: 'José', media: 5 },
    { id: 3, nome: 'Flavo', media: 9.5 }
  ];

  return (
    <>
      {
        alunos.map(v => {
          return (
            <Aluno nome={v.nome} media={v.media} key={v.id} />
          )
        })
      }
    </>
  )
}