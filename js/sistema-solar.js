
/************************************************
*  Author: Éder A. R. Marques                   *
*  Email:  earmarques@gmail.com                 *
*  Local:  São José do Rio Preto/SP Brazil      *
*  Date:   10/05/2019                           *
************************************************/

"use strict";


//===========================================
//          >>>     MODEL     <<<
//===========================================

// Classes  -------------------------------------------------------------------------------------------------

/**
 *   Classe base-mãe Enum que deverá ser extendida a fim de que os objetos da classe filha sejam
 * constantes imutáveis. Está classe, pretendida a ser uma classe abstrata, possui
 * o método de classe (static) #initEnum por onde um vetor de objetos deverá ser
 * passado com todos eles de uma vez.
 *
 *  Depois de pronto, teremos uma vetor imutável de objetos imutáveis.
 *  A ideia é torná-los como se fossem atributos membros de classe e não de objetos.
 *
 */
class Enum {

  /**
   * Recebe uma coleção de objetos, os transformam em objetos imutáveis e armazena em um
   * vetor também imutável.
   */
  static initEnum(objetos) {
    /**
     *   Primeiramente deixamos a nossa coleção de objetos fixa, ninguém entra, ninguém sai.
     * Fazemos isso definindo a propriedade 'valoresEnum' como um vetor imutável.
     *
     *   Devemos passar todos os objetos ao vetor(coleção) de uma só vez, porque depois de criado,
     * não será permitdo adicionar novos ou remover existentes (writable:false no []),
     * muito menos tentar alterar o atributo 'writable' da propriedade '[] - vetor', porque
     * estamos fazendo o atributo de propriedade 'configurable' igual a false.
     */
    Object.defineProperty(this, 'valoresEnum', {
      value: [],
      configurable: false,
      writable: false,
      enumerable: true,
    });
    this.extrairValoresDosObjetos(objetos);

    Object.freeze(this.valoresEnum);
  }


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

}



// ==========================================================================================================
// Business Logic Concept Object's - BO's -. Astro / Calculo / BaseReferencia -------------------------------

class Astro {
  constructor(nome = "Astro", diametro = 0, distancia = 0) {
    this.nome = nome;
    this.diametro = diametro;
    this.distancia = distancia;
  }
  getNome() { return this.nome; }

  getDiametroKm() { return this.diametro; }
  getDiametroMetro() { return this.diametro * 1000; }

  getDistanciaKm() { return this.distancia; }
  getDistanciaMetro() { return this.distancia * 1000; }

  getClass() {
    return Astro.name;
  }
}


class Calculo {
  constructor(tipo) {
    this.tipo = tipo;
  }
  getTipo() {
    return this.tipo;
  }

  getClass() {
    return Calculo.name;
  }
}


class BaseReferencia {
  constructor(descricao, id) {
    this.descricao = descricao;
    this.id = id;
  }
  getDescricao() {
    return this.descricao;
  }
  getId() {
    return this.id;
  }

  getClass() {
    return BaseReferencia.name;
  }
}


// ==========================================================================================================
// Design Pattern Observer  ---------------------------------------------------------------------------------


// |=> Interfaces  ------------------------------------------------------------------------------------------

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
      observavel.adicionar(this);
      this.observaveis.push(observavel);
    }

  }
  update() {}
}


// |=> Concrete Classes  ------------------------------------------------------------------------------------

// Concrete Class Subject/Observable

/**
 *  Encapsulamento dos Business Objects num envoltório de observável
 * para que seu estado seja monitorado - notify_all.
 *
 */

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


class CalculoObservado extends Observavel {
  constructor() {
    super();
    this.calculo = null;
  }
  get() {
    return this.calculo;
  }
  set(calculo) {
    this.calculo = calculo;
    super.notificarTodosObservadores();
  }
  getClass() {
    return CalculoObservado.name;
  }
}


class BaseReferenciaObservada extends Observavel {
  constructor() {
    super();
    this.base = null;
  }
  get() {
    return this.base;
  }
  set(base) {
    this.base = base;
    super.notificarTodosObservadores();
  }
  getClass() {
    return BaseReferenciaObservada.name;
  }
}


// Concret Class Observer

/**
 *  Lousa Regra3 - representa cada campo que deve ser atualizado na lousa
 * em que fica montada o cálculo de proporções da regra de três.
 *<p>
 * Esta classe guarda uma cópia das variáveis de aplicação que guardam os estados
 * da máquina: {planeta, calculo, base-referencia}.
 * <p>
 * Suas referências estão sempre atualizada por estar monitorando cada alteração
 * na variáveis de negócio. Sua única porta de alteração no valor informa ao observador,
 * pela referência interna de acoplamento, invocando <code>Observador#update()</code>,
 * que fara em si um 'set' usando um 'get' nos valores recém atualizados.
 * <p>
 *  Possui um <code>canetao</code> que escreve toda a regra de três na lousa nos eventos set's
 *  de atualizações dos objetos do domínio <code>observavel</code> que este observador monitora.
 * <p>
 * A Louza Regra3 está disposta por parágrafos modelados por um vetor #p, de tamanho variável,
 * guardando todos os campos que sofrem alteração naquela mesma linha - parágrafo.
 * <br>
 * <code>
 *   parágrafo = [linha_i][campo_j] -> um vetor bi-dimensional com vetores internos
 * de tamanho livre, variavél >> cada linha terá um número variável de campos que deverão ter
 * seus valores atualizados, o vetor <u>linha</u> guarda os vetores <i>length-free</i> <u>campos</u>.
 * </code> Isto é, o parágrafo é vetor que guarda chave composta p =  paragráfo[linha[campo[]]] = ;
 * <br>
 * OBS|=> A ordem dos índices é a mesma ordem dos campos na linha da lousa - da esquerda
 * para direita.
 *
 *
 */
class LousaRegra3 extends Observador {
  constructor() {
    super();
    this.planet = null;''
    this.calc = null;
    this.bas = null;
    this.fator = 1;
    this.incognitio = 'x';
    /**
     * Valores Retornados de Métodos
     *
     * Há alguns métodos que realizam cálculos e são chamados várias vezes;
     * Em 'retornos', retenho o valor calculado na primeira vez e o retorno
     * nas próximas chamadas - a cada #update() sofre um reset (#apagarLousa())
     */
    this.retornos = {};
    /**
     * Parágrafos
     */
    this.p = [];
  }


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


  apagarLousa = () => {
    // Retornos de Métodos
    this.retornos = {
        referenciaPadr : null,
        grandezaPlanet : null,
        valorPadr : null,
        valorPlanet : null,
        valorPlanetaVezesEscal : null,
        numeradr : null,
        divis : null,
    };
    // Paragráfos - sobrescrever sempre
    this.p = [];
  }


  carregarMapaCampos() {

    // Paragráfos - sobrescrever sempre
    //this.p = []; *em #apagarLousa
    // p0
    this.p.push([ this.getReferenciaPadrao(), this.escala ]);
    // p1
    this.p.push([ this.getGrandezaPlaneta(), this.incognita, 'm' ]);
    // p2
    this.p.push([ this.getValorPadraoFormatado(), '&nbsp;m', this.escala, 'm' ]);
    // p3
    this.p.push([ this.getValorPlanetaFormatado(), '&nbsp;m', this.incognita, 'm' ]);
    // p4
    this.p.push([ this.getValorPadraoFormatado(), this.incognita, '&nbsp;=&nbsp;',
            this.getValorPlanetaFormatado(), '&nbsp;&nbsp;*&nbsp;&nbsp;', this.escala ]);
    // p5
    this.p.push([ this.getValorPadraoFormatado(), this.incognita, '&nbsp;=&nbsp;',
            this.getNumeradorFormatado() ]);
    // p6
    this.p.push([ this.getNumeradorFormatado() ]);
    // p7
    this.p.push([ this.incognita, '=&nbsp;', '&nbsp;' ]);
    // p8
    this.p.push([ this.getDenominadorFormatado() ]);
    // p9 |=> base10(numero, comSinal, invertido)
    this.p.push([ this.incognita,
            '=',
            this.getDivisaoSemOlharBase10Formatado(),
            '&nbsp;x&nbsp;',
            this.getBase10(this.getNumerador(), true, false),
            '&nbsp;x&nbsp;',
            this.getBase10(this.getValorPadrao(), true, true),
            '=',
            this.getDivisaoSemOlharBase10Formatado(),
            '&nbsp;x&nbsp;10',
            this.getSuper(this.getPotencia(this.getNumerador(), true, false)),
            this.getSuper('&nbsp;+&nbsp;'),
            this.getSuper(this.getPotencia(this.getValorPadrao(), true, true)),
            '&nbsp;=']);
    // p10
    this.p.push([ this.incognita,
            '=',
            this.getDivisaoSemOlharBase10Formatado(),
            'x10',
            this.getSuper(this.getPotenciaSomada()),
            '&nbsp;&nbsp;&rArr;']);
    // p11
    this.p.push([ this.incognita,
            '=',
            this.toMetroNotacaoCientifica(this.getResultado()),
            'm']);
    // p12
    this.p.push([ 'Portanto:']);
    // p13
    this.p.push([ this.incognita,
            '&nbsp;=&nbsp;',
            this.toMetroNotacaoCientifica(this.getResultado()),
            'm&nbsp;&nbsp;',
            '&nbsp;=&nbsp;',
            this.toMetro(this.getResultado()),
            '&nbsp;metros&nbsp;'
           ]);
    // p14 - 'ou'
    this.p.push(['ou']);
    // p15
    this.p.push([this.incognita,
           '&nbsp;=&nbsp;',
           this.toCmNotacaoCientifica(this.getResultado()),
           '&nbsp;cm&nbsp;&nbsp;',
           '=&nbsp;',
           this.toCm(this.getResultado()),
           '&nbsp;centímetros&nbsp;'
           ]);
    // p16 - 'ou'
    this.p.push(['ou']);
    // p17
    this.p.push([this.incognita,
           '&nbsp;=&nbsp;',
           this.toMiliNotacaoCientifica(this.getResultado()),
           'mm&nbsp;',
           '&nbsp;=&nbsp;',
           this.toMili(this.getResultado()),
           '&nbsp;milímetros&nbsp;'
           ]);

  }


  canetaoEscreva = () => {

    $('#regra3__p0--0').html(this.p[0][0]);
    $('#regra3__p0--1').val( this.p[0][1]);

    $('#regra3__p1--0').html(this.p[1][0]);
    $('#regra3__p1--1').html(this.p[1][1]);
    $('#regra3__p1--2').html(this.p[1][2]);

    $('#regra3__p2--0').html(this.p[2][0]);
    $('#regra3__p2--1').html(this.p[2][1]);
    $('#regra3__p2--2').html(this.p[2][2]);
    $('#regra3__p2--3').html(this.p[2][3]);

    $('#regra3__p3--0').html(this.p[3][0]);
    $('#regra3__p3--1').html(this.p[3][1]);
    $('#regra3__p3--2').html(this.p[3][2]);
    $('#regra3__p3--3').html(this.p[3][3]);

    $('#regra3__p4--0').html(this.p[4][0]);
    $('#regra3__p4--1').html(this.p[4][1]);
    $('#regra3__p4--2').html(this.p[4][2]);
    $('#regra3__p4--3').html(this.p[4][3]);
    $('#regra3__p4--4').html(this.p[4][4]);
    $('#regra3__p4--5').html(this.p[4][5]);

    $('#regra3__p5--0').html(this.p[5][0]);
    $('#regra3__p5--1').html(this.p[5][1]);
    $('#regra3__p5--2').html(this.p[5][2]);
    $('#regra3__p5--3').html(this.p[5][3]);

    $('#regra3__p6--0').html(this.p[6][0]);

    $('#regra3__p7--0').html(this.p[7][0]);
    $('#regra3__p7--1').html(this.p[7][1]);
    $('#regra3__p7--2').html(this.p[7][2]);

    $('#regra3__p8--0').html(this.p[8][0]);

    $('#regra3__p9--0').html(this.p[9][0]);
    $('#regra3__p9--1').html(this.p[9][1]);
    $('#regra3__p9--2').html(this.p[9][2]);
    $('#regra3__p9--3').html(this.p[9][3]);
    $('#regra3__p9--4').html(this.p[9][4]);
    $('#regra3__p9--5').html(this.p[9][5]);
    $('#regra3__p9--6').html(this.p[9][6]);
    $('#regra3__p9--7').html(this.p[9][7]);
    $('#regra3__p9--8').html(this.p[9][8]);
    $('#regra3__p9--9').html(this.p[9][9]);
    $('#regra3__p9--10').html(this.p[9][10]);
    $('#regra3__p9--11').html(this.p[9][11]);
    $('#regra3__p9--12').html(this.p[9][12]);
    $('#regra3__p9--13').html(this.p[9][13]);

    $('#regra3__p10--0').html(this.p[10][0]);
    $('#regra3__p10--1').html(this.p[10][1]);
    $('#regra3__p10--2').html(this.p[10][2]);
    $('#regra3__p10--3').html(this.p[10][3]);
    $('#regra3__p10--4').html(this.p[10][4]);
    $('#regra3__p10--5').html(this.p[10][5]);


    $('#regra3__p11--0').html(this.p[11][0]);
    $('#regra3__p11--1').html(this.p[11][1]);
    $('#regra3__p11--2').html(this.p[11][2]);
    $('#regra3__p11--3').html(this.p[11][3]);

    $('#regra3__p12--0').html(this.p[12][0]);

    $('#regra3__p13--0').html(this.p[13][0]);
    $('#regra3__p13--1').html(this.p[13][1]);
    $('#regra3__p13--2').html(this.p[13][2]);
    $('#regra3__p13--3').html(this.p[13][3]);
    $('#regra3__p13--4').html(this.p[13][4]);
    $('#regra3__p13--5').html(this.p[13][5]);
    $('#regra3__p13--6').html(this.p[13][6]);

    $('#regra3__p14--0').html(this.p[14][0]);

    $('#regra3__p15--0').html(this.p[15][0]);
    $('#regra3__p15--1').html(this.p[15][1]);
    $('#regra3__p15--2').html(this.p[15][2]);
    $('#regra3__p15--3').html(this.p[15][3]);
    $('#regra3__p15--4').html(this.p[15][4]);
    $('#regra3__p15--5').html(this.p[15][5]);
    $('#regra3__p15--6').html(this.p[15][6]);

    $('#regra3__p16--0').html(this.p[16][0]);

    $('#regra3__p17--0').html(this.p[17][0]);
    $('#regra3__p17--1').html(this.p[17][1]);
    $('#regra3__p17--2').html(this.p[17][2]);
    $('#regra3__p17--3').html(this.p[17][3]);
    $('#regra3__p17--4').html(this.p[17][4]);
    $('#regra3__p17--5').html(this.p[17][5]);
    $('#regra3__p17--6').html(this.p[17][6]);
  }



  // Get's/Set's - JS -------------------------------------------------------------------------------------

  get incognita() {
    return this.incognitio;
  }
  set incognita(var_x) {
    this.incognitio = var_x;
  }


  get planeta() {
    return this.planet;
  }
  set planeta(planeta) {
    this.planet = planeta;
  }


  get calculo() {
    return this.calc;
  }
  set calculo(calculo) {
    this.calc = calculo;
  }


  get base() {
    return this.bas;
  }
  set base(base) {
    this.bas = base;
  }


  get escala() {
    return this.fator;
  }
  set escala(escala) {
    this.fator = escala;
    this.update();

    /**
     *   O #update() é chamado pelos próprios Observables BO's, onde
     * planet, calc e bas guardam apenas as suas referências.
     * Porque não há um Observable encapsulando escala,
     * o método deve ser invocado explitamente.
     */
  }


  // Method's Formaters ---------------------------------------------------------------------------------

  toMetro(resultado) {
    if ( ! isNumero(resultado) ) return resultado;

    let tmp = Util.formatarNumeroBR(resultado, 3);
    return tmp;
  }

  toMetroNotacaoCientifica(resultado, casas = 3) {
    if ( ! isNumero(resultado) ) return resultado;

    // long number -> string -> short number
    resultado = Number(resultado.toExponential(casas))

    return Util.getNotacaoCientifica(resultado);
  }


  toCm(resultado, casas = 3) {
    if ( ! isNumero(resultado) ) return resultado;

    resultado *= 100;

    return Util.formatarNumeroBR(resultado.toFixed(casas), 2);
  }

  toCmNotacaoCientifica(resultado, casas = 3) {
    if ( ! isNumero(resultado) ) return resultado;

    resultado *= 100;
    // long number -> string -> short number
    resultado = Number(resultado.toExponential(casas))

    return Util.getNotacaoCientifica(resultado.toFixed(casas));
  }


  toMili(resultado, casas = 3) {
    if ( ! isNumero(resultado) ) return resultado;

    resultado *= 1000;

    return Util.formatarNumeroBR(resultado.toFixed(casas), 1);
  }

  toMiliNotacaoCientifica(resultado, casas = 3) {
    if ( ! isNumero(resultado) ) return resultado;

    resultado *= 1000;
    // long number -> string -> short number
    resultado = Number(resultado.toExponential(casas));

    return Util.getNotacaoCientifica(resultado);
  }


  getSuper(valor) {
    return '<sup>' + valor + '</sup>';
  }


  // Binder's Page - modela o layout da lousa -------------------------------------------------------------

  getDenominador() {
    return this.getValorPadrao();
  }


  getDenominadorFormatado() {
    return Util.getNotacaoCientifica(this.getDenominador());
  }


  getNumerador() {
    if (this.retornos.numeradr != null) {
      return this.retornos.numeradr;
    }
    let grandeza = null;
    if (this.planeta != null && this.calculo != null) {
      if (this.calculo === CALCULO.DIAMETRO) {
        grandeza = this.planeta.getDiametroMetro() * this.escala;
      }
      else if (this.calculo === CALCULO.DISTANCIA) {
        grandeza = this.planeta.getDistanciaMetro() * this.escala;
      }
    }
    this.retornos.numeradr = grandeza;

    return grandeza;
  }


  getResultado() {
    if (this.retornos.divis != null) {
      return this.retornos.divis;
    }

    let resultado = this.getDivisao();
    if ( ! isNumero(resultado) ) {
      resultado = null;
    }

    return resultado;
  }


  // Cálculos da Regra de 3 -----------------------------------------------------------------------------

  getPotencia(numero, comSinal, inverter) {
    numero = Number(numero);
    if ( ! isNumero(numero) ) return numero;

    let str = "";
    let potencia = Util.getPotencia(numero);
    potencia *= (inverter) ? -1 : 1;

    if (comSinal) {
      // o negativo já vem com sinal
      str = (potencia > 0) ? '+' : '';
    }
    str += potencia;

    return str;
  }


  getDivisao() {
    if (this.retornos.divis != null) {
      return this.retornos.divis;
    }
    let divisao = null;
    let denominador = this.getDenominador();
    if ( existe(denominador) && denominador != 0 ) {
      divisao = this.getNumerador() / denominador;
    }
    this.retornos.divis = divisao;

    return divisao;
  }


  getDivisaoSemOlharBase10() {
    let divisao = null;
    let denominador = this.getDenominador();
    if ( existe(denominador) && denominador != 0 ) {
      divisao = Util.getParteNumerica(this.getNumerador()) /
            Util.getParteNumerica(denominador);
    }
    return divisao;
  }


  getDivisaoSemOlharBase10Formatado(casas = 4) {
    let numero = Number(this.getDivisaoSemOlharBase10());
    if ( ! isNumero(numero) ) return numero;

    return Util.getDecimalBR(numero.toFixed(casas));
  }


  getValorPlanetaVezesEscala() {
    if (this.retornos.valorPlanetaVezesEscal != null) {
      return this.retornos.valorPlanetaVezesEscal;
    }
    let grandeza = null;
    if (this.planeta != null && this.calculo != null) {
      if (this.calculo === CALCULO.DIAMETRO) {
        grandeza = this.planeta.getDiametroMetro() * this.escala;
      }
      else if (this.calculo === CALCULO.DISTANCIA) {
        grandeza = this.planeta.getDistanciaMetro() * this.escala;
      }
    }
    this.retornos.valorPlanetaVezesEscal = grandeza;

    return grandeza;
  }


  getNumeradorFormatado() {
    return Util.getNotacaoCientifica(this.getValorPlanetaVezesEscala());
  }


  getPotenciaSomada() {
    // sem sinal '+', sem inverter
    let potenciaNumerador = this.getPotencia(this.getNumerador(), false, false);
    // sem sinal '+', "o que está embaixo, sobe trocando o sinal"
    let potenciaDenominador = this.getPotencia(this.getDenominador(), false, true);

    potenciaNumerador = Number(potenciaNumerador);
    potenciaDenominador = Number(potenciaDenominador);
    // pra não somar strings...concat
    let soma = potenciaNumerador + potenciaDenominador;

    return (soma > 0) ? '+' + soma : soma;    // o negativo já vem com sinal
  }


  getBase10(numero, comSinal, invertido) {
    numero = Number(numero);
    if ( ! isNumero(numero) ) return numero;

    let str = "";
    let potencia = Util.getPotencia(numero);
    potencia *= (invertido) ? -1 : 1;
    str += '10<sup>';
    if (comSinal) {
      // só dos positivos é removido o sinal '+'
      str += (potencia > 0) ? '+' : '';
    }
    str += potencia + '</sup>';

    return str;
  }


  // Dados Referência Padrão  -----------------------------------------------------------------------------

  getReferenciaPadrao() {
    if (this.retornos.referenciaPadr != null) {
      return this.retornos.referenciaPadr;
    }
    let ref = null;
    if (this.calculo != null) {
      if (this.calculo === CALCULO.DIAMETRO) {
        ref = 'Diâmetro Sol';
      }
      // CALCULO.DISTANCIA
      else if (this.base != null) {
        if (this.base === BASE.DIAMETRO_SOL) {
          ref = 'Diâmetro Sol';
        }
        else if (this.base === BASE.DISTANCIA_TERRA_SOL) {
          ref = 'Distância Terra-Sol';
        }
      }
    }
    this.retornos.referenciaPadr = ref;

    return ref;
  }

  getValorPadrao() {
    if (this.retornos.valorPadr != null) {
      return this.retornos.valorPadr;
    }
    let valor = null;
    if (this.calculo != null) {
      if (this.calculo === CALCULO.DIAMETRO) {
        valor = ASTROS.SOL.getDiametroMetro();
      }
      // CALCULO.DISTANCIA
      else if (this.base != null) {
        if (this.base === BASE.DIAMETRO_SOL) {
          valor = ASTROS.SOL.getDiametroMetro();
        }
        else if (this.base === BASE.DISTANCIA_TERRA_SOL) {
          valor = ASTROS.TERRA.getDistanciaMetro();
        }
      }
    }
    this.retornos.valorPadr = valor;

    return valor;
  }
  getValorPadraoFormatado() {
    return Util.getNotacaoCientifica(this.getValorPadrao());
  }


  // Dados Planeta  -------------------------------------------------------------------------------------

  getGrandezaPlaneta() {
    if (this.retornos.grandezaPlanet != null) {
      return this.retornos.grandezaPlanet;
    }
    let grandeza = null;
    if (this.planeta != null && this.calculo != null) {
      if (this.calculo === CALCULO.DIAMETRO) {
        grandeza = 'Diâmetro ' + this.planeta.getNome();
      }
      else if (this.calculo === CALCULO.DISTANCIA) {
        grandeza = 'Distância ' + this.planeta.getNome();
      }
    }
    this.retornos.grandezaPlanet = grandeza;

    return grandeza;
  }

  getValorPlaneta() {
    if (this.retornos.valorPlanet != null) {
      return this.retornos.valorPlanet;
    }
    let valor = null;
    if (this.planeta != null && this.calculo != null) {
      if (this.calculo === CALCULO.DIAMETRO) {
        valor = this.planeta.getDiametroMetro();
      }
      else if (this.calculo === CALCULO.DISTANCIA) {
        valor = this.planeta.getDistanciaMetro();
      }
    }
    this.retornos.valorPlanet = valor;

    return valor;
  }
  getValorPlanetaFormatado() {
    return Util.getNotacaoCientifica(this.getValorPlaneta());
  }


}


// ============================================
//       >>>      CONTROLLER      <<<
// ============================================

// ==========================================================================================================
// Variáveis Globais  -------------------------------------------------------------------------------------


//Logic Object's
const astroSelecionado = new AstroObservado();
const calculoSelecionado = new CalculoObservado();
const baseSelecionada = new BaseReferenciaObservada();
const regra3 = new LousaRegra3();


//Constantes Enum's
const ASTROS = class extends Enum {};
const CALCULO = class extends Enum {};
const BASE = class extends Enum {};


//DOM Object's
let linhaSelecionada = null;    // planeta
let abaSelecionada = null;      // calculo



// Inicialização  -----------------------------------------------------------------------------------------

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


  // Adicionar os objetos vigiados ao observador
  regra3.adicionar(astroSelecionado);
  regra3.adicionar(calculoSelecionado);
  regra3.adicionar(baseSelecionada);

  adicionarEventos();

  adicionarEscutaLinhaTabela();
  //TEST
  //informarException('ÉDER MARQUES &#8212; Fatec &#8212; Análise e Desenvolvimento de Sistemas');
}


/**
 * Adiciona escuta de evento 'click' as linhas da tabela para chamar uma
 * função de callback para atualizar o painel de cálculo de proporções
 * planetárias, a regra de 3 e tudo mais.
 *
 */
function adicionarEscutaLinhaTabela() {

  //let tabela = document.getElementById('dados__tabela');
  //let linhas = tabela.rows;
  let linhas = $('#dados__tabela tbody tr');
  let linha;

  if (existe(linhas)) {
    for (let i = 0; i < linhas.length; i++) {
      linha = linhas[i];
      linha.addEventListener('click', function(){ processarSelecaoPlaneta(event); }, false);
    }
  }
}


// Cabeçalho  ---------------------------------------------------------------------------------------------

function limparNomePlanetaCabecalho() {
  $('#cabecalho__nome_planeta').html('&nbsp');
}


function escreverNomePlanetaCabecalho(planeta) {
  $('#cabecalho__nome_planeta').text( getDecoradoComPontos(planeta) );
}


function getDecoradoComPontos(planeta) {
  return ". " + planeta.getNome() + " .";
}


// Planeta  -------------------------------------------------------------------------------------------------

function processarSelecaoPlaneta(event) {
  //informarException('ÉDER MARQUES &#8212; Fatec &#8212; Análise e Desenvolvimento de Sistemas');
  let linha = event.currentTarget;
  tratarLinhaSelecionada(linha);

  astroSelecionado.set(extrairPlaneta(event));  // global
  carregarConfiguracaoPlaneta();
}


function carregarConfiguracaoPlaneta() {

  if ( existe(astroSelecionado.get()) ) {

    escreverPlanetaNoBlocoCalculos();
    atualizarBlocoDiametro();
    atualizarBlocoDistancia();
    mostrarPainelCalculos();
  }
}


function escreverPlanetaNoBlocoCalculos() {
  $('#seletor-calculo__rotulo-planeta-selecionado').html('Planeta selecionado:&nbsp;');
  $('#seletor-calculo__planeta-selecionado').text(getNomePlaneta());
}


function getNomePlaneta() {
  let nome = null;
  if ( existe(astroSelecionado.get()) ) {
    nome = astroSelecionado.get().nome;
  }
  return nome;
}


function mostrarPainelCalculos() {
  $(".seletor-calculo").slideDown(700);
}


/**
* Retorna o objeto do <i>enum</i> <code>ASTROS</code> correspondente
* a linha selecionada na tabela de dados.
* @param {event} &#8212; deve ser um objeto <code>event</code> disparado por uma <i>tag</i>  <code>&lt;tr&gt;</code>
* @returns {Astro objecto}
*
*/
function extrairPlaneta(event) {

  let linha = event.currentTarget;
  let id = linha.id;

  switch (id) {
    case "mercurio":
      return ASTROS.MERCURIO;
    case "venus":
      return ASTROS.VENUS;
    case "terra":
      return ASTROS.TERRA;
    case "lua":
      return ASTROS.LUA;
    case "marte":
      return ASTROS.MARTE;
    case "jupiter":
      return ASTROS.JUPITER;
    case "saturno":
      return ASTROS.SATURNO;
    case "urano":
      return ASTROS.URANO;
    case "netuno":
      return ASTROS.NETUNO;
    case "plutao":
      return ASTROS.PLUTAO;
    default:
      return null;
  }
}


function tratarLinhaSelecionada(linha) {
  padronizarEstiloLinha();    // previamente
  linhaSelecionada = linha;   // Atualiza para nova seleção
  destacarLinha();
}


// Aba do Cálculo -----------------------------------------------------------------------------------------

function processarSelecaoAbaCalculo(event) {

  let aba = event.currentTarget;
  tratarAbaSelecionada(aba);

  calculoSelecionado.set( extrairTipoCalculoSelecionado(event) ); // global

  carregarConfiguracaoCalculo();
}


function tratarAbaSelecionada(aba) {
  padronizarEstiloAba();      // previamente
  abaSelecionada = aba;     // Atualiza para nova seleção
  destacarAba();
}


function carregarConfiguracaoCalculo() {

  if (calculoSelecionado.get() === CALCULO.DIAMETRO) {

    esconderCalculoDistancia();
    atualizarBlocoDiametro();
    mostrarBlocoDiametro();
    mostrarRegra3();
  }
  else if (calculoSelecionado.get() === CALCULO.DISTANCIA) {
    // Quero um reset, toda vez o aluno terá de escolher a base de referência
    // Para que ele preste atenção no que está fazendo, indo passo-a-passo
    anularBaseReferenciaCalculoDistancia();

    esconderBlocoDiametro();
    esconderRegra3();
    mostrarBaseReferencia();
  }
}


function extrairTipoCalculoSelecionado(event) {
  let aba = event.currentTarget;
  let id = aba.id;

  if (id === "tipo-calculo__diametro-planeta") {
    return CALCULO.DIAMETRO ;
  }
  else if (id === "tipo-calculo__distancia-planeta") {
    return CALCULO.DISTANCIA;
  }
  else {
    return null;
  }
}


// Diâmetro

function atualizarBlocoDiametro() {
  $('#diametros__planeta-nome').text( astroSelecionado.get().getNome() );
  $('#diametro__planeta-valor-Km').text(
      Util.adicionarSeparadorMilharBR(astroSelecionado.get().getDiametroKm())  + " " );

  $('#diametro__planeta-valor-m').text(
      Util.adicionarSeparadorMilharBR(astroSelecionado.get().getDiametroMetro()) + " " );

  $('#diametro__planeta-valor-notacao-cientifica').html(
      Util.getNotacaoCientifica(astroSelecionado.get().getDiametroMetro()) + " " );
}

function mostrarBlocoDiametro() {
  $(".diametro").slideDown("fast");
}

function esconderBlocoDiametro() {
  $(".diametro").slideUp("fast");
}



// Base de Referência - Cálculo da Distância  -------------------------------------------------------------

function processarSelecaoBaseReferencia(event) {

  padronizarEstiloBaseRadio();             // padrão no label desatualizado
  baseSelecionada.set( extrairBaseReferencia(event) ); // atualização
  destacarBaseRadio();

  carregarConfiguracaoBaseReferencia();
}


function extrairBaseReferencia(event) {

  let radio = event.currentTarget;
  let valor = radio.value;

  if (valor === "diametro-sol") {
    return BASE.DIAMETRO_SOL;
  }
  else if (valor === "distancia-terra-sol") {
    return BASE.DISTANCIA_TERRA_SOL;
  }
}


function carregarConfiguracaoBaseReferencia() {

  if ( existe(baseSelecionada.get()) ) {
    atualizarBlocoDistancia();
    mostrarBlocoDistancia();
    mostrarRegra3();
  }
}


//Distância

function atualizarBlocoDistancia() {

  escreverDistanciaAstro();
  escreverDistanciaReferencia();
}


function escreverDistanciaAstro() {

  if ( existe(astroSelecionado.get()) ) {
    $('#distancia__planeta-rotulo').text('Distância ');
    $('#distancia__planeta-nome').text(astroSelecionado.get().getNome());
    $('#distancia__planeta-valor-Km').html(
        Util.getNotacaoCientificaPotenciaFixa(
            astroSelecionado.get().getDistanciaKm(), 6) + '&nbsp;');
    $('#distancia__planeta-valor-m').html(
        Util.getNotacaoCientificaPotenciaFixa(
            astroSelecionado.get().getDistanciaMetro(), 9) + '&nbsp;');
    $('#distancia__planeta-valor-notacao-cientifica').html(
        Util.getNotacaoCientifica(
            astroSelecionado.get().getDistanciaMetro() ) + '&nbsp;');
  }
}


function escreverDistanciaReferencia() {

  if (baseSelecionada.get() === BASE.DIAMETRO_SOL) {
    $('#distancia__referencia-rotulo').text('Diâmetro Sol:');
    $('#distancia__referencia-valor-km').text(
        Util.adicionarSeparadorMilharBR( ASTROS.SOL.getDiametroKm() ));
    $('#distancia__referencia-valor-m').text(
        Util.adicionarSeparadorMilharBR( ASTROS.SOL.getDiametroMetro() ));
    $('#distancia__referencia-valor-notacao-cientifica').html(
        Util.getNotacaoCientifica( ASTROS.SOL.getDiametroMetro() ));
  }
  else if ( baseSelecionada.get() === BASE.DISTANCIA_TERRA_SOL ) {
    $('#distancia__referencia-rotulo').text('Distância Terra-Sol:');
    $('#distancia__referencia-valor-km').html(
        Util.getNotacaoCientificaPotenciaFixa( ASTROS.TERRA.getDistanciaKm(), 6 ));
    $('#distancia__referencia-valor-m').html(
        Util.getNotacaoCientificaPotenciaFixa( ASTROS.TERRA.getDistanciaMetro(), 9 ));
    $('#distancia__referencia-valor-notacao-cientifica').html(
        Util.getNotacaoCientifica( ASTROS.TERRA.getDistanciaMetro() ));
  }
}


function mostrarBlocoDistancia() {
  $('.distancia').slideDown('fast');
}


function mostrarBaseReferencia() {
  $('.base').slideDown('fast');
}


function esconderCalculoDistancia() {
  $('.base') .css('display', 'none');
  $('.distancia') .css('display', 'none');
}


function anularBaseReferenciaCalculoDistancia() {
  let base = baseSelecionada.get();
  if (existe(base)) {
    let labelId = baseSelecionada.get().id;
    let radioId = $('#' + labelId).attr('for');
    $('#' + radioId).prop('checked', false);

    padronizarEstiloBaseRadio();
    baseSelecionada.set(null);
  }
}


// Regra3 - Lousa -----------------------------------------------------------------------------------------

function mostrarRegra3() {
  $('.regra3').fadeIn(700);
}
function esconderRegra3() {
  $('.regra3').fadeOut('fast');
}



// Estilização  ---------------------------------------------------------------------------------------------

// Linha da Tabela

function padronizarEstiloLinha() {
  // Na 1a vez que selecionar uma linha, não existirá seleção anterior
  if ( existe(linhaSelecionada) ) {
    linhaSelecionada.style.color = "";
    linhaSelecionada.style.fontWeight = "normal";
    linhaSelecionada.style.backgroundColor = "";
  }
}


function destacarLinha() {
  if ( ! existe(linhaSelecionada) ) {
    informarException("destacarLinha: >> linhaSelecionada está indefinida ou null");
    return;
  }
  linhaSelecionada.style.color = "white";
  linhaSelecionada.style.fontWeight = "bold";
  linhaSelecionada.style.backgroundColor = "midnightblue";
}


// Aba dos Tipos de Cálculos

function padronizarEstiloAba() {
  if ( existe(abaSelecionada) ) {
    abaSelecionada.style.color = "";
    abaSelecionada.style.fontWeight = "normal";
    abaSelecionada.style.backgroundColor = "";
  }
}


function destacarAba() {
  if ( ! existe(linhaSelecionada) ) {
    informarException("destacarAba: >> abaSelecionada está indefinida ou null");
    return;
  }
  abaSelecionada.style.color = "white";
  abaSelecionada.style.fontWeight = "bold";
  abaSelecionada.style.backgroundColor = "#330000";
}


function removerBordaInferior(elemento) {
  // pinta da mesma cor do fundo
  elemento.style.borderBottom = "1px solid #330000";
}


function adicionarBordaInferiorAsAbasDiferentesDe(abaSelecionada) {

  let classe = "tipo-calculo__aba";
  let lista = document.getElementsByClassName(classe);
  let length = lista.length;
  let i, aba;
  for (i = 0; i < length; i++) {
    aba = lista[i];
    if (aba != abaSelecionada) {
      aba.style.borderBottom = "1px solid maroon";
    }
  }
}


// Base de Referência

function padronizarEstiloBaseRadio() {
  let label = undefined;
  let base = baseSelecionada.get();
  if (existe(base)) {
    label = document.getElementById(base.id);
    if (existe(label)) {
      label.style.color = "";
      label.style.fontWeight = "normal";
    }
  }
}


function destacarBaseRadio() {
  let label = undefined;
  let base = baseSelecionada.get();
  if (existe(base)) {
    label = document.getElementById(base.id);
    if (label != undefined) {
      label.style.color = "white";
      label.style.fontWeight = "bold";
    }
  }
}


// Classe Utilitária  -------------------------------------------------------------------------------------

class Util {

  static getDecimalBR(numero) {
    numero = Number(numero);
    if ( ! isNumero(numero) ) return numero;

    return numero.toString().replace(".",",");
  }


  static getPotencia(numero) {
    numero = Number(numero);
    if ( ! isNumero(numero) ) return numero;

    let potencia = 'pot'
    let str = numero.toExponential();
    let indicePotencia = str.indexOf('e');
    potencia = str.substring(indicePotencia + 1, str.length);
    // se positivo, remover sinal '+'
    if (1*potencia >= 0) {
      potencia = potencia.substring(1);
    }
    return potencia;
  }


  static getParteNumerica(numero) {
    numero = Number(numero);
    if ( ! isNumero(numero) ) return numero;

    let str = numero.toExponential();
    let indicePotencia = str.indexOf('e');
    return str.substring(0, indicePotencia);
  }


  static getHtmlBase10(parteNumerica, potencia) {
    return parteNumerica + 'x10<sup>' + potencia + '</sup>';
  }


  static adicionarSeparadorMilharBR(numero) {
    let str = numero.toString().trim();
    let tamanho  = str.length;
    let temp = "";
    let casas = 0;
    for (let index = tamanho - 1; index > 0; index--) {
      casas++;
      if (casas === 3) {
        temp = '.' + str.substr(index, casas) + temp;
        casas = 0
      }
      // ultima rodada, pegar os algarismo que sobraram a esquerda,
      // porque o que tinha de colocar ponto já ta feito
      if (index == 1) {
        //  remove numeros a esquerda com menos de 3 algarismos
        // +1 porque o indice do 2o argumento #substr é not-inclusive
        temp = str.substr(0, casas + 1) + temp;
      }
    }
    temp = (temp.length == 0) ? numero : temp;

    return temp;
  }


  static getNotacaoCientifica(numero) {
    // vendo se já é ou tentando converter
    numero = Number(numero);
    if ( ! isNumero(numero) ) return numero;

    return Util.getHtmlBase10( Util.getDecimalBR(Util.getParteNumerica(numero)),
                  Util.getPotencia(numero) );
  }


  static getNotacaoCientificaPotenciaFixa(numero, potenciaFixa) {

    numero = Number(numero);
    if ( ! isNumero(numero) ) return numero;

    let potencia = Util.getPotencia(numero);
    let parteNumerica = Util.getParteNumerica(numero);
    let parteInteira = null;
    let soAlgarismo = parteNumerica.replace('.','');
    let pulos = potencia - potenciaFixa;

    // andar com a vírgula para a direita
    if (potencia >= potenciaFixa) {
      while (soAlgarismo.length < pulos + 2) {
        soAlgarismo += '0';
      }
      parteInteira = soAlgarismo.substring(0, 1 + pulos);
      if (parteInteira.length > 3) {
        parteInteira = Util.adicionarSeparadorMilharBR(parteInteira);
      }
      parteNumerica = parteInteira + ',' + soAlgarismo.substring(pulos + 1);
    }
    // andar com a vírgula para a esquerda
    else {
      for (let i = pulos; i < 0; i++) {
        soAlgarismo = '0' + soAlgarismo;
      }
      parteNumerica = soAlgarismo.substring(0, 1) + ',' + soAlgarismo.substring(1);
    }

    return Util.getHtmlBase10(parteNumerica, potenciaFixa);
  }


  static formatarNumeroBR(numero, casas = undefined) {

      numero = Number(numero);
      if ( ! isNumero(numero) ) return numero;


      let n_str = null;
      if (casas !== undefined) {
        // forneceram o opcional
        n_str = numero.toFixed(casas);
      }
      else {
        n_str = numero.toString();
      }
      const virgulaIndex = n_str.indexOf('.');

      // Parte Inteira
      let parteInteira = '';
      if (virgulaIndex > 0) {
        parteInteira = n_str.substr(0, virgulaIndex);
      }
      else { // é # inteiro
        parteInteira = n_str;
      }
      parteInteira = Util.adicionarSeparadorMilharBR(parteInteira);

      // Parte Fracionaria
      let parteFracionaria = '';
      if (virgulaIndex > 0) {
        parteFracionaria = n_str.substr(virgulaIndex + 1);
      }
      else { /* # inteiros não têm casas decimais */ }

      // Montando
      let formatado = parteInteira;
      if (parteFracionaria.length > 0) {
        formatado += ',' + parteFracionaria;
      }

      return formatado;
  }

}




// Funções Auxiliares -------------------------------------------------------------------------------------

let adicionarEventos = () => {

  // Lista de Eventos

  // Atualizar fator de escala
  $('#regra3__p0--1').change(function() {
    regra3.escala = this.value;
  });

  // Fechar janela de erro
  $('#error_output').dblclick(function() {
    $(this).fadeOut(400); //.fadeOut(1000); .slideDown("slow"); hide(300);
   })

  //$(id).outro-evento
};


let existe = (ref) => {
  return typeof ref !== "undefined" && ref !== null;
}


let isNumero = (n) => {
  return typeof n == 'number';

	/**
   *  JS converte null para número 0
   *
   * > isNaN(Number(null)); // false -> é número
   * > Number(null);       // 0
   * > typeof Number(null); // "number"
   * > isNaN(null);    // false -> pq é convertível
   *
   * > typeof null     // object  |=> (o_O)  =>  )^o^(
   *
   * I.e., isNaN não serve para checar se é número. Não quero que null
   * seja considerado número.
   * Já typeof não o reconhece como número (retorna object).
   *
   * Estranhei demais isso.
   */
}


// Exceptions

let informarException = (msg) => {
  $('#error_output').html(msg);
  $('#error_output').css('display','block');
}






