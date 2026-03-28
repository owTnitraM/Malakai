/* 
    Malakai Ver: 0.0.1
    JavaScript Ver: 0.0.1 
*/

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
    constructor(atributos, bonusProficiencia = 2, customSkillMap) {
        this.atributos = atributos;
        /* this.bonusProficiencia = bonusProficiencia; */

        /* this.proficientes = new Set(); // pericias nas quais o personagem é proficiente */

        this.bonusPericia = {}

        // mapa de perícias para atributos
        this.mapa = customSkillMap;

        this.standardSkillMap = {
            acrobacia: "dex",
            adestramento: "wis",
            arcanismo: "int",
            atletismo: "str",
            atuacao: "cha",
            blefar: "cha",
            furtividade: "dex",
            historia: "int",
            intimidacao: "cha",
            intuicao: "wis",
            investigacao: "int",
            medicina: "wis",
            natureza: "int",
            percepcao: "wis",
            persuasao: "cha",
            prestidigitacao: "dex",
            religiao: "int",
            sobrevivencia: "wis",
        }
    }

    calcularPericias() {
        for (const skill in this.mapa) {
            if (personagem.proficiencias.skills[skill]) {
                this.bonusPericia[skill] = personagem.atributos.getMod(this.mapa[skill]) + personagem.generalInfo.proficiencia;
            } else {
                this.bonusPericia[skill] = personagem.atributos.getMod(this.mapa[skill]);
            }
        }

    }


    /* // marcar perícia como proficiente
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
    } */
}

class Vida {
    constructor({ max, current }) {
        this.max = max;
        this.current = current;
    }

    add(v) {
        if (this.current == 0) { return }
        if (this.current + v > this.max) {
            this.current = this.max;
        } else {
            this.current += v;
        }
    }
    sub(v) {
        if (this.current - v <= 0) {
            this.current = 0;
            controller.ativarMorrendo();
        } else {
            this.current -= v;
        }
    }

    setCurrent(v) {
        this.current = v;
    }

    setMax(v) {
        this.max = v;
        if (this.max < 0) {
            this.max = 1;
        }
    }

    getCurrent() { return this.current; }
    getMax() { return this.max; }
    getPercentage() { return this.current / this.max * 100 }
}

class Proficiencias {
    constructor({ saves, skills }) {
        this.saves = saves;
        this.skills = skills;
    }
}

class Renderer {
    constructor() {
        this.basicInfo = {
            nome: document.getElementById('character-nome'),
            classe: document.getElementById('character-classe'),
            nivel: document.getElementById('character-classe'),
            raca: document.getElementById('character-raca'),
            antecedente: document.getElementById('character-antecedente'),
            tendencia: document.getElementById('character-tendencia'),
            jogador: document.getElementById('character-jogador')
        };

        this.generalInfo = {
            proficiencia: document.getElementById('proficiencia'),
            ca: document.getElementById('ca'),
            ca_mod: document.getElementById('ca-mod'),
            iniciativa: document.getElementById('iniciativa'),
            deslocamento: document.getElementById('deslocamento'),
            percepcao_passiva: document.getElementById('percepcao-passiva'),
            inspiracao: document.getElementById('inspiracao')
        };

        this.atributos = {
            raw: {
                str: document.getElementById("attr-str"),
                dex: document.getElementById("attr-dex"),
                con: document.getElementById("attr-con"),
                int: document.getElementById("attr-int"),
                wis: document.getElementById("attr-wis"),
                cha: document.getElementById("attr-cha"),
            },
            bonus: {
                str: document.getElementById("attr-bonus-str"),
                dex: document.getElementById("attr-bonus-dex"),
                con: document.getElementById("attr-bonus-con"),
                int: document.getElementById("attr-bonus-int"),
                wis: document.getElementById("attr-bonus-wis"),
                cha: document.getElementById("attr-bonus-cha")
            }
        };

        this.resistencias = {
            str: document.getElementById("res-str"),
            dex: document.getElementById("res-dex"),
            con: document.getElementById("res-con"),
            int: document.getElementById("res-int"),
            wis: document.getElementById("res-wis"),
            cha: document.getElementById("res-cha"),
        }

        this.vida = {
            current: document.getElementById('current-life'),
            max: document.getElementById('max-life'),
            bar_percentage: document.getElementById('life-bar-percentage'),

            quick_changer: document.getElementById('life-changer'),

            bar_contents: document.getElementById('death-saves-and-amounts'),
            death_saves: document.getElementById('death-saves'),
            heal_death: document.getElementById('heal-death'),

            life_dice: document.getElementById('dados-de-vida'),
            temp_life: document.getElementById('temp-life'),
        };

        this.pericias = {
            acrobacia: document.getElementById("Acrobacia"),
            adestramento: document.getElementById("Adestramento"),
            arcanismo: document.getElementById("Arcanismo"),
            atletismo: document.getElementById("Atletismo"),
            atuacao: document.getElementById("Atuação"),
            blefar: document.getElementById("Blefar"),
            furtividade: document.getElementById("Furtividade"),
            historia: document.getElementById("História"),
            intimidacao: document.getElementById("Intimidação"),
            intuicao: document.getElementById("Intuição"),
            investigacao: document.getElementById("Investigação"),
            medicina: document.getElementById("Medicina"),
            natureza: document.getElementById("Natureza"),
            percepcao: document.getElementById("Percepção"),
            persuasao: document.getElementById("Persuasão"),
            prestidigitacao: document.getElementById("Prestidigitação"),
            religiao: document.getElementById("Religião"),
            sobrevivencia: document.getElementById("Sobrevivência")
        };

    }

    render() {
        this.renderBasicInfo();
        this.renderGeneralInfo();
        this.renderVida();
        this.renderAtributos();
        this.renderResistencias();
        this.renderPericias();
    }

    renderBasicInfo() {
        this.basicInfo.nome.innerText = personagem.basicInfo.nome;
        this.basicInfo.classe.innerText = `${personagem.basicInfo.classe} ${personagem.basicInfo.nivel}`;
        this.basicInfo.raca.innerText = personagem.basicInfo.raca;
        this.basicInfo.antecedente.innerText = personagem.basicInfo.antecedente;
        this.basicInfo.tendencia.innerText = personagem.basicInfo.tendencia;
        this.basicInfo.jogador.innerText = personagem.basicInfo.jogador;
    }

    renderGeneralInfo() {
        this.generalInfo.proficiencia.innerText = `+${personagem.generalInfo.proficiencia}`;
        this.generalInfo.ca_mod.innerText = `+${personagem.generalInfo.ca_mod}`;
        this.generalInfo.ca.innerText = 10 + personagem.atributos.getMod('dex') + personagem.generalInfo.ca_mod;
        this.generalInfo.iniciativa.innerText = `+${personagem.atributos.getMod('dex')}`;
        this.generalInfo.deslocamento.innerText = personagem.generalInfo.deslocamento;
        /* this.generalInfo.percepcao_passiva.innerText = personagem.generalInfo.percepcao_passiva; */
        this.generalInfo.percepcao_passiva.innerText = 10 + personagem.pericias.bonusPericia.percepcao;
        this.generalInfo.inspiracao.innerText = personagem.generalInfo.inspiracao;
    }

    renderVida() {
        this.vida.current.innerText = personagem.vida.getCurrent();
        this.vida.max.innerText = personagem.vida.getMax();
        this.vida.bar_percentage.style.width = `${personagem.vida.getPercentage()}%`;
    }

    renderAtributos() {
        for (const attr in this.atributos.raw) {
            this.atributos.raw[attr].innerText = personagem.atributos.valores[attr];
            if (personagem.atributos.getMod(attr) > 0) {
                this.atributos.bonus[attr].innerText = `+${personagem.atributos.getMod(attr)}`;
            } else {
                this.atributos.bonus[attr].innerText = `${personagem.atributos.getMod(attr)}`;
            }
        }

    }

    renderResistencias() {
        for (const res in this.resistencias) {
            if (personagem.proficiencias.saves[res]) {
                if (personagem.atributos.getMod(res) + personagem.generalInfo.proficiencia > 0) {
                    this.resistencias[res].innerText = `+${personagem.atributos.getMod(res) + personagem.generalInfo.proficiencia}`;
                } else {
                    this.resistencias[res].innerText = personagem.atributos.getMod(res) + personagem.generalInfo.proficiencia;
                }

                this.resistencias[res].style.border = 'solid var(--logo-and-divider-color) 1px';

            } else {
                if (personagem.atributos.getMod(res) > 0) {
                    this.resistencias[res].innerText = `+${personagem.atributos.getMod(res)}`;
                } else {
                    this.resistencias[res].innerText = personagem.atributos.getMod(res);
                }

                this.resistencias[res].style.border = 'solid var(--tr-border-color) 1px';

            }
        }
    }

    renderPericias() {
        for (const pericia in personagem.pericias.bonusPericia) {
            if (personagem.pericias.bonusPericia[pericia] > 0) {
                this.pericias[pericia].innerText = `+${personagem.pericias.bonusPericia[pericia]}`;
            } else {
                this.pericias[pericia].innerText = personagem.pericias.bonusPericia[pericia];
            }

            if (personagem.proficiencias.skills[pericia]) {
                document.getElementById(`${this.pericias[pericia].id}-checkbox`).checked = true;
            } else {
                document.getElementById(`${this.pericias[pericia].id}-checkbox`).checked = false;
            }
        }
    }

    renderizarMorrendo() {
        this.vida.death_saves.style.display = 'flex';
        this.vida.heal_death.style.display = 'flex';
        this.renderVida();
    }


    desativarMorrendo() {
        this.vida.death_saves.style.display = 'none';
        this.vida.heal_death.style.display = 'none';
        this.renderVida();
    }
}

class Personagem {
    constructor(dados) {
        this.basicInfo = new BasicInfo(dados.basicInfo);
        this.generalInfo = new GeneralInfo(dados.generalInfo);
        this.atributos = new Atributos(dados.atributos);
        this.vida = new Vida(dados.vida);
        this.pericias = new Pericias(this.atributos, dados.generalInfo.proficiencia, dados.customSkillMap);
        this.proficiencias = new Proficiencias(dados.proficiencias)
    }
}

class Controller {
    constructor(personagem, renderer) {
        this.personagem = personagem;
        this.renderer = renderer;
        this.masterRendererCommand();
    }

    alterarVidaAtual(num) {
        this.personagem.vida.setCurrent(num);
        this.renderer.renderVida();
    }

    alterarVidaMaxima(num) {
        this.personagem.vida.setMax(num);
        this.renderer.renderVida();
    }

    masterRendererCommand() {
        this.renderer.render(this.personagem);
    }

    calcularPericias() {
        this.personagem.pericias.calcularPericias();
        this.masterRendererCommand();
    }

    causarDano(valor) {
        this.personagem.vida.sub(valor);
        this.masterRendererCommand();
    }

    curar(valor) {
        this.personagem.vida.add(valor);
        this.masterRendererCommand();
    }

    curarMorrendo() {
        this.personagem.vida.current = 1;
        renderer.desativarMorrendo();
    }

    ativarMorrendo() {
        this.renderer.renderizarMorrendo();
    }

    alterarAtributo(attr, valor) {
        this.personagem.atributos.set(attr, valor);
        this.calcularPericias()
    }

    changeSkillBaseAttribute(skillName, attribute) {
        this.personagem.pericias.mapa[skillName] = attribute;
        this.calcularPericias()
    }

}

let dados = {
    basicInfo: {
        nome: 'Carlos',
        classe: 'Mago',
        nivel: 6,
        raca: 'Humano',
        antecedente: 'Sábio',
        tendencia: 'Caótico Neutro',
        jogador: '2nitraM'
    },

    generalInfo: {
        proficiencia: 3,
        ca: 16,
        ca_mod: 2,
        iniciativa: 4,
        deslocamento: '9m/6q',
        percepcao_passiva: 15,
        inspiracao: ''
    },

    atributos: {
        str: 10, dex: 18, con: 18, int: 20, wis: 14, cha: 11
    },

    vida: {
        max: 56,
        current: 56
    },

    proficiencias: {
        saves: {
            str: false,
            dex: false,
            con: false,
            int: true,
            wis: true,
            cha: false
        },
        skills: {
            acrobacia: false,
            arcanismo: true,
            atletismo: false,
            atuacao: false,
            blefar: false,
            furtividade: false,
            historia: true,
            intimidacao: false,
            intuicao: true,
            investigacao: false,
            adestramento: false,
            medicina: true,
            natureza: false,
            percepcao: true,
            persuasao: false,
            prestidigitacao: true,
            religiao: false,
            sobrevivencia: false
        }
    },

    customSkillMap: {
        acrobacia: "dex",
        adestramento: "wis",
        arcanismo: "int",
        atletismo: "str",
        atuacao: "cha",
        blefar: "cha",
        furtividade: "dex",
        historia: "int",
        intimidacao: "cha",
        intuicao: "wis",
        investigacao: "int",
        medicina: "wis",
        natureza: "int",
        percepcao: "wis",
        persuasao: "cha",
        prestidigitacao: "dex",
        religiao: "int",
        sobrevivencia: "wis",
    }
}

let dados2 = {
    basicInfo: {
        nome: 'Nerine',
        classe: 'Bruxo',
        nivel: 10,
        raca: 'Meio-Elfo',
        antecedente: 'Artista',
        tendencia: 'Neutro Bom',
        jogador: 'Allan'
    },

    generalInfo: {
        proficiencia: 4,
        ca: 14,
        ca_mod: 2,
        iniciativa: 2,
        deslocamento: '9m/6q',
        percepcao_passiva: 15,
        inspiracao: ''
    },

    atributos: {
        str: 8, dex: 14, con: 16, int: 10, wis: 12, cha: 20
    },

    vida: {
        max: 83,
        current: 83
    },

    proficiencias: {
        saves: {
            str: false,
            dex: false,
            con: false,
            int: false,
            wis: true,
            cha: true
        },
        skills: {
            acrobacia: true,
            arcanismo: true,
            atletismo: false,
            atuacao: true,
            blefar: false,
            furtividade: false,
            historia: false,
            intimidacao: true,
            intuicao: false,
            investigacao: false,
            adestramento: false,
            medicina: true,
            natureza: false,
            percepcao: true,
            persuasao: false,
            prestidigitacao: false,
            religiao: false,
            sobrevivencia: false
        }
    },

    customSkillMap: {
        acrobacia: "dex",
        adestramento: "wis",
        arcanismo: "int",
        atletismo: "str",
        atuacao: "cha",
        blefar: "cha",
        furtividade: "dex",
        historia: "int",
        intimidacao: "cha",
        intuicao: "wis",
        investigacao: "int",
        medicina: "wis",
        natureza: "int",
        percepcao: "wis",
        persuasao: "cha",
        prestidigitacao: "dex",
        religiao: "int",
        sobrevivencia: "wis",
    }
}

const personagem = new Personagem(dados);
const renderer = new Renderer();
const controller = new Controller(personagem, renderer);
controller.calcularPericias()

function quickLifeControl(type, num) {
    if (type == 1) { controller.curar(num) }
    else { controller.causarDano(num) }
}

function changeTrProficiency(attr) {
    personagem.proficiencias.saves[attr] = !personagem.proficiencias.saves[attr];
    /* controller.calcularPericias(); */
    controller.masterRendererCommand();
}

function healDeath() {
    controller.curarMorrendo();
}

// Escuta a mudança de todas as checkbox para recalcular a proficiencia na pericia
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function (event) {

        const checkboxId = event.target.id
            .slice(0, -9)
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

        personagem.proficiencias.skills[checkboxId] = !personagem.proficiencias.skills[checkboxId];
        controller.calcularPericias();
    });
});

// Escuta por mudanças nos atributos para recalculas os bonus e pericias
const attribute_values = document.querySelectorAll('.attribute-value');

attribute_values.forEach(elemento => {
    elemento.addEventListener('focusout', (event) => {
        controller.alterarAtributo(`${event.target.id.slice(5)}`, event.target.innerText);
    });
});

/* const attribute_bonuses = document.querySelectorAll('.attribute-bonus');

 attribute_bonuses.forEach(elemento => {
    elemento.addEventListener('focusout', (event) => {
    });
}); */

const unfTable = {
    for: 'str',
    des: 'dex',
    con: 'con',
    int: 'int',
    sab: 'wis',
    car: 'cha'
}

const attribute_bonuses = document.querySelectorAll('.custom-select');

attribute_bonuses.forEach(elemento => {
    elemento.addEventListener('change', (event) => {
        const changedSkill = event.target.id
            .slice(0, -7)
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

        const attributeSelected = unfTable[event.target.value];

        controller.changeSkillBaseAttribute(changedSkill, attributeSelected);

    });
});

const life_numbers_listener = document.querySelectorAll('.life-numbers-forJS');

life_numbers_listener.forEach(elemento => {
    elemento.addEventListener('focusout', (event) => {
        if (event.target.id[0] == 'm') {
            controller.alterarVidaMaxima(event.target.innerText);
        } else {
            controller.alterarVidaAtual(event.target.innerText);
        }
    });
});