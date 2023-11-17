import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import './PermissaoFormulario.css';
import { PermissaoService } from "../../../services/PermissaoService";

const PermissaoFormulario = (props) => {
	//const navigate = useNavigate();
	//const location = useLocation();
	///const { id } = location.state || {};
	//const { ii } = useParams();
	const navigate = useNavigate();
	const permissaoNovo = { nome: ''};
	const location = useLocation();
	const { permissaoAlterar } = location.state || {};

	const [permissao, setPermissao] = useState(permissaoNovo);
	const permissaoService = new PermissaoService();

	useEffect(() => {
		if(permissaoAlterar){
			setPermissao(permissaoAlterar);
		}else{
			setPermissao(permissaoNovo);
		}		
	}, []);

	const listaPermissao = () =>{
		navigate("/permissao")
	}

	const alterarValor = (event) => {
		setPermissao({ ...permissao, [event.target.name]: event.target.value });
	}

	const salvar = () => {

		if (!permissao.nome) {
			alert('O campo nome não pode estar vazio');
			return; 
		}
		if (permissao.id) {
			permissaoService.alterar(permissao).then(data => {
				console.log(data);
				setPermissao(permissaoNovo);
			});
		} else {
			permissaoService.inserir(permissao).then(data => {
				console.log(data);
				setPermissao(permissaoNovo);
			});
		}
	}

	return (
		<div className="permissao-form">
		  <h2>Inserir ou Alterar uma Permissão</h2>
		  <div className="input-group">
			<label htmlFor="nome" className="label-nome">Nome:</label>
			<input type="text" id="nome" name="nome" value={permissao.nome} onChange={alterarValor} className="input-nome" />
		  </div>
		  <div className="button-group">
			<button onClick={salvar} className="btn-salvar">Salvar</button>
			<button onClick={listaPermissao} className="btn-lista">Lista de Permissões</button>
		  </div>
		</div>
	  );
}

export default PermissaoFormulario;