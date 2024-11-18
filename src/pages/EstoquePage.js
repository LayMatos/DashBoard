import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import { FaChartArea } from "react-icons/fa"; // Importando o ícone corretamente
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Registrando os componentes necessários do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function EstoquePage() {
  const [activeButton, setActiveButton] = useState("estoque");

  // Dados do gráfico de barras (exemplo com 40 itens)
  const barData = {
    labels: Array.from({ length: 40 }, (_, i) => `Item ${i + 1}`),
    datasets: [
      {
        label: "Quantidade",
        data: Array.from({ length: 40 }, () => Math.floor(Math.random() * 100)), // Dados aleatórios
        backgroundColor: "#1D4ED8", // Cor do gráfico de barras
        borderRadius: 5,
      },
    ],
  };

  // Dados do gráfico de biscoito
  const doughnutData = {
    labels: ["Em Estoque", "Separado para Entrega", "Entregue", "Cautelado"],
    datasets: [
      {
        data: [25, 10, 15, 5],
        backgroundColor: ["#22C55E", "#F59E0B", "#3B82F6", "#F87171"],
      },
    ],
  };

  return (
    <div className="flex flex-col bg-[#E3EEFF] min-h-[calc(100vh)]">
      {/* Corpo do conteúdo */}
      <main className="flex flex-1 flex-wrap justify-center mb-6 gap-6 mt-5"> {/* Ajustando o espaçamento entre os gráficos */}
        {/* Contêiner flex para exibir os gráficos lado a lado */}
        <div className="flex w-full sm:w-10/12 lg:w-10/12 xl:w-10/12 gap-6">
          {/* Gráfico de Barras - Ocupa 8 colunas em telas grandes */}
          <div className="w-full max-w-[1200px] mx-auto flex justify-center items-center h-[500px]">
  <Bar
    data={barData}
    options={{
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: 5,
      },
      scales: {
        y: {
          display: false,
        },
        x: {
          ticks: {
            padding: 5,
          },
        },
      },
    }}
  />
</div>


          {/* Gráfico de Biscoito - Ocupa 3 colunas em telas grandes */}
          <div className="w-full lg:w-3/12 xl:w-3/12 flex justify-center mt-20 p-5">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full h-[300px]"> {/* Reduzindo a altura do card */}
              <h3 className="text-xl font-semibold mb-4 text-center">Status do Estoque</h3>
              <div className="relative h-[200px]"> {/* Reduzindo a altura do gráfico */}
                <Doughnut 
                  data={doughnutData} 
                  options={{
                    responsive: true, 
                    maintainAspectRatio: false,
                    layout: {
                      padding: 2, // Ajustando o espaçamento interno do gráfico de rosca
                    },
                    plugins: {
                      legend: {
                        position: 'bottom', // Posição da legenda
                      },
                    },
                  }} 
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Botões de Estoque e Entregue */}
      <div className="flex justify-center p-4 absolute top-20 left-1/2 transform -translate-x-1/2 z-10">
        <Link to="/">
          <button
            onClick={() => setActiveButton("estoque")}
            className={`flex justify-center items-center p-3 rounded-full transition duration-300 ease-in-out 
            ${activeButton === "estoque" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
          >
            <FaChartArea size={24} /> {/* Ícone */}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default EstoquePage;
