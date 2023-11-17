import React, { useEffect, useState } from "react";
import './CategoriaLista.css';
import { useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { CategoriaService } from "../../../services/CategoriaService";

const CategoriaLista = () => {
	const navigate = useNavigate();
	const [categoria, setCategoria] = useState([]);
	const categoriaService = new CategoriaService();
	const [idExcluir, setIdExcluir] = useState(null);
	const [dialogExcluir, setDialogExcluir] = useState(false);

	useEffect(() => {
		buscarCategoria();
	}, []);

	const buscarCategoria = () => {
		categoriaService.listar().then(data => {
			setCategoria(data.data);
		})
	}

	const formulario = () => {
		navigate("/categoria-formulario");
	}

	const alterar = (rowData) => {
		//console.log(rowData);
		navigate("/categoria-formulario", { state: { categoriaAlterar: rowData } })
	}

	const excluir = () => {
		categoriaService.excluir(idExcluir).then(data=>{
			buscarCategoria();
		});
	}

	const optionColumn = (rowData) => {
		return (
			<>
				<Button label="Alterar" severity="warning" onClick={() => alterar(rowData)} />

				<Button label="Excluir" severity="dander" onClick={() => { setIdExcluir(rowData.id); setDialogExcluir(true) }} />
			</>
		)
	}

	return (
		<div className="container">
			<h2>Lista de Categorias</h2>
			<button onClick={formulario}>Nova Categoria</button>
			<br /><br />
			<DataTable value={categoria} tableStyle={{ minWidth: '50rem' }}>
				<Column field="id" header="Id"></Column>
				<Column field="nome" header="Nome"></Column>
				<Column header="Opções" body={optionColumn}></Column>
			</DataTable>

			<ConfirmDialog visible={dialogExcluir} onHide={() => setDialogExcluir(false)} message="Deseja excluir?"
				header="Confirmação" icon="pi pi-exclamation-triangle" accept={excluir} reject={() => setIdExcluir(null)} acceptLabel="Sim" rejectLabel="Não"/>


		</div>
	);
}

export default CategoriaLista;