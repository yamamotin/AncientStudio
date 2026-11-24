/* Footer console: a few honest commands, rendered as ASCII text. */
window.TP = window.TP || {};

(function (TP) {
  'use strict';

  var utils = TP.utils;
  var output = null;
  var input = null;

  function print(lines) {
    lines.forEach(function (text) { utils.line(output, text); });
  }

  var commands = {
    help: function () {
      print([
        '+------------------------------------------+',
        '| COMANDOS DISPONÍVEIS                     |',
        '+------------------------------------------+',
        '| help       | esta ajuda                  |',
        '| whoami     | quem sou eu                 |',
        '| skills     | stack técnica               |',
        '| experience | histórico profissional      |',
        '| projects   | projetos selecionados       |',
        '| contact    | e-mail e LinkedIn           |',
        '| cv         | currículos disponíveis      |',
        '| clear      | limpar o console            |',
        '+------------------------------------------+'
      ]);
    },

    whoami: function () {
      print([
        'Eron Yamamoto D. Justina',
        'Automation & Data Engineer',
        'Paranavaí, Brazil · Remote / LATAM'
      ]);
    },

    skills: function () {
      print([
        'Languages & data:  Python, SQL, Pandas, NumPy, Bash',
        'Automation & APIs: n8n, REST APIs, Webhooks, Web scraping',
        'Systems:           Linux, Git, Root Cause Analysis, Agile/Scrum',
        'Currently learning: Airflow, dbt, Docker-based data stacks, BigQuery'
      ]);
    },

    experience: function () {
      print([
        '2024 – 2026  Software & Integration Engineer, NextAge',
        '2023 – 2024  Systems & Integration Engineer, SigraWeb / Pinho',
        '2021 – 2023  Backend Developer & Fintech Integration Specialist, ControleNaMão',
        '2018 – 2021  Electrical Engineer & Project Coordinator, Ecollis Energia Solar'
      ]);
    },

    projects: function () {
      print([
        'brazil-trade-pipeline      Airflow, Docker, MinIO, Postgres, dbt, BigQuery (in progress)',
        'Foreign-trade tax API      SigraWeb / Pinho',
        'Delivery & payments        ControleNaMão',
        'Workflow automation        NextAge (Python/n8n + scraping)'
      ]);
    },

    contact: function () {
      print([
        'email:     yamah1337@gmail.com',
        'linkedin:  linkedin.com/in/eron-yamamoto-della-justina-bb3384156',
        'github:    TODO — username não informado'
      ]);
    },

    cv: function () {
      print([
        'EN (Data & AI)  assets/cv/Eron_Yamamoto_Resume_Data_AI_EN.pdf',
        'EN (geral)      assets/cv/Eron_Yamamoto_Resume_EN.pdf',
        'PT (Dados/IA)   assets/cv/Currículo - Eron Yamamoto D. Justina Dados_IA_Pleno.pdf',
        'PT (geral)      assets/cv/Eron_Yamamoto_Curriculo_BR_Pleno.pdf'
      ]);
    }
  };

  function run(rawValue) {
    var value = String(rawValue || '').trim();
    if (!value) return;
    utils.line(output, 'eron@production:~$ ' + value, 'info');
    var command = value.toLowerCase().split(/\s+/)[0];

    if (command === 'clear') {
      utils.clear(output);
      return;
    }

    if (Object.prototype.hasOwnProperty.call(commands, command)) {
      utils.beep(820);
      commands[command]();
    } else {
      print([
        'bash: ' + command + ': comando não encontrado',
        'Digite "help" para ver os comandos disponíveis.'
      ]);
    }
  }

  function init() {
    output = document.getElementById('console-output');
    input = document.getElementById('console-input');
    var form = document.getElementById('console-form');
    if (!output || !form || !input) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var value = input.value;
      input.value = '';
      run(value);
      input.focus();
    });
  }

  TP.console = { init: init, run: run, print: print };
})(window.TP);
