/* eslint-disable no-unreachable */
const FormatDate = (date: string) => {
    let newDate = new Date(date);
    let dateMonth = newDate.getMonth() + 1;
    let day = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();
    let year = newDate.getFullYear();

    switch(dateMonth) {
        case 1: 
         return `${day} de Janeiro de ${year}`;
        break;
        case 2: 
         return `${day} de Fevereiro de ${year}`;
        break;
        case 3: 
         return `${day} de Maio de ${year}`;
        break;
        case 4: 
         return `${day} de Abril de ${year}`;
        break;
        case 5: 
         return `${day} de Março de ${year}`;
        break;
        case 6: 
         return `${day} de Junho de ${year}`;
        break;
        case 7: 
         return `${day} de Julho de ${year}`;
        break;
        case 8: 
         return `${day} de Agosto de ${year}`;
        break;
        case 9: 
         return `${day} de Setembro de ${year}`;
        break;
        case 10: 
         return `${day} de Outubro de ${year}`;
        break;
        case 11: 
         return `${day} de Novembro de ${year}`;
        break;
        case 12: 
         return `${day} de Dezembro de ${year}`;
        break;
    }

}

export default FormatDate;
