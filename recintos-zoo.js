class Especie {
    constructor(tamanho, carnivoro, biomas) {
        this.tamanho = tamanho;
        this.carnivoro = carnivoro;
        this.biomas = biomas;
    }
}

class Recinto {
    constructor(numero, bioma, tamanhoTotal, animais) {
        this.numero = numero;
        this.bioma = bioma;
        this.tamanhoTotal = tamanhoTotal;
        this.animais = animais;
    }
}

class RecintosZoo {

    especies = {
        LEAO: new Especie(3, true, ['savana']),
        LEOPARDO: new Especie(2, true, ['savana']),
        CROCODILO: new Especie(3, true, ['rio']),
        MACACO: new Especie(1, false, ['savana', 'floresta']),
        GAZELA: new Especie(2, false, ['savana']),
        HIPOPOTAMO: new Especie(4, false, ['savana', 'rio']),
    }
    recintos = [
        new Recinto(1, 'savana', 10, [{ quantidade: 3, especie: this.especies.MACACO }]),
        new Recinto(2, 'floresta', 5, []),
        new Recinto(3, 'savana e rio', 5, [{ quantidade: 1, especie: this.especies.GAZELA }]),
        new Recinto(4, 'rio', 8, []),
        new Recinto(5, 'savana', 9, [{ quantidade: 1, especie: this.especies.LEAO }])
    ]
    

    analisaRecintos(animal, quantidade) {
        const especie = this.especies[animal];

        if (!especie) return this.erro('Animal inválido')
        if (quantidade < 1) return this.erro('Quantidade inválida')
        
        const recintosCompativeis = this.filtrarRecintosCompativeis(especie);
        if (!recintosCompativeis.length) return this.erro('Não há recinto viável')


        return this.sucesso(recintosCompativeis);
    }

    filtrarRecintosCompativeis(especie) {
        const compativeis = []
        
        //Itera os recintos e, caso a espécie fique confortável, adiciona a lista
        for (let recinto of this.recintos) {
            if (!this.recintoEstaIncluso(recinto, especie)) continue;


            compativeis.push(recinto)
        }


        return compativeis;
    }

    recintoEstaIncluso(recinto, especie) {
        return especie.biomas.some(bioma => recinto.bioma.includes(bioma))
    }

    comportaCarnivoros(recinto, especie) {
        //regra para quando um animal for carnivoro
    }

    especieFicaConfortavel(recinto, especie) {
        //regras para cada espécie
    }

    erro(mensagem) {
        return {erro: mensagem}
    }

    sucesso(biomas) {
        return biomas.map(bioma => `Recinto ${bioma.numero} (espaço livre: XXX total: ${bioma.tamanhoTotal})`)
    }

}

export { RecintosZoo as RecintosZoo };

console.log(new RecintosZoo().analisaRecintos('LEAO', 1))
console.log(new RecintosZoo().analisaRecintos('LEOPARDO', 1))
console.log(new RecintosZoo().analisaRecintos('CROCODILO', 1))
console.log(new RecintosZoo().analisaRecintos('CROCODILO', 0))