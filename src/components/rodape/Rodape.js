import React, {useContext} from 'react';
import './Rodape.css';
import { TemaContexto } from '../../App';

const Rodape = () => {
	const {dark} = useContext(TemaContexto);
  return (
    <div className={`rodape ${dark?'dark':'light'}`}>
      <p>&copy; 2023 CRUD React, Spring e Websocket</p>
    </div>
  );
};

export default Rodape;
