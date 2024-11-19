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
      {/* Título da Página */}
      <h1 className="text-3xl font-bold text-center mt-10">Gestão de Estoque</h1>
      {/* Corpo do conteúdo */}
      <main className="flex flex-1 flex-wrap justify-center mt-1 mb-10">
        {/* Contêiner flex para exibir os gráficos lado a lado */}
        <div className="flex flex-col sm:flex-row justify-center w-full gap-2 mt-5 mx-3 items-stretch">
          {/* Gráfico de Barras */}
          <div className="flex justify-center items-center w-full sm:w-10/12 md:w-9/12 lg:w-10/12 xl:w-10/12 max-w-[1200px] mx-auto h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] mt-10 ml-10">
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
                      padding: 10, // Aumentando o espaço nas margens do eixo X
                    },
                  },
                },
              }}
            />
          </div>

          {/* Gráfico de Biscoito */}
          <div className="flex justify-center items-center w-full lg:w-4/12 xl:w-3/12 sm:w-10/12 h-[300px] sm:h-[400px] md:h-[400px] lg:h-[500px] mt-10 mr-5">
          <div className="hadow-lg rounded-lg py-10 w-full h-full">
              <h3 className="text-xl font-semibold mb-4 text-center">Status do Estoque</h3>
              <div className="relative w-full h-full">
                <Doughnut
                  data={doughnutData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: {
                      padding: 2,
                    },
                    plugins: {
                      legend: {
                        position: 'bottom',
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
            <FaChartArea size={24} />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default EstoquePage;
