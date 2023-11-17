import React, { useEffect, useState } from "react";
import "./MarcaLista.css";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Paginator } from "primereact/paginator";
import { MarcaService } from "../../../services/MarcaService";

const MarcaLista = () => {
  const navigate = useNavigate();
  const [marca, setMarca] = useState([]);
  const marcaService = new MarcaService();
  const [idExcluir, setIdExcluir] = useState(null);
  const [dialogExcluir, setDialogExcluir] = useState(false);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);

  useEffect(() => {
    buscarMarca();
  }, [first, rows]);

  const onPageChange = (event) =>{
	setFirst(event.first);
	setRows(event.rows);
  }

  const buscarMarca = () => {
	const page = first/rows;
    marcaService.listar(page, rows).then((data) => {
		setMarca(data.data);
    });
  };

  const formulario = () => {
    navigate("/marca-formulario");
  };

  const alterar = (rowData) => {
    //console.log(rowData);
    navigate("/marca-formulario", { state: { marcaAlterar: rowData } });
  };

  const excluir = () => {
    marcaService.excluir(idExcluir).then((data) => {
		buscarMarca();
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
      <h2>Lista de Marcas</h2>
      <button onClick={formulario}>Novo Marca</button>
      <br />
      <br />
      <DataTable value={marca.content} tableStyle={{ minWidth: "50rem" }}>
        <Column field="id" header="Id"></Column>
        <Column field="nome" header="Nome"></Column>
        <Column header="Opções" body={optionColumn}></Column>
      </DataTable>
      <Paginator
        first={first}
        rows={rows}
        totalRecords={marca.totalElements}
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

export default MarcaLista;