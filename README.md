
# Sistema Solar em Escala.

Esta é uma ferramenta de auxílio a professores e alunos para compreensão das dimensões relativas do tamanho dos planetas em relação ao Sol e da distância orbital dos planetas. 

<p color="black" align="center">  <img src=https://github.com/earmarques/escala-sistema-solar/blob/main/images/devs/family-album.png width=60%></p>

As dimensões envolvidas na Astronomia são tão grandes e tão fora do cotidiano humano que é difícil e por vezes até impossível de imaginar algo tão grande como o chamado universo observável. 

As ilustrações que vemos quase por regra estão totalmente fora de escala. Júpiter é tão maior que mercúrio que por vezes os livros didáticos modificam o tamanho de um em relação ao outro para termos ambos na mesma figura. 
<br>Se há um ganho por um lado de podermos ver detalhes da superfície dos dois na mesma ilustração, temos em contrapartida a perda na real dimensão entre eles - sabemos que Jupiter é maior que Mercúrio, mas não ao certo o quanto é maior realmente.

Com essa ferramenta podemos trazer o Sol, os planetas e as distâncias orbitais às dimensões humanas e assim termos uma noção mais correta das escalas do sistema solar. A ideia basica é: se o Sol tivesse um metro, quantos centímetros teria a Terra? Ou quantas vezes Netuno está mais longe do Sol do que a Terra?

A Documentação está dividida em duas seções com focos bem distintos. A Seção [Para Professores](https://github.com/earmarques/escala-sistema-solar/wiki/Para-Professores) é dirigida aos docentes, explicando como utilizar a ferramenta e sugestões de uso com os alunos. Já a outra seção [Para Desenvolvedores](https://github.com/earmarques/escala-sistema-solar/wiki/Para-Desenvolvedores) é para aqueles que querem entender como a ferramenta foi desenvolvida, aos programadores que queiram modificar o sofware e fazer melhorias.


### Contexto

Este projeto foi apresentado ao Professor Dr. Lucimar Sasso como trabalho final da disciplina Programação em Microinformática no 1°período do curso Análise e Desenvolvimento de Sistema junto a Fatec de São José do Rio Preto/SP. O professor propós a confecção de um site que envolvesse tudo o que havíamos visto na disciplina: HTML, CSS, Bootstrap, JavaScript e JQuery. 

Ao invés de fazer um site com várias páginas de algum consultório odontológico ou escritório de advocacia, resolvi criar uma única página, mas que fosse rica em JavaScipt e na qual pudesse aplicar as tecnologias que estava estudando. Sou professor de Física e estava na ocasião lecionando Astronomia para minhas turmas do 1°ano do Ensino Médio da escola José Felício Miziara, de São José do Rio Preto/SP. A sequência didática que fiz junto aos alunos pode ser vista na seção [Para Professores](https://github.com/earmarques/escala-sistema-solar/wiki/Para-Professores). 

---

## Apresentação

Podemos identificar na figura abaixo quatro blocos de elementos principais.

***OBS.:*** Aqui não será falado sobre a semântica ou da finalidade. Isso está na seção [Para Professores](https://github.com/earmarques/escala-sistema-solar/wiki/Para-Professores#contexto).
<br>Aqui vamos falar só de elemento html e de seu comportamento.

<img src=https://github.com/earmarques/escala-sistema-solar/blob/main/images/devs/projeto.png width=60%><br>_Figura 1: Visão geral_


### _Bloco 1_: Imagem do sistema solar
O primeiro é estático e está na parte superior, onde temos o _album de família_ do sistema solar nas proporções relativas corretas. A imagem possui um mapeamento que escreve logo acima da imagem o nome do planeta em que o ponteiro do mouse estiver em cima. No caso da imagem, o mouse estava sobre o planeta Neturno.   

<img src=https://github.com/earmarques/escala-sistema-solar/blob/main/images/devs/family-album.png width=80%><br>_Figura 2: Sol e planetas na escala real_


Os demais blocos são os dinâmicos, pois têm muito JavaScript em seu comportamento. 

### _Bloco 2_: Tabela de dados

Na tabela temos os dados dos planetas. A medida que o mouse passa por cima da linha ela é destacada. Isso foi feito com Javascript puro, não foi usada nenhuma biblioteca. Lembrando que estavamos estudando, queríamos entender como o JS manipula os elementos html por debaixo do capô. 

Clicando na tabela, a a linha selecionada é destacada e dispara um evento em que o campo _Planeta Selecionado_ é atualizado e através do _design pattern Observer_ o bloco 3 da seleção do tipo de cálculo e toda a conta do bloco 4 da regra de 3 é atualizado. A modelagem com os padrões MVM e _Observer_ será explicado na seção Desenvolvimento.

<img src=https://github.com/earmarques/escala-sistema-solar/blob/main/images/devs/astro-selecionadoverde.png width=60%><br>_Figura 3: Sincronismo entre tabela e elementos dos demais blocos_

### _Bloco 3_: Cálculo desejado  
Este bloco e o seguinte estão inicialmente ocultados na página. Após a primeira seleção de uma linha da tabela o bloco de _Escolha o cálculo que deseja realizar_ é revelado. Num primeiro momento apenas duas abas são mostradas, aguardando que o usuário escolha qual cálculo deseja realizar. As abas estão sem destaque e com fundo preto indicando que nehuma aba ainda fora selecionada. 

<img src=https://github.com/earmarques/escala-sistema-solar/blob/main/images/devs/bloco3a.png width=50%><br>_Figura 4: Abas de seleção da regra de 3_

Se o usuário clicar na aba _Diâmetro do Planeta_ um pequeno painel mostrando conversão de unidades para notação científica é mostrado e com um pequeno atraso a regra de 3 é exibida. A fonte do texto muda para negrito e na cor branca, com o fundo em vinho na mesma cor do panel da notação científica e com borda dando a noção de continuidade e evidenciando qual aba foi selecionada.

<img src=https://github.com/earmarques/escala-sistema-solar/blob/main/images/devs/bloco3b.png width=50%><br>_Figura 5: Aba diâmetro selecionada, painel de unidades regra de 3 exibida_

Se o usuário selecionar a aba _Distância do Planeta ao Sol_ o bloco da regra de 3 é ocultado e é oferecido ao usuário duas opções em _radio buttom_ para que possa escolher com qual base de referência deseja fazer a conta. Ao passar com o mouse em cima a opção é destacada. 

<img src=https://github.com/earmarques/escala-sistema-solar/blob/main/images/devs/bloco3c.png width=50%><br>_Figura 6: Painel de seleção da distância orbital_

Uma vez que o usuário tenha feito sua escolha o bloco de regra de 3 é exibido fazendo a conta com a escolha correspondente. 
<br>A exibição e ocultação apresenta uma animação com a biblioteca JQuery, mas tudo o mais foi feito com JavaScript puro manipulando css do elementos html.

### _Bloco 4_: Regra de 3
O único elemento ativo e que reflete alterações somente sobre o próprio bloco é a caixa de seleção que vai de 1 a 10. Ao selecionar um número todo o cálculo é atualizado.

<img src=https://github.com/earmarques/escala-sistema-solar/blob/main/images/devs/regra3.png width=50%><br>_Figura 7: Cálculo de proporções_

---

## Modelagem dos dados da tabela

  Os atributos nome, diametro e distância são constantes, então devemos encapsular em uma classe singleto de tipo enum, só há um planeta com propriedades constantes. Mas não há build-in's para enum em Javascript. Foi preciso configurar uma classe para que tivesse a imutabilidade(Enum in JavaScript) e como foi aplicado.

### Enum in JavaScript

  _JavaScript_ possui recursos incríveis como `closure` e a possibilidade de passar função como argumento, 
mas senti falta de outros, como um suporte nativo a Enum, como tem minha linguagem mãe Java. 
<br>
  Em Java os enums são um tipo de singleto, podendo ter até métodos de instância. Só pode haver um objeto do tipo definido na classe na RAM. 
<br>E são objetos imutáveis, em referência de memória e a seus atributos(properties) constantes em cascata nas dependências.

  A classe `Object` é a classe base do Java e do JavaScript para definição de classe, no caso, chegamos num nível onde ajustamos o default da instanciação da classe `Object`. `Object.defineProperty` é um método de classe que atua sobre o umbigo do objeto passado como parâmetro - no código abaixo, a referência `this`. `initEnum` bloqueia os elementos da coleção de objetos e ao `#extrairValoresDosObjetos()`, cada propriedade de cada objeto é também bloqueada no método `#adicionarValorEnum()`. 

  

```js

class Enum {
  static initEnum(objetos) {
    Object.defineProperty(this, 'valoresEnum', {
      value: [],
      configurable: false,
      writable: false,
      enumerable: true,
    });
    this.extrairValoresDosObjetos(objetos);

    Object.freeze(this.valoresEnum);
  }

...

```

Por fim congelamos a própria coleção com `Object.freeze()`, não permitindo que novos objetos ou propriedades sejam adicionados a coleção, e previne que algum objetos seja removido ou alterado.  

A classe mãe (abstract_inJS?) `Enum` deverá ser extendida a fim de que os objetos da classe filha sejam constantes imutáveis. Está classe, pretendida a ser uma classe abstrata, possui o método de classe (static) `#initEnum()` por onde um vetor de objetos deverá ser passado com todos de uma vez - não é permitido adicionar ou remover objetos depois(imutable).
Depois de pronto, teremos uma vetor imutável de objetos imutáveis. A ideia é torná-los como se fossem atributos membros de classe e não de objetos.

```js

  /**
   *   Recebe uma coleção de objetos, os transformam em objetos imutáveis e armazena em um
   * vetor também imutável.
   */

```

#### JS trava propriedades de objetos ajustando três características(_config properties_):

```js

  /**
   *   Primeiramente dexamos a nossa coleção de objetos fixa, ninguém entra, ninguém sai.
   * Fazemos isso definindo a propriedade 'valoresEnum' como um vetor imutável.
   *
   *   Devemos passar todos os objetos ao vetor(coleção) de uma só vez, porque depois de criado,
   * não será permitdo adicionar novos ou remover existentes (writable:false no []),
   * muito menos tentar alterar o atributo 'writable' da propriedade '[] - vetor', porque
   * estamos fazendo o atributo de propriedade 'configurable' igual a false.
   */

```
```js

...

  static extrairValoresDosObjetos(objetos) {
    for (let chave of Object.keys(objetos)) {
      let valor = objetos[chave];
      this.adicionarValorEnum(valor, chave);
    }
  }

  static adicionarValorEnum(valorEnum, nome) {
    Object.defineProperty(this, nome, {
      value: valorEnum,
      configurable: false,
      writable: false,
      enumerable: true,
    });
    this.valoresEnum.push(valorEnum);
  }

```


### Aplicando enum no código

`Astro`, `Calculo` e `BaseReferencia` são os objetos que vamos trancar no método <kbd>#adicionarValorEnum</kbd>. São eles que entrarão no vetor ('[]') do enum.

```js
class Astro {
  constructor(nome = "Astro", diametro = 0, distancia = 0) {
    this.nome = nome;
    this.diametro = diametro;
    this.distancia = distancia;
  }
...

class Calculo {
  constructor(tipo) {
    this.tipo = tipo;
  }
...

class BaseReferencia {
  constructor(descricao, id) {
    this.descricao = descricao;
    this.id = id;
  }

```

  Declara e inicializa a coleção interna de Astro, de Calculo e BaseReferencia. `ASTROS`, `CALCULO` `BASE` são os enum com um conjunto fixos (<kbd>Object.freeze</kbd>) de objetos imutáveis (<kbd>Object.defineProperty</kbd>). 

```js
// Inicialização do Controller  -------------------------------------------------------------------------------

function init() {

  // Inicializandos os Enum's

  ASTROS.initEnum({
    SOL:      new Astro('Sol',      1.39e6,    0),
    MERCURIO: new Astro('Mercúrio', 4.879e3,   5.79e7),
    VENUS:    new Astro('Vênus',    1.2104e4,  1.082e8),
    TERRA:    new Astro('Terra',    1.2756e4,  1.496e8),
    LUA:      new Astro('Lua',      3.475e3,   3.84e5),
    MARTE:    new Astro('Marte',    6.792e3,   2.279e8),
    JUPITER:  new Astro('Júpiter',  1.42984e5, 7.786e8),
    SATURNO:  new Astro('Saturno',  1.20536e5, 1.4335e9),
    URANO:    new Astro('Urano',    5.1118e4,  2.8725e9),
    NETUNO:   new Astro('Netuno',   4.9528e4,  4.4951e9),
    PLUTAO:   new Astro('Plutão',   2.39e3,    5.87e9)
  });
  CALCULO.initEnum({
    DIAMETRO:  new Calculo("Diâmetro"),
    DISTANCIA: new Calculo("Distância")
  });
  BASE.initEnum({
    DIAMETRO_SOL: new BaseReferencia('Diâmetro do Sol', 'base__diametro-sol-label'),
    DISTANCIA_TERRA_SOL: {descricao: "Distância da Terra ao Sol", id: "base__distancia-terra-sol-label"}
  });

...

}

```

### Consumindo

```js
ASTROS.SOL.getDiametroKm()
ASTROS.TERRA.getDistanciaKm()
BASE.DISTANCIA_TERRA_SOL
CALCULO.DISTANCIA
CALCULO.DIAMETRO

```

---


## Business Objects

 Nós temos três objetos de domínio ou de negócio: `Astro`, `Calculo` e `BaseReferencia`.



### POJO

```js
class Astro {
  constructor(nome = "Astro", diametro = 0, distancia = 0) {
    this.nome = nome;
    this.diametro = diametro;
    this.distancia = distancia;
  }
...

```

```js
class Calculo {
  constructor(tipo) {
    this.tipo = tipo;
  }
...
```

```js
class BaseReferencia {
  constructor(descricao, id) {
    this.descricao = descricao;
    this.id = id;
  }
...

```

### Design Pattern Observer

  _Observer_ é um padrão muito elegante. Faz um acoplamento fraco entre objetos. Exemplo: Fazer um cadastro em algum **canal**, site, e receber notificações. O objeto **pessoa** que fez o cadastro está acoplado ao objeto canal, e canal notifica pessoa sobre atualizações.

  _Observer_ precisa de duas interfaces, a primeira representa o objeto que estamos observando, sobre cujas alterações queremos ser notificados - _Subject/Observable_. A segunda interface é o observador - _Observer_, aquele que está interessado em saber sobre _Subject/Observable_.

```js


// |=> Interfaces

// Subject/Observable Interface

class Observavel {
  constructor() {
    this.observadores = [];
  }

  adicionar(observador) {
    if (observador instanceof Observador) {
      this.observadores.push(observador);
    }
  }

  notificarTodosObservadores() {
    this.observadores.forEach(function (obs) {
      obs.update();
    });
  }
}

// Observer Interface

class Observador {
  constructor() {
    this.observaveis = [];
  }
  adicionar(observavel) {
    if (observavel instanceof Observavel) {
      observavel.adicionar(this);                   //.1
      this.observaveis.push(observavel);            //.2 
    }
  }
  update() {}                                       //.3
}

```
Note que `Observavel` possui um vetor (`[]`), uma coleção de observadores interessados, são os seguidores da celebridade. _Observavel_ concede permissão a observadores se cadastrarem em sua lista com o método `#adicionar(observador)`. Em contrapartida, o assinante `Observador` possui uma referencia ao objeto _Observable_ que está interessado. 
<br>
`#notificarTodosObservadores()` corre a coleção de observadores e invoca o método `#update()` dentro de _Observador_ para informar que houve alterações e este corrija seu estado.

O _Observador_ pode estar interessado em mais de um assunto (_subject_), portanto, os objetos de interesse estão numa coleção - `observaveis = []`. Quando adicionar algum objeto de interresse, ele se cadastra pedindo ao _Observavel_ para lhe cadastrar(#.1).
Na linha indicada #.2 insere o elemento na pilha(stack). Mais tarde, na linha #.3 o objeto observado chamará o método `#update()` pra dizer que mudou de estado.


### Concret Class Observable

Agora vamos as classes concretas de _Observavel_. A lousa da regra de 3 é o painel que preciso atualizar. Seu conteúdo é dependente de 3 objetos e um atributo interno: planeta selecionado(`AstroObservado`), o calculo desejado - se diâmetro  ou distância(`CalculoObservado`), e qual fator de conversão eu vou utilizar na regra de 3 (`BaseReferenciaObservada`).  
 
São todas classes filhas de _Observavel_ (`extends`). Muito parecidas, vamos expor apenas do _subject_ Astro.

```js

class CalculoObservado extends Observavel {          ...ººº...
class BaseReferenciaObservada extends Observavel {   ...ººº...

class AstroObservado extends Observavel {
  constructor() {
    super();
    this.astro = null;
  }
  get() {
    return this.astro;
  }
  set(astro) {
    this.astro = astro;
    super.notificarTodosObservadores();
  }
  getClass() {
    return AstroObservado.name;
  }
}

```

Notar seu `#set()`, toda vez que é alterado ele invoca o método herdado da classe mãe (`super`) para fazer o broadcast 
`super.notificarTodosObservadores();`.


### Concret Class Observer

```js
class LousaRegra3 extends Observador {
  constructor() {
    super();
    this.planet = null;
    this.calc = null;
    this.bas = null;
    this.fator = 1;
```


  `LousaRegra3` - representa cada campo que deve ser atualizado na lousa
em que fica montada o cálculo de proporções da regra de três.

  Esta classe guarda uma cópia das variáveis de aplicação que guardam os estados
da máquina: {planeta, calculo, base-referencia}.
Suas referências estão sempre atualizada por estar monitorando cada alteração
nas variáveis de negócio. 

Sua única porta de alteração no valor informa ao observador,
pela referência interna de acoplamento, invocando <code>Observador#update()</code>,
que fara em si um 'set' usando um 'get' nos valores recém atualizados. 

```js
/**
   *  Observer Pattern - Observer#update()
   *
   * 1. Atualiza todas as referências privadas Business Object's.,
   * 2. Apagar a lousa e variáveis de retorno de métodos chamados repetidas vezes.,
   * 3. Refaz o mapeamento dos campos com os valores dos BO's atualizados.,
   * 4. Escreve as contas novamente.
   *
   */
  update() {
    for (let i = 0; i < this.observaveis.length; i++) {   // 1.
                                           
      let obs = this.observaveis[i];       
                                           
      switch (obs.getClass()) {            
        case 'AstroObservado':             
          this.planeta = obs.get();        
          break;                                    
        case 'CalculoObservado':           
          this.calculo = obs.get();        
          break;                           
        case 'BaseReferenciaObservada':    
          this.base = obs.get();           
          break;                           
      }                                    
    }                                      
    this.apagarLousa();                   // 2.
    this.carregarMapaCampos()            // 3.
    this.canetaoEscreva();              // 4.
  }

...
```
É isso, qualquer objeto observado que mude de estado, o observado notifica o observador(update) LousaRegra3 que se repinta.

Possui um objeto `canetao` que escreve toda a regra de três na lousa nos eventos set's de atualizações dos objetos do domínio _Observavel_ que este observador monitora (ler código). 
<br>
Apaga tudo e reescreve a lousa.

---

## CONTROLER: Oriented by Function

O controle foi feito com funções. Funções para registrar eventos, exibir e ocultar painel, algums atributos de estado; funções e variáveis globais.

 ```js
// ============================================
//       >>>      CONTROLLER      <<<
// ============================================

// Variáveis Globais  -------------------------------------------------------------------------------------

//Logic Object's
const astroSelecionado = new AstroObservado();
const calculoSelecionado = new CalculoObservado();
const baseSelecionada = new BaseReferenciaObservada();
const regra3 = new LousaRegra3();    // Observer

//Constantes Enum's
const ASTROS = class extends Enum {};
const CALCULO = class extends Enum {};
const BASE = class extends Enum {};

//DOM Object's
let linhaSelecionada = null;    // planeta
let abaSelecionada = null;      // calculo

...

// Adicionar os objetos vigiados ao observador
  regra3.adicionar(astroSelecionado);
  regra3.adicionar(calculoSelecionado);
  regra3.adicionar(baseSelecionada);

  adicionarEventos();
  adicionarEscutaLinhaTabela();

```
Depois o que segue é gestão de estado de objetos baseada em eventos. Algumas funções do controller são listadas a seguir.

**Functions of Controller**

* adicionarEscutaLinhaTabela
* processarSelecaoPlaneta(event)
* tratarLinhaSelecionada
* processarSelecaoAbaCalculo(event) 
* destacarLinha
* destacarAba
* ...

E uma classe auxiliar, class `Util`.

---

## BEM methodology

A VIEW está escrita no arquivo index.html e os css, base.css e componentes.css.

A estruturação de componentes e a estilização foi concebida na metodologia do [BEM](https://en.bem.info/methodology/):

 - **B** - Block

 - **E** - Element

 - **M** - Modifier

Há conjuntos de elementos associados que interagem entre si com a finalidade de realizar tarefas com um fim específico. Menus, abas, grupo de botões, são exemplos de elementos que trabalham em conjunto. A esse conjunto denominamos de BLOCK. Os elementos de um menu, p. ex., disparadores de ações, são elementos do BLOCK menu e os botões são os ELEMENT's.

O conjunto de práticas a seguir é um maneira de evitar a _guerra do css_. A componentização sugerida pelo BEM isola comportamento e viabiliza reaproveitamento de blocos de marcação html.

#### _Recomendações da metodologia BEM_

- Cada block é independente e se ajusta responsivamente por serem todos os seus elementos internos com dimensões relativas ao seu container: block.

- Todo bloco é ligado aos seus elementos por '__' - BLOCK__ELEMENT

- Todo modificador é um alterador do default, ligados por '--' - BLOCK__ELEMENT--MODIFIER.

- Separação de palavras semânticas para variáveis e objetos é por hífen '-' .

#### Exemplo: 
BOCK: .seletor-calculo 
<br>
BLOCK__ELEMENT: .seletor-calculo__moldura, .seletor-calculo__moldura-legenda

```css
/*--------------------------------*\
        SELETOR DE CALCULO
\*--------------------------------*/

.seletor-calculo {
	display: none;
	font-size:1.0rem;
	padding-top:1.7rem;
}
.seletor-calculo__moldura {
	font-size:1.4em;
	display: block;
	border: 2px groove white;
	margin:0;
	padding: 0 0.5rem 0.5rem;
}
.seletor-calculo__moldura-legenda {
	font-size:inherit;
	/* bootstrap põe pra 100% - a linha da moldura não fica perto da legenda */
	width: auto;
}


```

## Bibliotecas

* CSS: [Bootstrap v4.3.1](https://getbootstrap.com/)
  - Só foi usado as classes do layout para deixar **Responsivo**

* Javascript: [JQuery v3.4.1](https://jquery.com/), popper.min.js

<br>

[:arrow_up: Ir ao topo](https://github.com/earmarques/escala-sistema-solar/wiki/VIEW:-BEM-methodology#bem-methodology)





