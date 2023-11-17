import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import './ProdutoFormulario.css';
import { ProdutoService } from "../../../services/ProdutoService";

const ProdutoFormulario = (props) => {
	//const navigate = useNavigate();
	//const location = useLocation();
	///const { id } = location.state || {};
	//const { ii } = useParams();
	const navigate = useNavigate();
	const produtoNovo = { descricao: '', valor: 0, valorPromocional: 0 };
	const location = useLocation();
	const { produtoAlterar } = location.state || {};

	const [produto, setProduto] = useState(produtoNovo);
	const produtoService = new ProdutoService();

	useEffect(() => {
		if(produtoAlterar){
			setProduto(produtoAlterar);
		}else{
			setProduto(produtoNovo);
		}		
	}, []);

	const listaProdutos = () =>{
		navigate("/produtos")
	}

	const alterarValor = (event) => {
		setProduto({ ...produto, [event.target.name]: event.target.value });
	}

	const salvar = () => {
		if (produto.id) {
			produtoService.alterar(produto).then(data => {
				console.log(data);
				setProduto(produtoNovo);
			});
		} else {
			produtoService.inserir(produto).then(data => {
				console.log(data);
				setProduto(produtoNovo);
			});
		}
	}

	return (
		<div style={{ padding: '10px' }}>
			<h2>Inserir ou Alterar um Produto</h2>
			<input type="text" name="descricao" value={produto.descricao} onChange={alterarValor} /><br /><br />
			<input type="number" name="valor" value={produto.valor} onChange={alterarValor} /><br /><br />
			<input type="number" name="valorPromocional" value={produto.valorPromocional} onChange={alterarValor} /><br /><br />
			<button onClick={salvar}>Salvar</button>
			<button onClick={listaProdutos}>Lista Produtos</button>
		</div>
	);
}

export default ProdutoFormulario;