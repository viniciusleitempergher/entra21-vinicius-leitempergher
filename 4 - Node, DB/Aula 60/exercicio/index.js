const db = require("./db");

const createDataBase = require("./createDataBase");
const insertClient = require("./insertClient");

let clientToInsert = {
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
};

(async () => {
    try {
        await createDataBase(db);

        const [clientInserted, addressInserted] = await insertClient(db, clientToInsert);
        console.log("Cliente Inserido: " + Object.values(clientInserted));
        console.log("Endereço Inserido: " + Object.values(addressInserted));

        
    } catch (e) {
        console.log(e.message);
    } finally {
        db.end()
    }
})();