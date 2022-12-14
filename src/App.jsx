import React, { useState } from "react";
import "./app.css";
import FormInput from "./components/FormInput";

import { inputs } from "./seccion/Inputs"
import { result } from "./seccion/Result"

const App = () => {
  const [values, setValues] = useState({
    tasa: 0,
    diasAdelantado: 0,
    impuestoBruto: 0,
    impuestoPrisma: 0,
    porcentaje: 0.8,
    cf: 0,
    promo: 0,
  });

  const [neto, setNeto] = useState(0);

  const [total, setTotal] = useState(0);

  const [impuestoPrisma, setmpuestoPrisma] = useState(0);

  function getImpuestoPrisma() {
    return values.impuestoBruto*values.porcentaje/100
  }

  function getNeto() {
    return values.impuestoBruto-(getImpuestoPrisma())-values.cf-values.promo
  }

  function getTotal() {
    return (((values.tasa/365)*values.diasAdelantado)*(getNeto()))/100
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    setmpuestoPrisma(getImpuestoPrisma())
    setNeto(getNeto()) 
    setTotal(getTotal())

  };

  const onChange = (e) => {
    try {    
      if(e.target === undefined){
        console.log(e.value)
        setValues({ ...values, porcentaje: parseFloat(e.value)})
      }else{
        setValues({ ...values, [e.target.name]: e.target.value });
      }
    } catch (error) { 
    }  };

 
  return (
    <div className="app">
      <div className="contenedor">
      <div className="logo"></div>
      <h1 className="titulo">Calculadora de Intereses<br></br>de Pago Expreso</h1>          
      <form className="formizquierda" onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <FormInput
            flag={true}
            impPrisma={values.impuestoPrisma}
            types={input.name === "porcentaje" ? "porcentaje": input.name === "impuestoPrisma" ? "impuestoPrisma" : "common"}
            key={input.id}
            {...input}
            onChange={onChange}
          />
        ))}
        <button>Calcular</button>
      </form>

      <form className="formderecha" onSubmit={handleSubmit}>
        {result.map((input) => (
          <FormInput
            flag={false}
            types="result"
            values={input.name === "Neto" ? neto: input.name === "Total" ? total : impuestoPrisma}
            readOnly="readonly"
            key={input.id}
            {...input}
            onChange={onChange}
          />
        ))}
      </form>
    </div>
    </div>
  );
};

export default App;
