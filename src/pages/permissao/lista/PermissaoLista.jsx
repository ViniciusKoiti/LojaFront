import React, { useEffect, useState } from "react";
import './PermissaoLista.css';
import { useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Paginator } from "primereact/paginator";
import { PermissaoService } from "../../../services/PermissaoService";

const PermissaoLista = () => {
	const navigate = useNavigate();
	const [permissao, setPermissao] = useState([]);
	const permissaoService = new PermissaoService();
	const [idExcluir, setIdExcluir] = useState(null);
	const [dialogExcluir, setDialogExcluir] = useState(false);
	const [first, setFirst] = useState(0);
	const [rows, setRows] = useState(5);

	useEffect(() => {
		buscarPermissao();
	  }, [first, rows]);
	
	  const onPageChange = (event) =>{
		setFirst(event.first);
		setRows(event.rows);
	  }
	
	  const buscarPermissao = () => {
		const page = first/rows;
		permissaoService.listar(page, rows).then((data) => {
			setPermissao(data.data);
		});
	  };
	
	  const formulario = () => {
		navigate("/permissao-formulario");
	  };

	  const alterar = (rowData) => {
		//console.log(rowData);
		navigate("/permissao-formulario", { state: { permissaoAlterar: rowData } });
	  };
	
	  const excluir = () => {
		permissaoService.excluir(idExcluir).then((data) => {
			buscarPermissao();
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
		  <h2>Lista de Permissões</h2>
		  <button onClick={formulario}>Nova Permissão</button>
		  <br />
		  <br />
		  <DataTable value={permissao.content} tableStyle={{ minWidth: "50rem" }}>
			<Column field="id" header="Id"></Column>
			<Column field="nome" header="Nome"></Column>
			<Column header="Opções" body={optionColumn}></Column>
		  </DataTable>
		  <Paginator
			first={first}
			rows={rows}
			totalRecords={permissao.totalElements}
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
	
	export default PermissaoLista;