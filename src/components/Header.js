import React from 'react';

function Header() {
  return (
    <header className="h-32 bg-gradient-to-r from-blue-900 via-blue-400 to-blue-900 p-6 flex justify-between items-center">
      <div className="flex items-center">
        <img src="/images/Logo_PMMT.png" alt="Logo PMMT" className="h-20 w-auto" />
      </div>
      <div className="flex items-center">
        <img src="/images/Perfil_default.png" alt="Foto do Usuário" className="h-16 w-16 rounded-full" />
        <div className="ml-4 text-white">
          <h3 className="font-bold">DOUGLAS VICENTE NORIMATSU SAKATA</h3>
          <p>Data/Hora: 17/11/2024</p>
          <p>Nível de Acesso: Administrador</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
