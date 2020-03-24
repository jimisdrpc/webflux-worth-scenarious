export class Extrato {
    id: string;
    descricao: string;
    valor: string;

    constructor(id: string, descricao: string, valor: string) {
        this.id = id;
        this.descricao = descricao;
        this.valor = valor;
    }
}