import React, { useEffect, useState } from "react";
import './ProdutoLista.css';
import { useNavigate } from "react-router-dom";
import { ProdutoService } from "../../../services/ProdutoService";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { ConfirmDialog } from 'primereact/confirmdialog';

const ProdutoLista = () => {
	const navigate = useNavigate();
	const [produtos, setProdutos] = useState([]);
	const produtoService = new ProdutoService();
	const [idExcluir, setIdExcluir] = useState(null);
	const [dialogExcluir, setDialogExcluir] = useState(false);

	useEffect(() => {
		buscarProdutos();
	}, []);

	const buscarProdutos = () => {
		produtoService.listar().then(data => {
			setProdutos(data.data);
		})
	}

	const formulario = () => {
		navigate("/produto-formulario");
	}

	const alterar = (rowData) => {
		//console.log(rowData);
		navigate("/produto-formulario", { state: { produtoAlterar: rowData } })
	}

	const excluir = () => {
		produtoService.excluir(idExcluir).then(data=>{
			buscarProdutos();
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
			<h2>Lista de Produtos</h2>
			<button onClick={formulario}>Novo Produto</button>
			<br /><br />
			<DataTable value={produtos} tableStyle={{ minWidth: '50rem' }}>
				<Column field="id" header="Id"></Column>
				<Column field="descricao" header="Descrição"></Column>
				<Column field="valor" header="Valor"></Column>
				<Column field="valorPromocional" header="Valor Promocional"></Column>
				<Column header="Opções" body={optionColumn}></Column>
			</DataTable>

			<ConfirmDialog visible={dialogExcluir} onHide={() => setDialogExcluir(false)} message="Deseja excluir?"
				header="Confirmação" icon="pi pi-exclamation-triangle" accept={excluir} reject={() => setIdExcluir(null)} acceptLabel="Sim" rejectLabel="Não"/>

			{/* 	{produtos.map((produto)=>
				<p key={produto.id}>{produto.descricao} {produto.valor}</p>	
			)} */}
		</div>
	);
}

export default ProdutoLista;