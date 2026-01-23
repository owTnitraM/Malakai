class BasicInfo {
    constructor({ nome, classe, nivel, raca, antecedente, tendencia, jogador }) {
        this.nome = nome;
        this.classe = classe;
        this.nivel = nivel;
        this.raca = raca;
        this.antecedente = antecedente;
        this.tendencia = tendencia;
        this.jogador = jogador;
    }
}

class GeneralInfo {
    constructor({ proficiencia, ca, ca_mod, iniciativa, deslocamento, percepcao_passiva, inspiracao }) {
        this.proficiencia = proficiencia;
        this.ca = ca;
        this.ca_mod = ca_mod;
        this.iniciativa = iniciativa;
        this.deslocamento = deslocamento;
        this.percepcao_passiva = percepcao_passiva;
        this.inspiracao = inspiracao;
    }
}

class Atributos {
    constructor({ str, dex, con, int, wis, cha }) {
        this.valores = { str, dex, con, int, wis, cha };
    }

    getMod(attr) {
        return Math.floor((this.valores[attr] - 10) / 2);
    }

    set(attr, value) {
        this.valores[attr] = value;
    }
}

class Pericias {
    constructor(atributos, bonusProficiencia = 2) {
        this.atributos = atributos;
        this.bonusProficiencia = bonusProficiencia;

        this.proficientes = new Set(); // pericias nas quais o personagem é proficiente

        // mapa de perícias para atributos
        this.mapa = {
            atletismo: "str",
            acrobacia: "dex",
            furtividade: "dex",
            prestidigitacao: "dex",
            arcanismo: "int",
            historia: "int",
            investigacao: "int",
            natureza: "int",
            religiao: "int",
            adestrar_animais: "wis",
            intuicao: "wis",
            medicina: "wis",
            percepcao: "wis",
            sobrevivencia: "wis",
            atuacao: "cha",
            enganacao: "cha",
            intimidacao: "cha",
            persuasao: "cha"
        };
    }

    // marcar perícia como proficiente
    addProficiencia(pericia) {
        if (!(pericia in this.mapa)) {
            throw new Error(`Perícia inválida: ${pericia}`);
        }
        this.proficientes.add(pericia);
    }

    // remover proficiência
    removeProficiencia(pericia) {
        this.proficientes.delete(pericia);
    }

    // calcular o bônus final da perícia
    calcular(pericia) {
        const attr = this.mapa[pericia];
        if (!attr) throw new Error(`Perícia inválida: ${pericia}`);

        let bonus = this.atributos.getMod(attr);

        if (this.proficientes.has(pericia)) {
            bonus += this.bonusProficiencia;
        }

        return bonus;
    }
}

class Vida {
    #current;
    #max;

    constructor(max) {
        this.#max = max;
        this.#current = max;
    }

    add(v) { this.set(this.#current + v); }
    sub(v) { this.set(this.#current - v); }

    setCurrent(v) {
        this.#current = v;
    }

    setMax(v) {
        this.#max = v;
    }

    get current() { return this.#current; }
    get max() { return this.#max; }
}

class Renderer {
    constructor() {
        this.basicInfo = {
            nome: document.getElementById('character-nome'),
            classe: document.getElementById('character-classe'),
            nivel: document.getElementById('character-classe'),
            raca: document.getElementById('character-raca'),
            antecedente: document.getElementById('character-antecedente'),
            tendencia: document.getElementById('character-jogador'),
            jogador: document.getElementById('character-jogador')
        };

        this.generalIndo = {
            proficiencia: document.getElementById('proficiencia'),
            ca: document.getElementById('ca'),
            ca_mod: document.getElementById('ca-mod'),
            iniciativa: document.getElementById('iniciativa'),
            deslocamento: document.getElementById('deslocamento'),
            percepcao_passiva: document.getElementById('percepcao-passiva'),
            inspiracao: document.getElementById('inspiracao')
        };

        this.atributos = {
            str: document.getElementById("attr-str"),
            dex: document.getElementById("attr-dex"),
            con: document.getElementById("attr-con"),
            int: document.getElementById("attr-int"),
            wis: document.getElementById("attr-wis"),
            cha: document.getElementById("attr-cha")
        };

        this.vida = {
            current: document.getElementById('current-life'),
            max: document.getElementById('max-life'),
            bar_percentage: document.getElementById('life-bar-percentage'),

            quick_changer: document.getElementById('life-changer'),

            life_dice: document.getElementById('dados-de-vida'),
            temp_life: document.getElementById('temp-life'),
            death_saves: document.getElementById('death-saves')
        };

        this.Pericias = {
            acrobacia: document.getElementById("Acrobacia"),
            adestramento: document.getElementById("Adestramento"),
            atletismo: document.getElementById("Atletismo"),
            furtividade: document.getElementById("Furtividade"),
            prestidigitacao: document.getElementById("Prestidigitação"),
            arcanismo: document.getElementById("Arcanismo"),
            historia: document.getElementById("História"),
            investigacao: document.getElementById("Investigação"),
            natureza: document.getElementById("Natureza"),
            religiao: document.getElementById("Religião"),
            intuicao: document.getElementById("Intuição"),
            medicina: document.getElementById("Medicina"),
            percepcao: document.getElementById("Percepção"),
            sobrevivencia: document.getElementById("Sobrevivência"),
            atuacao: document.getElementById("Atuação"),
            enganacao: document.getElementById("Enganação"),
            intimidacao: document.getElementById("Intimidação"),
            persuasao: document.getElementById("Persuasão")
        };

    }

    render(personagem) {

    }

    renderBasicInfo(personagem) {
        /* this.nome.innerText = p.info.nome;
        this.nivel.innerText = p.info.nivel; */
    }

    renderGeneralInfo(personagem) {
        /* this.nome.innerText = p.info.nome;
        this.nivel.innerText = p.info.nivel; */
    }

    renderVida(personagem) {
        /* this.vidaAtual.innerText = p.vida.current;
        this.vidaMax.innerText = p.vida.max;
        this.vidaBarra.style.width = `${p.vida.current / p.vida.max * 100}%`; */
    }

    renderAtributos(personagem) {
        /* for (const attr in this.atributos) {
            this.atributos[attr].innerText = p.atributos.valores[attr];
        } */
    }

    renderPericias(personagem) {
        /* for (const attr in this.atributos) {
            this.atributos[attr].innerText = p.atributos.valores[attr];
        } */
    }
}

class Personagem {
    constructor(dados) {
        this.basicInfo = new BasicInfo(dados.info);
        this.generalIndo = new GeneralInfo(dados.info);
        this.atributos = new Atributos(dados.atributos);
        this.vida = new Vida(dados.vidaMax);
        this.pericias = new Pericias(this.atributos);
    }
}

class Controller {
    constructor(personagem, renderer) {
        this.personagem = personagem;
        this.renderer = renderer;
        this.render();
    }

    render() {
        this.renderer.render(this.personagem);
    }

    causarDano(valor) {
        this.personagem.vida.sub(valor);
        this.render();
    }

    curar(valor) {
        this.personagem.vida.add(valor);
        this.render();
    }

    alterarAtributo(attr, valor) {
        this.personagem.atributos.set(attr, valor);
        this.render();
    }
}

const personagem = new Personagem(dados);
const renderer = new Renderer();
const controller = new Controller(personagem, renderer);

controller.curar(2)