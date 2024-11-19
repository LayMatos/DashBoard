// App.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBox } from 'react-icons/fa';
import { FaMap } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import MapDesenho from '../components/MapaDesenho'; // Importe corretamente o MapDesenho
import MapComponent from '../components/MapaReal'; // Importe corretamente o MapComponent
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// Dados para gráficos e outras variáveis (mantenha como estão)

const dataCautela = [
  { name: 'Cautelado', value: 40 },
  { name: 'Descautelado', value: 30 },
  { name: 'Aguardando Assinatura', value: 30 },
];

const dataEntrega = [
  { name: 'Assinados', value: 50 },
  { name: 'Aguardando Assinatura', value: 50 },
];

const dataCidadeEquipamentos = [
  { cidade: 'Cidade A', entregues: 30, cautelados: 10 },
  { cidade: 'Cidade B', entregues: 50, cautelados: 20 },
  { cidade: 'Cidade C', entregues: 40, cautelados: 30 },
  { cidade: 'Cidade D', entregues: 20, cautelados: 15 },
  { cidade: 'Cidade E', entregues: 35, cautelados: 25 },
];

const App = () => {
  const [municipiosSelecionados, setMunicipiosSelecionados] = useState([]);
  const [cidadeSelecionada, setCidadeSelecionada] = useState(null);
  const [activeButton, setActiveButton] = useState("estoque");

   // Definindo o estado para controlar o mapa selecionado e a função de troca
   const [selectedMap, setSelectedMap] = useState("mapDesenho"); // Definindo mapDesenho como valor inicial

   const handleGroupClick = (municipioNome) => {
     const municipio = dataCidadeEquipamentos.find(item => item.cidade === municipioNome);
     if (municipio) {
       setMunicipiosSelecionados(prev => [...prev, municipio]);
       setCidadeSelecionada(municipio);
     }
   };
 
   const handleMapSwitch = (mapType) => {
     setSelectedMap(mapType); // Função para alternar entre os mapas
   };

  const cidadeDataEquipamentos = cidadeSelecionada ? 
    [{ cidade: cidadeSelecionada.cidade, entregues: cidadeSelecionada.entregues, cautelados: cidadeSelecionada.cautelados }] : [];

  return (
    <div className="min-h-screen flex flex-col bg-[#E3EEFF]">
      <main className="flex-grow p-4 flex flex-wrap">
        {/* Lado esquerdo */}
        <div className="w-full md:w-1/4 space-y-6">
          <div className="bg-white p-4 shadow-md rounded-lg flex flex-col items-center">
            <h3 className="font-bold text-lg mb-4 text-center">Termos de Cautela</h3>
            <PieChart width={250} height={250}>
              <Pie data={dataCautela} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                {dataCautela.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#00C49F', '#FF8042', '#FFBB28'][index]} />
                ))}
              </Pie>
              <Legend verticalAlign="top" align="center" layout="horizontal" />
            </PieChart>
          </div>

          {/* Gráfico Cascata */}
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="font-bold text-lg mb-2 text-center">Equipamentos Entregues</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cidadeDataEquipamentos.length ? cidadeDataEquipamentos : dataCidadeEquipamentos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="cidade" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="entregues" fill="#8884d8" />
                <Bar dataKey="cautelados" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mapa de Mato Grosso */}
        <div className="flex flex-col items-center w-full md:w-1/2">
          <div className="flex justify-center p-4 absolute top-20 left-1/2 transform -translate-x-1/2 z-10">
            <Link to="/estoque">
              <button
                onClick={() => setActiveButton("estoque")}
                className={`flex justify-center items-center p-3 rounded-full transition duration-300 ease-in-out 
                ${activeButton === "estoque" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
              >
                <FaBox size={24} /> {/* Ícone para o botão estoque */}
              </button>
            </Link>
          </div>
          <div className="relative w-full h-full mt-4">
  {/* Título e Botões alinhados ao lado */}
  <div className="flex items-center justify-center">
    <h1 className="text-2xl font-bold px-2 mr-4">Distribuição por CR</h1> {/* Título */}
    <div className="flex space-x-4">
      <button
        onClick={() => handleMapSwitch("mapDesenho")}
        className={`px-4 py-2 rounded-lg transition duration-300 ease-in-out 
          ${selectedMap === "mapDesenho" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
      >
         <FaMap size={24} /> {/* Ícone para o botão estoque */}
      </button>
      <button
        onClick={() => handleMapSwitch("mapComponent")}
        className={`px-4 py-2 rounded-lg transition duration-300 ease-in-out 
          ${selectedMap === "mapComponent" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
      >
         <FaMapMarkedAlt  size={24} /> {/* Ícone para o botão estoque */}
      </button>
    </div>
  </div>

  {/* Componente do Mapa com base na seleção */}
  <div className="relative w-full mt-[20px]"> {/* Aumentando a margem superior para garantir que os botões não sobreponham o mapa */}
    {selectedMap === "mapDesenho" ? (
      <div className="relative w-full h-full"> {/* Sem altura fixa para MapDesenho */}
        <MapDesenho onHover={(municipioNome) => console.log(`Hovered: ${municipioNome}`)} onClick={handleGroupClick} />
      </div>
    ) : (
      <div className="h-[640px] mx-4"> {/* Altura fixa para MapComponent */}
        <MapComponent onHover={(municipioNome) => console.log(`Hovered: ${municipioNome}`)} onClick={handleGroupClick} />
      </div>
    )}
  </div>
</div>




</div>

      {/* Lado direito */}
      <div className="w-full md:w-1/4 space-y-6 mt-6 md:mt-0">
          {/* Card 1: Gráfico Biscoito Entrega */}
          <div className="bg-white p-4 shadow-md rounded-lg flex flex-col items-center justify-center">
            <h3 className="font-bold text-lg mb-4 text-center">Termos de Entrega</h3>
            <PieChart width={250} height={250}>
              <Pie data={dataEntrega} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                {dataEntrega.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#00C49F', '#FF8042'][index]} />
                ))}
              </Pie>
              <Legend verticalAlign="top" align="center" layout="horizontal" />
            </PieChart>
          </div>

          {/* Card 2: Gráfico Cascata Equipamentos Entregues */}
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="font-bold text-lg mb-2 text-center">Equipamentos Entregues</h3>
            {/* Gráfico Cascata */}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cidadeDataEquipamentos.length ? cidadeDataEquipamentos : dataCidadeEquipamentos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="cidade" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="entregues" fill="#8884d8" />
                <Bar dataKey="cautelados" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>

      {/* Gráfico de Barras abaixo de todos os gráficos */}
      <div className="w-full mt-6 p-4 mb-8">
        <h3 className="font-bold text-xl mb-4 text-center">Equipamentos Entregues e Cautelados por Cidade</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dataCidadeEquipamentos}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="cidade" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="entregues" fill="#8884d8" />
            <Bar dataKey="cautelados" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default App;
