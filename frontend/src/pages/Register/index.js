import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import swal from 'sweetalert';
import MaskedInput from 'react-text-mask';

import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  
  const history = useHistory();
  
  async function handleRegister(e){
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    }

    try {
      const response = await api.post('ongs', data);

      swal({
        title: `Seu ID de acesso é: ${response.data.id}`,
        text: "Copie para efetuar o logon!",
        icon: "warning",
        button: true,
        dangerMode: true,
      })

      history.push('/');
    } catch (err) {
      swal({
        title: "Erro ao cadastrar!",
        text: "Tente nomvamente.",
        icon: "warning",
        button: true,
        dangerMode: true,
      })
    }
  }

  return(
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma, e ajude pessoas a encontrarem os casos da sua ONG.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041"/>
            Login
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input 
            placeholder="Nome da ONG"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input 
            type="email" 
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <MaskedInput 
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
            maxLength={16}
            guide={false}
            onBlur={() => {}}
            mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
          />

          <div className="input-group">
            <input 
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input 
              className="input-uf"
              placeholder="UF" 
              style={{ width: 80 }}
              value={uf}
              onChange={e => setUf(e.target.value)}
              maxLength={2}
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}