import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import './ProdutoFormulario.css';
import { ProdutoService } from "../../../services/ProdutoService";

const ProdutoFormulario = (props) => {

	const navigate = useNavigate();
	const produtoNovo = { descricao: '', valor: 0, valorPromocional: 0 };
	const location = useLocation();
	const { produtoAlterar } = location.state || {};

	const [produto, setProduto] = useState(produtoNovo);
	const [erroCamposVazios, setErroCamposVazios] = useState(false);
	const [erroValorMenorQueZero, setErroValorMenorQueZero] = useState(false);
	const [erroValorPromocionalMenorQueZero, setErroValorPromocionalMenorQueZero] = useState(false);
	const produtoService = new ProdutoService();

	useEffect(() => {
		if (produtoAlterar) {
			setProduto(produtoAlterar);
		} else {
			setProduto(produtoNovo);
		}
	}, []);

	const listaProdutos = () => {
		navigate("/produtos")
	}

	const alterarValor = (event) => {
		setProduto({ ...produto, [event.target.name]: event.target.value });
		// Remova as mensagens de erro quando o usuário começar a preencher os campos
		setErroCamposVazios(false);
		setErroValorMenorQueZero(false);
		setErroValorPromocionalMenorQueZero(false);
	}

	const salvar = () => {
		if (produto.descricao.trim() === '') {
			// Exiba a mensagem de erro quando o campo descrição estiver vazio
			setErroCamposVazios(true);
			return;
		}

		if (produto.valor <= 0) {
			// Exiba a mensagem de erro quando o valor for menor ou igual a zero
			setErroValorMenorQueZero(true);
			return;
		}

		if (produto.valorPromocional <= 0) {
			// Exiba a mensagem de erro quando o valor promocional for menor ou igual a zero
			setErroValorPromocionalMenorQueZero(true);
			return;
		}

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
		<div>
			<h2>Inserir ou Alterar um Produto</h2>
			<label htmlFor="descricao">Nome:</label>
			<input type="text" name="descricao" value={produto.descricao} onChange={alterarValor} /><br /><br />
			<label htmlFor="valor">Valor:</label>
			<input type="number" name="valor" value={produto.valor} onChange={alterarValor} /><br /><br />
			{erroValorMenorQueZero && (
				<p className="erro-campos-vazios">O valor deve ser maior que zero.</p>
			)}
			<label htmlFor="valorPromocional">Valor Promocional:</label>
			<input type="number" name="valorPromocional" value={produto.valorPromocional} onChange={alterarValor} /><br /><br />
			{erroValorPromocionalMenorQueZero && (
				<p className="erro-campos-vazios">O valor promocional deve ser maior que zero.</p>
			)}
			{erroCamposVazios && (
				<p className="erro-campos-vazios">Preencha todos os campos antes de salvar.</p>
			)}
			<button onClick={salvar}>Salvar</button>
			<button onClick={listaProdutos}>Lista Produtos</button>
		</div>
	);
}

export default ProdutoFormulario;