import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import 'leaflet/dist/leaflet.css';
import '../App.css';

const dataCautela = [
  { name: 'Cautelado', value: 40 },
  { name: 'Descautelado', value: 30 },
  { name: 'Aguardando Assinatura', value: 30 },
];

const dataEntrega = [
  { name: 'Assinados', value: 50 },
  { name: 'Aguardando Assinatura', value: 50 },
];

const dataEquipamentos = [
  { cidade: 'Cidade A', cautelas: 30, entregas: 20 },
  { cidade: 'Cidade B', cautelas: 40, entregas: 35 },
  { cidade: 'Cidade C', cautelas: 50, entregas: 45 },
];

const dataCidadeEquipamentos = [
  { cidade: 'Cidade A', entregues: 30, cautelados: 10 },
  { cidade: 'Cidade B', entregues: 50, cautelados: 20 },
  { cidade: 'Cidade C', entregues: 40, cautelados: 30 },
  { cidade: 'Cidade D', entregues: 20, cautelados: 15 },
  { cidade: 'Cidade E', entregues: 35, cautelados: 25 },
  // Adicione até 35 cidades
];

// Função para calcular os valores acumulados para o gráfico cascata
const processDataForWaterfall = (data) => {
  let prevTotal = 0;
  return data.map(item => {
    const total = item.entregues - item.cautelados;
    const waterfallValue = total + prevTotal;
    prevTotal = waterfallValue;  // Atualiza o valor acumulado
    return {
      ...item,
      waterfallValue: waterfallValue,
      isPositive: total >= 0,  // Identifica se é uma variação positiva ou negativa
    };
  });
};

const processedData = processDataForWaterfall(dataCidadeEquipamentos);

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Body */}
      <main className="flex-grow p-6 flex">
        {/* Left side */}
        <div className="w-1/4 space-y-6">
          {/* Card 1: Gráfico Biscoito Cautela */}
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="font-bold text-lg mb-2">Termos de Cautela</h3>
            <PieChart width={200} height={200}>
              <Pie data={dataCautela} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                {dataCautela.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#00C49F', '#FF8042', '#FFBB28'][index]} />
                ))}
              </Pie>
            </PieChart>
          </div>

          {/* Card 2: Gráfico Cascata Equipamentos Entregues */}
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="font-bold text-lg mb-2">Equipamentos Entregues</h3>
            {/* Gráfico Cascata */}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={processedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="cidade" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="waterfallValue" fill={(entry) => entry.isPositive ? '#82ca9d' : '#ff7f7f'} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Center: Map */}
        <div className="flex-1 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">Ir para outra página</button>
          </div>

          <MapContainer center={[-12.595, -55.746]} zoom={6} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {/* Adicione marcadores ou elementos do mapa aqui */}
            <Marker position={[-12.595, -55.746]}>
              <Popup>
                <span>Mato Grosso</span>
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Right side */}
        <div className="w-1/4 space-y-6">
          {/* Card 1: Gráfico Biscoito Entrega */}
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="font-bold text-lg mb-2">Termos de Entrega</h3>
            <PieChart width={200} height={200}>
              <Pie data={dataEntrega} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                {dataEntrega.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#00C49F', '#FF8042'][index]} />
                ))}
              </Pie>
            </PieChart>
          </div>

          {/* Card 2: Gráfico Cascata Equipamentos Entregues */}
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="font-bold text-lg mb-2">Equipamentos Entregues</h3>
            {/* Gráfico Cascata */}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={processedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="cidade" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="waterfallValue" fill={(entry) => entry.isPositive ? '#82ca9d' : '#ff7f7f'} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>

      {/* Gráfico de Barras abaixo de todos os gráficos */}
      <div className="w-full mt-6 p-4">
        <h3 className="font-bold text-xl mb-4">Equipamentos Entregues e Cautelados por Cidade</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dataCidadeEquipamentos}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="cidade" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="entregues" fill="#82ca9d" />
            <Bar dataKey="cautelados" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default App;
