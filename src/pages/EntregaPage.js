import React, { useState } from 'react';
import '../App.css'; // Certifique-se de que o Tailwind está sendo importado aqui
import { Link } from 'react-router-dom';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import geoJson from '../data/geo-MT.json';
import gruposDeMunicipios from '../data/grupodeMunicipios';
import { FaBox } from 'react-icons/fa';
import { FaChartArea } from 'react-icons/fa';

// Dados para gráficos
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

const getMunicipiosPorCor = (municipioNome) => {
  if (gruposDeMunicipios.CR_1.includes(municipioNome)) return "#B8860B"; 
  if (gruposDeMunicipios.CR_2.includes(municipioNome)) return "#FF6347"; 
  if (gruposDeMunicipios.CR_3.includes(municipioNome)) return "#8B0000";
  if (gruposDeMunicipios.CR_4.includes(municipioNome)) return "#D2691E";
  if (gruposDeMunicipios.CR_5.includes(municipioNome)) return "#A0522D";  
  if (gruposDeMunicipios.CR_6.includes(municipioNome)) return "#000000"; 
  if (gruposDeMunicipios.CR_7.includes(municipioNome)) return "#6495ED";
  if (gruposDeMunicipios.CR_8.includes(municipioNome)) return "#008080"; 
  if (gruposDeMunicipios.CR_9.includes(municipioNome)) return "#FFD700"; 
  if (gruposDeMunicipios.CR_10.includes(municipioNome)) return "#20B2AA";
  if (gruposDeMunicipios.CR_11.includes(municipioNome)) return "#556B2F"; 
  if (gruposDeMunicipios.CR_12.includes(municipioNome)) return "#0000FF"; 
  if (gruposDeMunicipios.CR_13.includes(municipioNome)) return "#4169E1";
  if (gruposDeMunicipios.CR_14.includes(municipioNome)) return "#8B008B";    
  if (gruposDeMunicipios.CR_15.includes(municipioNome)) return "#006400"; 
  return "#D0D0D0"; // Cor padrão para municípios não classificados
};

function App() {
  const [municipiosSelecionados, setMunicipiosSelecionados] = useState([]);
  const [cidadeSelecionada, setCidadeSelecionada] = useState(null);
  const [activeButton, setActiveButton] = useState("estoque");

  const handleGroupClick = (municipioNome) => {
    const municipio = dataCidadeEquipamentos.find(item => item.cidade === municipioNome);
    if (municipio) {
      setMunicipiosSelecionados(prev => [...prev, municipio]);
      setCidadeSelecionada(municipio);
    }
  };

  const cidadeDataEquipamentos = cidadeSelecionada ? 
    [{ cidade: cidadeSelecionada.cidade, entregues: cidadeSelecionada.entregues, cautelados: cidadeSelecionada.cautelados }] : [];

  return (
    <div className="min-h-screen flex flex-col bg-[#E3EEFF]"> {/* Aqui está a adição do fundo */}
      {/* Corpo principal */}
      <main className="flex-grow p-4 flex flex-wrap">
        {/* Lado esquerdo */}
        <div className="w-full md:w-1/4 space-y-6">
          <div className="bg-white p-4 shadow-md rounded-lg flex flex-col items-center">
            <h3 className="font-bold text-lg mb-2 text-center">Termos de Cautela</h3>
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
            <h1 className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10 text-2xl font-bold mb-2">Distribuição por CR</h1>
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 2800, center: [-55.0, -12.5] }}
              style={{ width: "100%", height: "calc(100vh - 200px)" }}
            >
              <Geographies geography={geoJson}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const municipioNome = geo.properties.name;
                    const cor = getMunicipiosPorCor(municipioNome);
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={cor}
                        stroke="#FFF"
                        onClick={() => handleGroupClick(municipioNome)}
                        style={{
                          default: { outline: "none" },
                          hover: { fill: "#696969", outline: "none" },
                          pressed: { outline: "none" },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>

            {/* Legenda */}
            <div className="bg-white p-4 shadow-lg rounded-md w-3/4 mx-auto mt-4">
              <h4 className="font-bold text-center mb-4">Legenda</h4>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { color: "#B8860B", label: "CR 1" },
                  { color: "#FF6347", label: "CR 2" },
                  { color: "#8B0000", label: "CR 3" },
                  { color: "#D2691E", label: "CR 4" },
                  { color: "#A0522D", label: "CR 5" },
                  { color: "#000000", label: "CR 6" },
                  { color: "#6495ED", label: "CR 7" },
                  { color: "#008080", label: "CR 8" },
                  { color: "#FFD700", label: "CR 9" },
                  { color: "#20B2AA", label: "CR 10" },
                  { color: "#556B2F", label: "CR 11" },
                  { color: "#0000FF", label: "CR 12" },
                  { color: "#4169E1", label: "CR 13" },
                  { color: "#8B008B", label: "CR 14" },
                  { color: "#006400", label: "CR 15" },
                ].map((item) => (
                  <div className="flex items-center space-x-2" key={item.label}>
                    <span
                      style={{
                        backgroundColor: item.color,
                        width: 50,
                        height: 20,
                        display: "inline-block",
                      }}
                    ></span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
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
}

export default App;
