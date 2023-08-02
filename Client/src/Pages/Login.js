import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import Img from "../Assets/imagem preço.jpg";
import "../Styles/Login.css"
import { Link } from 'react-router-dom';

//Tela inicial
function Login({ logado = false }) {
  const handleLogin = (values) => {
    Axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      const page = response.data;

      if (page === true) {
        localStorage.setItem('@user', JSON.stringify(response.config.data));
        localStorage.setItem('login', values.email);
        window.location.reload();
      } else {
        alert(response.data.msg);
      }
    });
  };

  const validationsLogin = yup.object().shape({
    email: yup
      .string()
      .email("Email inválido!")
      .required("Email obrigatório!"),
    password: yup
      .string()
      .min(4, "Senha deve ter pelo menos 4 caracteres!")
      .required("Senha obrigatória!"),
  });

  return (
    <div className="body">      
      <div className="left-login">
        <img src={Img} alt="Imagem lista de preços" className="fundo-imagem-background" />        
      </div>
      <div className="right-login">
        <div className="card-login">
          <div className="user-links">
            <div className="user-link-home">
              {!logado && <Link to="/">Home</Link>}
            </div>
            <div className="user-link-cad">
              {!logado && <Link to="/cadastro">Cadastro</Link>}
            </div>
          </div>
          <h1>LOGIN</h1>
          <Formik
            initialValues={{}}
            onSubmit={handleLogin}
            validationSchema={validationsLogin}
          >
            <Form className="login-form">
              <div className="form-group">
                <label form="email">Usuário</label>
                <Field name="email" type='email' className="form-field" placeholder="Email" />
                <ErrorMessage
                  component="span"
                  name="email"
                  className="form-error"
                />
              </div>

              {/*Outro campo*/}
              <div className="form-group">
                <label form="email">Senha</label>
                <Field name="password" type='password' className="form-field" placeholder="Senha" />

                <ErrorMessage
                  component="span"
                  name="password"
                  className="form-error"
                />
              </div>
              <button className="button" type="submit"> ENTRAR </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;