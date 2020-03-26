export class Extrato {
    id: string;
    description: string;
    value: string;
    status: number;

    constructor(id: string, description: string, value: string, status: number) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.status = status;
    }
}