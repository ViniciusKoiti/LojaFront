import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import './EstadoFormulario.css';
import { EstadoService } from "../../../services/EstadoService";

const EstadoFormulario = (props) => {
	//const navigate = useNavigate();
	//const location = useLocation();
	///const { id } = location.state || {};
	//const { ii } = useParams();
	const navigate = useNavigate();
	const estadoNovo = { nome: '', sigla: ''};
	const location = useLocation();
	const { estadoAlterar } = location.state || {};

	const [estado, setEstado] = useState(estadoNovo);
	const estadoService = new EstadoService();

	useEffect(() => {
		if(estadoAlterar){
			setEstado(estadoAlterar);
		}else{
			setEstado(estadoNovo);
		}		
	}, []);

	const listaEstados = () =>{
		navigate("/estados")
	}

	const alterarValor = (event) => {
		setEstado({ ...estado, [event.target.name]: event.target.value });
	}

	const salvar = () => {
		if (!estado.nome) {
			alert('O campo nome não pode estar vazio');
			return; 
		}
		if (!estado.sigla) {
			alert('O campo sigla não pode estar vazio');
			return; 
		}
		if (estado.id) {
			estadoService.alterar(estado).then(data => {
				console.log(data);
				setEstado(estadoNovo);
			});
		} else {
			estadoService.inserir(estado).then(data => {
				console.log(data);
				setEstado(estadoNovo);
			});
		}
	}

	return (
		<div className="estado-form"> 
		  <h2>Inserir ou Alterar um Estado</h2>
		  <div className="input-group">
			<label htmlFor="nome" className="label-nome">Nome:</label>
			<input type="text" id="nome" name="nome" value={estado.nome} onChange={alterarValor} className="input-nome" />
		  </div>
		  <div className="input-group">
			<label htmlFor="sigla" className="label-sigla">Sigla:</label>
			<input type="text" id="sigla" name="sigla" value={estado.sigla} onChange={alterarValor} className="input-sigla" />
		  </div>
		  <div className="button-group">
			<button onClick={salvar} className="btn-salvar">Salvar</button>
			<button onClick={listaEstados} className="btn-lista">Lista Estados</button>
		  </div>
		</div>
	  );
	}


export default EstadoFormulario;