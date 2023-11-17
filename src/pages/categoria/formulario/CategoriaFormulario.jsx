import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import './CategoriaFormulario.css';
import { CategoriaService } from "../../../services/CategoriaService";

const CategoriaFormulario = (props) => {
	//const navigate = useNavigate();
	//const location = useLocation();
	///const { id } = location.state || {};
	//const { ii } = useParams();
	const navigate = useNavigate();
	const categoriaNovo = { nome: ''};
	const location = useLocation();
	const { categoriaAlterar } = location.state || {};

	const [categoria, setCategoria] = useState(categoriaNovo);
	const categoriaService = new CategoriaService();

	useEffect(() => {
		if(categoriaAlterar){
			setCategoria(categoriaAlterar);
		}else{
			setCategoria(categoriaNovo);
		}		
	}, []);

	const listaCategoria = () =>{
		navigate("/categoria")
	}

	const alterarValor = (event) => {
		setCategoria({ ...categoria, [event.target.name]: event.target.value });
	}

	const salvar = () => {

		if (!categoria.nome) {
			alert('O campo nome não pode estar vazio');
			return; 
		}
		if (categoria.id) {
			categoriaService.alterar(categoria).then(data => {
				console.log(data);
				setCategoria(categoriaNovo);
			});
		} else {
			categoriaService.inserir(categoria).then(data => {
				console.log(data);
				setCategoria(categoriaNovo);
			});
		}
	}

	return (
		<div className="categoria-form">
		  <h2>Inserir ou Alterar uma Categoria</h2>
		  <div className="input-group">
			<label htmlFor="nome" className="label-nome">Nome:</label>
			<input type="text" id="nome" name="nome" value={categoria.nome} onChange={alterarValor} className="input-nome" />
		  </div>
		  <div className="button-group">
			<button onClick={salvar} className="btn-salvar">Salvar</button>
			<button onClick={listaCategoria} className="btn-lista">Lista Categorias</button>
		  </div>
		</div>
	  );
	  
	  
}

export default CategoriaFormulario;