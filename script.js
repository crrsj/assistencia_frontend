function cadastrarRegistro(nome,fone,email,marca,modelo,polegadas,smart,descricao,dataEntrega,valor,status) {
    
    // Captura os valores do formulário
    
    var  nome = document.getElementById("nome").value;
    var  fone = document.getElementById("fone").value;
    var  email = document.getElementById("email").value;
    var  marca = document.getElementById("marca").value;
    var  modelo = document.getElementById("modelo").value;
    var  polegadas = document.getElementById("polegadas").value;
    var  smart = document.getElementById("smart").value;
    var  descricao = document.getElementById("descricao").value;
    var  dataEntrega = document.getElementById("dataEntrega").value;
    var  valor = document.getElementById("valor").value;
    var  status = document.getElementById("status").value;
   // validarFormulario();
   
    // Cria um objeto com os dados a serem enviados
    var data = {
        
        nome: nome,
        fone: fone,
        email: email,
        marca: marca,
        modelo: modelo,
        polegadas: polegadas,
        smart: smart,
        descricao: descricao,
        dataEntrega: dataEntrega,
        valor: valor,
        status: status
        
    };

    // Envia os dados para o servidor
    fetch('http://localhost:8080/assistencia', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao cadastrar registro.');
            
        }
        return response.json();
    })
    .then(data => {
        console.log( 'Registro cadastrado com sucesso:', data);
        alert("Cadastro realizado com sucesso !")
        fetchDataAndPopulateTable();
    })
    .catch(error => {
        console.error('Erro:', error);
    });
    
     document.getElementById("nome").value ="";
     document.getElementById("fone").value ="";
     document.getElementById("email").value ="";
     document.getElementById("marca").value ="";
     document.getElementById("modelo").value ="";
     document.getElementById("polegadas").value ="";
     document.getElementById("smart").value ="";
     document.getElementById("descricao").value ="";
     document.getElementById("dataEntrega").value ="";
     document.getElementById("valor").value ="";
     document.getElementById("status").value ="";
   
}


    function validarFormulario() { 
    
    var nome = document.getElementById('nome').value;
    var fone = document.getElementById('fone').value;
    var email = document.getElementById('email').value;
    var marca = document.getElementById('marca').value;
    var modelo = document.getElementById('modelo').value;
    var polegadas =  document.getElementById('polegadas').value;
    var smart = document.getElementById('smart').value;
    var descricao = document.getElementById('descricao').value;
    var entrega = document.getElementById('dataEntrega').value;
    var valor = document.getElementById('valor').value;
    var status = document.getElementById("status").value;

    
    if (nome === '') {
        alert('Por favor, preencha o campo Nome.');
        return false;
    }
    if (fone === '') {
        alert('Por favor, preencha o campo Telefone.');
        return false;
    }
    if (email === '') {
        alert('Por favor, preencha o campo email.');
        return false;
    }
    if (marca === '') {
        alert('Por favor, preencha o campo marca.');
        return false;
    }

    if (modelo === '') {
        alert('Por favor, preencha o campo modelo.');        
        return false;
    }
    if (polegadas === '') {
        alert('Por favor, preencha o campo polegadas.');
        return false;
    }

    if (smart === '') {
        alert('Por favor, preencha o campo smart.');
        return false;
    }
    if (descricao === '') {
        alert('Por favor, preencha o campo descricao.');
        return false;
    }
    
    if (dataEntrega === '') {
        alert('Por favor, preencha o campo entrega.');
        return false;
    }

    if (valor === '') {
        alert('Por favor, preencha o campo valor.');
        return false;
    }
    
    if (status === '') {
        alert('Por favor, preencha o campo status.');
        return false;
    }
    
     cadastrarRegistro(nome,fone,email,marca,modelo,polegadas,smart,descricao,entrega,valor,status);

    
    return true;
    }

    // Função para buscar dados da API e preencher a tabela
  async function fetchDataAndPopulateTable() {
    try {
      // Substitua 'URL_DA_SUA_API' pela URL real da sua API
      const response = await fetch( 'http://localhost:8080/assistencia');
      const data = await response.json();

      // Limpa a tabela antes de inserir novos dados
      const tbody = document.querySelector('#tabela tbody');
      tbody.innerHTML = '';

      // Preenche a tabela com os dados recebidos da API
      data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td><a href="#" onclick="preencherFormulario(${item.id});">${item.id}</a></td>
          <td>${item.dataEntrada}</td> 
          <td>${item.ordem}</td>          
          <td>${item.nome}</td>       
          <td>${item.fone}</td>        
          <td>${item.email}</td>
          <td>${item.marca}</td>
          <td>${item.modelo}</td>
          <td>${item.polegadas}</td> 
          <td>${item.smart}</td> 
          <td>${item.descricao}</td>           
          <td>${item.dataEntrega}</td> 
          <td>${item.valor}</td>                       
          <td>${item.status}</td> 
          <td><button  class="btn btn-danger" onclick="deletarRegistro(${item.id})">Excluir</button></td>`;
          
          tbody.appendChild(row);
      });
    } catch (error) {
      console.error('Erro ao buscar e preencher dados:', error);
    }
  }
  document.addEventListener('DOMContentLoaded', () => {
  // Chama a função para buscar e preencher os dados quando a página carrega
   fetchDataAndPopulateTable();
});

/*
    async function buscarDados(id) {
    try { 
        // URL da API, substitua pela sua URL
        const response = await fetch(`http://localhost:8080/assistencia/${id}`);

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao buscar dados');
        }

        // Converte a resposta em JSON
        const data = await response.json();
        



document.getElementById('id').value = data.id;
document.getElementById('dataEntrada').value = data.dataEntrada;
document.getElementById('ordem').value = data.ordem;
document.getElementById('nome').value = data.nome;
document.getElementById('fone').value = data.fone;  
document.getElementById('email').value = data.email;
document.getElementById('marca').value = data.marca;
document.getElementById('modelo').value = data.modelo;
document.getElementById('polegadas').value = data.polegadas; 
document.getElementById('smart').value = data.smart;
document.getElementById('descricao').value = data.descricao;
document.getElementById('dataEntrega').value = data.dataEntrega;
document.getElementById('valor').value = data.valor;
document.getElementById('status').value = data.status;

} catch (error) {
console.error('Erro:', error);
}
}
   */


    function preencherFormulario(id) {
    // URL da API com o ID do usuário
    const url = `http://localhost:8080/assistencia/${id}`;

    // Faz a requisição com fetch
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao buscar os dados do usuário");
            }
            return response.json(); // Converte a resposta para JSON
        })
        .then(dadosCliente => {
            document.getElementById("id").value = dadosCliente.id;            
            document.getElementById("dataEntrada").value = dadosCliente.dataEntrada;
            document.getElementById("ordem").value = dadosCliente.ordem;
            document.getElementById("nome").value = dadosCliente.nome;
            document.getElementById("fone").value = dadosCliente.fone;
            document.getElementById("email").value = dadosCliente.email;
            document.getElementById("marca").value = dadosCliente.marca;
            document.getElementById("modelo").value = dadosCliente.modelo;
            document.getElementById("polegadas").value = dadosCliente.polegadas;
            document.getElementById("smart").value = dadosCliente.smart;
            document.getElementById("descricao").value = dadosCliente.descricao;
            document.getElementById("dataEntrega").value = dadosCliente.dataEntrega;
            document.getElementById("valor").value = dadosCliente.valor;
            document.getElementById("status").value = dadosCliente.status;


            alert("Formulário preenchido com sucesso!");
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Usuário não encontrado ou erro na requisição!");
        });
}

  

async function updateUserData() {    
    const idInput = document.getElementById('id');    
    const nomeInput = document.getElementById('nome');    
    const foneInput = document.getElementById('fone');
    const emailInput = document.getElementById('email');    
    const marcaInput = document.getElementById('marca');
    const modeloInput = document.getElementById('modelo');   
    const polegadasInput = document.getElementById('polegadas');   
    const smartInput = document.getElementById('smart');
    const descricaoInput = document.getElementById('descricao'); 
    const dataEntregaInput = document.getElementById('dataEntrega');  
    const valorInput = document.getElementById('valor');   
    const statusInput = document.getElementById('status');   
      
    const updateId =  idInput.value   
    const updateNome =  nomeInput.value   
    const updateFone = foneInput.value
    const updateEmail = emailInput.value
    const updateMarca = marcaInput.value
    const updateModelo = modeloInput.value
    const updatePolegadas = polegadasInput.value 
    const updateSmart = smartInput.value
    const updateDescricao = descricaoInput.value
    const updateDataEntrega = dataEntregaInput.value
    const updateValor = valorInput.value
    const updateStatus = statusInput.value 
    


  
    try {
      const response = await fetch(`http://localhost:8080/assistencia/atualizar`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: updateId,
          nome: updateNome,        
          fone: updateFone,
          email: updateEmail,
          marca: updateMarca,
          modelo: updateModelo,
          polegadas: updatePolegadas,
          smart: updateSmart,
          descricao: updateDescricao,
          dataEntrega: updateDataEntrega,
          valor: updateValor,
          status: updateStatus
          
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
      }
  
      alert('Registro atualizado com sucesso!');
      fetchDataAndPopulateTable();          
    } catch (error) {
      console.error(`Erro durante a atualização do registro: ${error.message}`);
    }
    document.getElementById("nome").value = "";
    document.getElementById("fone").value ="";
    document.getElementById("email").value ="";
    document.getElementById("marca").value ="";
    document.getElementById("modelo").value ="";
    document.getElementById("polegadas").value ="";
    document.getElementById("smart").value ="";
    document.getElementById("descricao").value ="";
    document.getElementById("dataEntrega").value ="";
    document.getElementById("valor").value ="";
    document.getElementById("status").value ="";
  }


  async function deletarRegistro(id) {
    try {
      // Substitua 'URL_DA_SUA_API' pela URL real da sua API para deletar
      const response = await fetch(`http://localhost:8080/assistencia/deletar/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Adicione cabeçalhos adicionais, se necessário
        },
      });
        //alert("Tem certeza que deseja deletar esta resercva?");
      if (response.ok) {
        console.log(`Registro com ID ${id} deletado com sucesso.`);
        // Atualiza a tabela após a exclusão
        fetchDataAndPopulateTable();
      } else {
        console.error('Erro ao deletar registro:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao deletar registro:', error);
    }
  }
   


  
