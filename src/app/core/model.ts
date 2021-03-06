
export class Estado{
  id: number;
  nome: string;
}

export class Cidade{
  id: number;
  nome: string;
  estado = new Estado();
}

export class Endereco{
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade = new Cidade();
}


export class Pessoa{
  id: number;
  nome: string;
  ativo: boolean = true;
  endereco = new Endereco();
  contatos = new Array<Contato>();
}

export class Categoria{
  id: number;
}

export class Lancamento {
  id: number;
  tipo = 'RECEITA';
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  pessoa = new Pessoa();
  categoria = new Categoria();
  anexo : string;
  urlAnexo: string;
}

export class Contato{
  id: number;
  nome: string;
  email: string;
  telefone : string;

  constructor(id? : number, nome? : string, email? : string, telefone? : string){
    if(id) this.id = id;
    if(nome) this.nome = nome;
    if(email) this.email = email;
    if(telefone) this.telefone = telefone;
  }
}
