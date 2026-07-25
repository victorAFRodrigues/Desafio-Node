const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer();

server.listen(port, hostname, () => {
    new ProvaTesteComponent()
});

export class ProvaTesteComponent {
	listLivros: Array<Livro> = []
	constructor() { 
		this.initLivros()
		this.criarUmNovoLivro("Arquitetura Limpa", "Tecnologia");
		this.criarUmNovoLivro("Harry Potter e a Camara secreta", "Fantasia");
		this.criarUmNovoLivro("WildCards", "Esportes");
		this.criarUmNovoLivro("O Trono do Sol", "Fantasia")
		console.log(this.listarLivrosFantasia())
	}

	initLivros(){
		this.listLivros.push({ id: 0, nome: 'Código Limpo', genero: "Tecnologia" })
		this.listLivros.push({ id: 1, nome: 'Senhor do Anéis', genero: "Fantasia" })
		this.listLivros.push({ id: 2, nome: 'WildCards', genero: "Fantasia" })
		this.listLivros.push({ id: 3, nome: 'Harry Potter e o Prisioneiro de Azkaban', genero: "Fantasia" })
		this.listLivros.push({ id: 4, nome: 'Javascript de alto desempenho', genero: "Tecnologia" })
		this.listLivros.push({ id: 5, nome: 'O poder da ação', genero: "Administração" })
	}

	/**
	 * Essa função cria livros na base utilizando o nome e o genero.
	 * @Returns: Retorna vazio ou uma string indicando que o livro já existe.
	 */
	criarUmNovoLivro(nome: string, genero: string): string | undefined {
		if (this.buscarLivro(nome, genero) === -1){
			const novoLivro: Livro = {
				id: this.listLivros.length,
				nome: nome,
				genero: genero
			} 

			this.listLivros.push(novoLivro)

			return;
		} else {
			/**
			 * Monte a mensagem de erro avisando que já existe um Livro cadastrado sobre o nome e genero passados
			 */
			// Retorna uma mensagem dizendo que o livro já existe no cadastro.
			return `O livro: ${nome} do genero: ${genero}, Já existe no cadastro de livros.`;
		}
	}


	/**
	 * Essa função busca livros na base utilizando o nome e o genero.
	 * @Returns: Retorna o indice do livro buscado ou −1 caso livro não exista na base
	 */
	buscarLivro(livro: string, genero: string): number{


		let indiceLivro: number = -1
		for (let index = 0; index < this.listLivros.length; index++) {
			const livro = this.listLivros[index]
			/**
             * Implemente a validação onde retorne o Indice do Livro caso encontre um com mesmo nome e genero
             */
			// verifica se o nome e o genero são estritamente iguais
			if(livro.nome === livro && livro.genero === genero){

				// Atribui valor do indice do livro a variável indiceLivro
				indiceLivro = livro.id
			}
		}
		return indiceLivro
	}

	/**
	 * Essa função filtra e lista todos os livros cadastrados na base.
	 * @Returns: Retorna uma lista de livros em string separados por "," ou uma mensagem indicando que não possuem livros de fantasia na lista.
	 */
	listarLivrosFantasia(): string{
		/**
		 * Retorne uma String contendo o nome de todos os Livros que são de fantasia.
		 */

		// Cria uma nova lista de livros filtrando apenas os livros que forem do genero Fantasia
		let livrosDeFantasia: Livro[] = this.listLivros.filter(livro => livro.genero === "Fantasia");

		// Faz um tratamento de erro, caso o filtro acima não retorne nada ele não processa o resto da função e devolve o feedback para o usuário.
		if(livrosDeFantasia.length <= 0){
			return "Não possuem livros de Fantasia cadastrados.";
		}

		// Retorna para o usuário uma string com os livros de fantasia
		return livrosDeFantasia
			.map((livro) => livro.nome)
			.join(", ");
	}
}

export interface Livro{
	id: number,
	nome: string,
	genero: string,
}

