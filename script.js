let c = {
    name: 'Carlos Matthew da Silva',
    max_life: 56,
    current_life: 56,
    class: 'Mago',
    lvl: 6,
    proficiency: 3,
    race: 'Human',
    movement: '9m/6q',
    alignment: "Chaotic Neutral",
    player: "2nitraM",
    att: {
        for: 9,
        des: 14,
        con: 18,
        int: 20,
        sab: 14,
        car: 11
    },
    saves: {
        for: false,
        des: false,
        con: false,
        int: true,
        sab: true,
        car: false
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
        lidar_com_animais: false,
        medicina: true,
        natureza: false,
        percepcao: true,
        persuasao: false,
        prestidigitacao: false,
        religiao: false,
        sobrevivencia: false
    }
}

const skills = {
    acrobacia: document.getElementById('acrobacia'),
    arcanismo: document.getElementById('arcanismo'),
    atletismo: document.getElementById('atletismo'),
    atuacao: document.getElementById('atuacao'),
    blefar: document.getElementById('blefar'),
    furtividade: document.getElementById('furtividade'),
    historia: document.getElementById('historia'),
    intimidacao: document.getElementById('intimidacao'),
    intuicao: document.getElementById('intuicao'),
    investigacao: document.getElementById('investigacao'),
    lidar_com_animais: document.getElementById('lidar_com_animais'),
    medicina: document.getElementById('medicina'),
    natureza: document.getElementById('natureza'),
    percepcao: document.getElementById('percepcao'),
    persuasao: document.getElementById('persuasao'),
    prestidigitacao: document.getElementById('prestidigitacao'),
    religiao: document.getElementById('religiao'),
    sobrevivencia: document.getElementById('sobrevivencia'),
}

function calculateSkills(){
    
}

// const calculate = setInterval(calculateSkills, 5000);