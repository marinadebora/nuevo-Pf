export const configAxios = ()=>{
    const localUser = localStorage.getItem('logueadoGoogle') /* || localStorage.getItem('loguearUsuario') */;
	console.log(localUser)
    const userActive = JSON.parse(localUser);
    let configAxios = {};
    if(userActive){
        configAxios ={
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userActive.token}`,
            },
        }
    };
    return configAxios;
}