import React, { useEffect, useState } from "react";
import "./EstadoLista.css";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Paginator } from "primereact/paginator";
import { EstadoService } from "../../../services/EstadoService";

const EstadoLista = () => {
  const navigate = useNavigate();
  const [estados, setEstados] = useState([]);
  const estadoService = new EstadoService();
  const [idExcluir, setIdExcluir] = useState(null);
  const [dialogExcluir, setDialogExcluir] = useState(false);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);

  useEffect(() => {
    buscarEstados();
  }, [first, rows]);

  const onPageChange = (event) =>{
	setFirst(event.first);
	setRows(event.rows);
  }

  const buscarEstados = () => {
	const page = first/rows;
    estadoService.listar(page, rows).then((data) => {
		setEstados(data.data);
    });
  };

  const formulario = () => {
    navigate("/estado-formulario");
  };

  const alterar = (rowData) => {
    //console.log(rowData);
    navigate("/estado-formulario", { state: { estadoAlterar: rowData } });
  };

  const excluir = () => {
    estadoService.excluir(idExcluir).then((data) => {
		buscarEstados();
    });
  };

  const optionColumn = (rowData) => {
    return (
      <>
        <Button
          label="Alterar"
          severity="warning"
          onClick={() => alterar(rowData)}
        />

        <Button
          label="Excluir"
          severity="dander"
          onClick={() => {
            setIdExcluir(rowData.id);
            setDialogExcluir(true);
          }}
        />
      </>
    );
  };

  return (
    <div className="container">
      <h2>Lista de Estados</h2>
      <button onClick={formulario}>Novo Estado</button>
      <br />
      <br />
      <DataTable value={estados.content} tableStyle={{ minWidth: "50rem" }}>
        <Column field="id" header="Id"></Column>
        <Column field="nome" header="Nome"></Column>
        <Column field="sigla" header="Sigla"></Column>
        <Column header="Opções" body={optionColumn}></Column>
      </DataTable>
      <Paginator
        first={first}
        rows={rows}
        totalRecords={estados.totalElements}
        rowsPerPageOptions={[5, 10, 20, 30]}
        onPageChange={onPageChange}
      />

      <ConfirmDialog
        visible={dialogExcluir}
        onHide={() => setDialogExcluir(false)}
        message="Deseja excluir?"
        header="Confirmação"
        icon="pi pi-exclamation-triangle"
        accept={excluir}
        reject={() => setIdExcluir(null)}
        acceptLabel="Sim"
        rejectLabel="Não"
      />

      {
        /* 	{produtos.map((produto)=>
				<p key={produto.id}>{produto.descricao} {produto.valor}</p>
			)} */
      }
    </div>
  );
};

export default EstadoLista;