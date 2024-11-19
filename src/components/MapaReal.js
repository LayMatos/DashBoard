import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Tooltip } from 'react-leaflet'; // Importando GeoJSON do react-leaflet
import 'leaflet/dist/leaflet.css';
import gruposDeMunicipios from '../data/grupodeMunicipios'; // Importando o arquivo de grupos de municípios

// URL do arquivo GeoJSON ou arquivo local
const geojsonUrl = 'https://raw.githubusercontent.com/tbrugz/geodata-br/master/geojson/geojs-51-mun.json';

// Função para obter a cor com base no grupo do município
const getMunicipiosPorCor = (municipioNome) => {
  if (gruposDeMunicipios.CR_1.includes(municipioNome)) return "#B8860B"; 
  if (gruposDeMunicipios.CR_2.includes(municipioNome)) return "#483D8B"; 
  if (gruposDeMunicipios.CR_3.includes(municipioNome)) return "#8B0000";
  if (gruposDeMunicipios.CR_4.includes(municipioNome)) return "#BDB76B";
  if (gruposDeMunicipios.CR_5.includes(municipioNome)) return "#6B8E23";  
  if (gruposDeMunicipios.CR_6.includes(municipioNome)) return "#8FBC8F"; 
  if (gruposDeMunicipios.CR_7.includes(municipioNome)) return "#808000";
  if (gruposDeMunicipios.CR_8.includes(municipioNome)) return "#CD5C5C"; 
  if (gruposDeMunicipios.CR_9.includes(municipioNome)) return "#A9A9A9"; 
  if (gruposDeMunicipios.CR_10.includes(municipioNome)) return "#FF8C00";
  if (gruposDeMunicipios.CR_11.includes(municipioNome)) return "#008B8B"; 
  if (gruposDeMunicipios.CR_12.includes(municipioNome)) return "#7B68EE"; 
  if (gruposDeMunicipios.CR_13.includes(municipioNome)) return "#DA70D6";
  if (gruposDeMunicipios.CR_14.includes(municipioNome)) return "#8B008B";    
  if (gruposDeMunicipios.CR_15.includes(municipioNome)) return "#006400"; 
  return "#D0D0D0"; // Cor padrão para municípios não classificados
};

const MapComponent = ({ center = [-12.595, -55.746], zoom = 6 }) => {
  const [geoData, setGeoData] = useState(null);

  // Carrega o GeoJSON
  useEffect(() => {
    fetch(geojsonUrl)
      .then((response) => response.json())
      .then((data) => setGeoData(data))
      .catch((error) => console.error('Erro ao carregar o GeoJSON:', error));
  }, []);

  // Função de estilo para as divisões dos municípios (aplicando cor baseada no nome)
  const style = (feature) => {
    const municipioNome = feature.properties.name;
    const corMunicipio = getMunicipiosPorCor(municipioNome); // Obtém a cor do município

    return {
      fillColor: corMunicipio,
      weight: 0.5,
      opacity: 0.5,
      color: 'black', // Cor do contorno
      fillOpacity: 0.7,
    };
  };

  // Função para exibir o nome da cidade no Tooltip quando o mouse passar sobre o município
  const onEachFeature = (feature, layer) => {
    layer.bindTooltip(feature.properties.name, {
      permanent: false,
      direction: 'top',
      offset: [0, -10],
      opacity: 1,
      className: 'sms-tooltip',
    });

    // Remove qualquer estilo de seleção ao clicar (torna o contorno invisível)
    layer.on({
      click: () => {
        layer.setStyle({
          ...style(feature),  // Aplica o estilo original
          weight: 0, // Remove o contorno (quadrado)
          color: 'transparent', // Ou define como transparente
        });
      },
    });

    // Remover o efeito de seleção (quadrado) ao clicar ou passar o mouse
    layer.on({
      mouseover: () => {
        layer.setStyle({
          fillOpacity: 0.7, // Cor do hover, se desejado
        });
      },
      mouseout: () => {
        layer.setStyle(style(feature)); // Retorna ao estilo original
      },
    });
  };

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
      {/* Camada de tiles (mapa) do OpenStreetMap */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Verifica se os dados do GeoJSON foram carregados */}
      {geoData && (
        <GeoJSON
          data={geoData}
          style={style}  // Aplica o estilo com a cor dos municípios
          onEachFeature={onEachFeature} // Aplica a função para exibir o nome da cidade
        />
      )}
    </MapContainer>
  );
};

export default MapComponent;
