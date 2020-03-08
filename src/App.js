import React, { useEffect, useState } from "react";
import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";
import "./services/api";
import DevItem from "./components/DevItem";
import DevForm from "./components/DevForm";
import api from "./services/api";
//Componente: Bloco isolado de jsx que não interfere no restante da aplicação
//Propriedade: Props
//Estado: Valores correspondente ao momento atual de um componente
function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs");
      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const { github_username, techs, latitude, longitude } = data;
    const response = await api.post("/devs", {
      github_username,
      techs,
      latitude,
      longitude
    });
    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
