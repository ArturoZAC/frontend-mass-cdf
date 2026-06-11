import { useState } from "react";
import { kardexMock } from "./mock/kardex.mock";
import { KardexHeader } from "./components/KardexHeader";
import { KardexStats } from "./components/KardexStats";
import { KardexTable } from "./components/KardexTable";

export const ListaKardexPage = () => {
  const [page, setPage] = useState(1);
  const perPage = 5;

  return (
    <div className="p-6">
      <KardexHeader />
      <KardexStats movimientos={kardexMock} />
      <KardexTable movimientos={kardexMock} page={page} perPage={perPage} onPageChange={setPage} />
    </div>
  );
};
