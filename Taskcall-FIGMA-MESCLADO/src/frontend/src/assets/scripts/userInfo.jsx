import randi_range from "./randint";

let nomes = [
    "Gustavo",
    "João",
    "Maria",
    "Ana",
    "Enzo",
    "Natan",
    "Lucas",
    "Gabriel",
    "Kauan",
    "Adilene"
]

let cargos = [
    "Professor",
    "Coordenador",
    "Diretor",
    "Secretário",
    "Aluno",
    "Funcionário",
];

let userInfo = {
    name: nomes[randi_range(0, nomes.length - 1)],
    // name:"Adilene",
    cargo: cargos[randi_range(0, cargos.length - 1)],
    // cargo:"Professor",
    uid: crypto.randomUUID(),
};

localStorage.setItem(
    "userInfo",
    JSON.stringify(userInfo)
);

const dados = localStorage.getItem("userInfo");
userInfo = JSON.parse(dados);

console.log(userInfo);

export default userInfo;

