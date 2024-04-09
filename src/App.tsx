import { useState } from "react";
import axios from "axios";
import "./App.css";

const ListaDeTarefas = (props: any) => {
  return (
    <>
      <h4>Tarefas como lista de objetos</h4>
      <ul>
        {
          props.dados.map((item: any) => {
            return <ItemTarefa key={item.id} titulo={item.titulo} />
          })
        }
      </ul>
    </>
  );
}

const ItemTarefa = (props: any) => {
  return (<li>{props.titulo}</li>);
}

const App = () => {
  const [tarefa, setTarefa] = useState("digite uma tarefa");

  const [tarefas, setTarefas] = useState([
    {
      id: 1,
      titulo: "criar interface react",
      concluido: false,
    },
    {
      id: 2,
      titulo: "conectar a uma  api",
      concluido: false,
    },
    {
      id: 3,
      titulo: "aprender sobre autenticação",
      concluido: false,
    },
  ]);
  
  // const escutarCliqueAcessarAPI =() =>{
  //   console.log("clicou");
  //   const dados_da_api = axios.get("https://jsonplaceholder.typicode.com/todos")
  //     .then((resposta) => {
  //       console.log(resposta);
  //     });
  // }

  const escutarCliqueAcessarAPI =() =>{
    console.log("clicou");
    const dados_da_api = axios.get("https://jsonplaceholder.typicode.com/todos")
      .then((resposta: any) => {
        //resposta http
        console.log(resposta);
        //Converter http no formato de nossa lista
        const dados = resposta.data.map((item: any) => {
          return{
            id: item.id,
            titulo: item.title,
            concluido: item.completed
          };
        });
        console.log(dados);
        setTarefas(dados);
      });
  }

  const escutarCliqueBotao = () => {
    console.log("clicou");
    console.info(tarefa);
    const objeto = {
      id: tarefas.length + 1,
      titulo: tarefa,
      concluido: false,
    }
    console.info(objeto);
    // tarefas.push(objeto);
    setTarefas([
      ...tarefas,
      objeto
    ]);
  }
  const escutarModificacaoTexto = (evento: any) => {
    setTarefa(evento.target.value);
  }

  return (
    <div className="aplicacao">
      <h1>Infoweb - React</h1>
      <div>
        <label htmlFor="tarefa">Informe a nova tarefa: </label>
        <input type="text" id="tarefa" value={tarefa} onChange={escutarModificacaoTexto} />
        <button onClick={escutarCliqueBotao}>Criar nova tarefa</button>
      </div>
      <div>
        <button onClick={escutarCliqueAcessarAPI}>Teste API</button>
      </div>
      <ListaDeTarefas dados={tarefas}/>
    </div>
  );
}

export default App;
