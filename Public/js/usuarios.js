async function carregarUsuarios() {

    const resposta =
        await fetch("/api/usuarios");

    const usuarios =
        await resposta.json();

    console.log(usuarios);
}

carregarUsuarios();