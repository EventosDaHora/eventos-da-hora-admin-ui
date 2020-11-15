export class Montadata {
    public static montaDataHora(data: Date, hora: Date) : string {

        const date = data.toLocaleDateString('pt-BR');
        console.log(date)
        let horas: string | number = '00';
        let minutos: string | number = '00';

        if (hora) {
            horas = hora.getHours() < 10 ? "0" + hora.getHours() : hora.getHours();
            minutos = hora.getMinutes() < 10 ? "0" + hora.getMinutes() : hora.getMinutes();
        }
        return `${date}T${horas}:${minutos}`;
    }
}
