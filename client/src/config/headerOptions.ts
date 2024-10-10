

//============funcion que trae el token============

const headerOptions = () => {
  const TOKEN = window.localStorage.getItem("token");
  if (!TOKEN) {
    throw new Error("Token no disponible");
  }
  //console.log("TOKEN:", JSON.parse(TOKEN));

  const options = {
    headers: {
      Authorization: `Bearer ${JSON.parse(TOKEN)}`, // Añade el token a la cabecera
    },
  };

  return options;
};

export { headerOptions };
