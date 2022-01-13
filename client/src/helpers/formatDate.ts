export default function formatDate(string: string) {
    const date = new Date(+string);

    let day = date.getDate();
    let month = date.getMonth();
    const year = date.getFullYear();

    if (month === 0) month += 1;

    return `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}/${year}`;
}
