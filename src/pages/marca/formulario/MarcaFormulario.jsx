import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import './MarcaFormulario.css';
import { MarcaService } from "../../../services/MarcaService";

const MarcaFormulario = (props) => {
	//const navigate = useNavigate();
	//const location = useLocation();
	///const { id } = location.state || {};
	//const { ii } = useParams();
	const navigate = useNavigate();
	const marcaNovo = { nome: ''};
	const location = useLocation();
	const { marcaAlterar } = location.state || {};

	const [marca, setMarca] = useState(marcaNovo);
	const marcaService = new MarcaService();

	useEffect(() => {
		if(marcaAlterar){
			setMarca(marcaAlterar);
		}else{
			setMarca(marcaNovo);
		}		
	}, []);

	const listaMarcas = () =>{
		navigate("/marcas")
	}

	const alterarValor = (event) => {
		setMarca({ ...marca, [event.target.name]: event.target.value });
	}

	const salvar = () => {
		if (!marca.nome) {
			alert('O campo nome não pode estar vazio');
			return; 
		}

		if (marca.id) {
			marcaService.alterar(marca).then(data => {
				console.log(data);
				setMarca(marcaNovo);
			});
		} else {
			marcaService.inserir(marca).then(data => {
				console.log(data);
				setMarca(marcaNovo);
			});
		}
	}

	return (
		<div className="marca-form">
		  <h2>Inserir ou Alterar uma Marca</h2>
		  <div className="input-group">
			<label htmlFor="nome" className="label-nome">Nome:</label>
			<input type="text" id="nome" name="nome" value={marca.nome} onChange={alterarValor} className="input-nome" />
		  </div>
		  <div className="button-group">
			<button onClick={salvar} className="btn-salvar">Salvar</button>
			<button onClick={listaMarcas} className="btn-lista">Lista de Marcas</button>
		  </div>
		</div>
	  );
}

export default MarcaFormulario;