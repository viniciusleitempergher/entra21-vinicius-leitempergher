const db = require("./db");

const createDataBase = require("./createDataBase");
const insertClient = require("./insertClient");
const insertClients = require("./insertClients");
const insertPublishers = require("./insertPublishers");
const insertBooks = require("./insertBooks");
const getBooks = require("./getBooks");
const buy = require("./buy");
const getBuysPerClient = require("./getBuysPerClient");
const getbooksPerPublisher = require("./getBooksPerPublisher");
const getBuysPerDate = require("./getBuysPerDate");
const getBestClient = require("./getBestClient");

// let clientToInsert = {
//     nome: "vinicius",
//     email: "random@gmail.com",
//     telefone: "49 9 12341234",
//     numero_documento: 1234,
//     tipo_pessoa: "PF",
//     rua: "Rua Sem Saída",
//     numero: '201',
//     cidade: "Timbó",
//     estado: "SC",
//     cep: "89120000"
// };

let clientsToInsert = [{
    nome: "vinicius",
    email: "random@gmail.com",
    telefone: "49 9 12341234",
    numero_documento: 1234,
    tipo_pessoa: "PF",
    rua: "Rua Sem Saída",
    numero: '201',
    cidade: "Timbó",
    estado: "SC",
    cep: "89120000"
},
{
    nome: "edward",
    email: "random@gmail.com",
    telefone: "49 9 123412345",
    numero_documento: 3213,
    tipo_pessoa: "PF",
    rua: "Rua Bechaldraw",
    numero: '203',
    cidade: "Blumenau",
    estado: "SC",
    cep: "89120000"
},
{
    nome: "roger",
    email: "roger@gmail.com",
    telefone: "49 9 123411235",
    numero_documento: 3563,
    tipo_pessoa: "PF",
    rua: "Rua Bulgarwd",
    numero: '2056',
    cidade: "Timblemas",
    estado: "SC",
    cep: "89120000"
},
{
    nome: "leiaohf",
    email: "leiaiofh@gmail.com",
    telefone: "49 9 423412345",
    numero_documento: 43213,
    tipo_pessoa: "PF",
    rua: "Rua Biasgh",
    numero: '223',
    cidade: "Blumenau",
    estado: "SC",
    cep: "89120000"
}];

let publishersToInsert = [
    {
        nome_gerente: "Robbin",
        telefone: "47 9 12344321"
    },
    {
        nome_gerente: "Jessie",
        telefone: "47 9 12344321"
    },
    {
        nome_gerente: "James",
        telefone: "47 9 12344321"
    },
    {
        nome_gerente: "SEila",
        telefone: "47 9 42156321"
    },
    {
        nome_gerente: "Robbin",
        telefone: "47 9 66415666"
    }
];

let booksToInsert = [{
    isbn: "110 - 100 - 19204 - 182947",
    nome_autor: "Vini",
    assunto: "Nãoem",
    preco: 250,
    quantidade_estoque: 20,
    id_editora: "81703d77-d19e-4c72-93c5-4773d7e1589e"
},
{
    isbn: "110 - 928 - 19204 - 182947",
    nome_autor: "idiot",
    assunto: "inutilidade",
    preco: 25,
    quantidade_estoque: 15,
    id_editora: "463236bf-f1ac-4f6b-adeb-53e57cda51bd"
},
{
    isbn: "234 - 214 - 44221 - 1829472",
    nome_autor: "Mamamia",
    assunto: "PadreMadre",
    preco: 50,
    quantidade_estoque: 200,
    id_editora: "ce0b2294-4bce-4544-8353-cc47d0954810"
},
{
    isbn: "235 - 1256 - 19204 - 1829471",
    nome_autor: "Coaiwo",
    assunto: "Iawufh",
    preco: 75,
    quantidade_estoque: 70,
    id_editora: "712116b6-ab90-4c9e-8ee4-83e2d8e1f11e"
},
{
    isbn: "12356 - 12367 - 19204 - 23456",
    nome_autor: "Vini",
    assunto: "Nãoem",
    preco: 24.99,
    quantidade_estoque: 200,
    id_editora: "712116b6-ab90-4c9e-8ee4-83e2d8e1f11e"
}
];

(async () => {
    try {
        // 2
        await createDataBase(db);

        // 3
        // const [clientInserted, addressInserted] = await insertClient(db, clientToInsert);
        // console.log("Cliente Inserido: " + Object.values(clientInserted));
        // console.log("Endereço Inserido: " + Object.values(addressInserted));

        // 4
        // const clientsInserted = await insertClients(db, clientsToInsert);
        // console.log(clientsInserted);

        // 5
        // const publishersInserted = await insertPublishers(db, publishersToInsert);
        // console.log(publishersInserted);

        // 6
        // const booksInserted = await insertBooks(db, booksToInsert)
        // console.log(booksInserted);

        // 7
        // const booksSelected = await getBooks(db, ["110 - 100 - 19204 - 182947", "110 - 928 - 19204 - 182947", "12356 - 12367 - 19204 - 23456"]);
        // console.log(booksSelected);

        // 8
        // let buyInfo = {
        //     id_cliente: "c41a3cd7-a6bf-428a-a2a4-66a92a9ca856",
        //     livros: ["110 - 928 - 19204 - 182947", "234 - 214 - 44221 - 1829472"],
        //     data: "2021-08-12"
        // };
        // let buys = await buy(db, buyInfo);
        // console.log(buys);

        // 9
        // let buys = await getBuysPerClient(db, 'c41a3cd7-a6bf-428a-a2a4-66a92a9ca856')
        // console.log(buys);

        // 10
        // let booksOfPublisher = await getBooksPerPublisher(db, "712116b6-ab90-4c9e-8ee4-83e2d8e1f11e");
        // console.log(booksOfPublisher);

        // 11
        // let buysOfDate = await getBuysPerDate(db, '2021-08-12');
        // console.log(buysOfDate);

        // 12
        let bestClient = await getBestClient(db);
        console.log(bestClient.rows[0]);
    } catch (e) {
        console.log(e.message);
    } finally {
        db.end()
    }
})();