var a = new Expression("x").pow(2);
var b = new Expression("x").multiply(new Fraction(5, 4));
var c = new Fraction(-21, 4);

var expr = a.add(b).add(c);

var quad = new Equation(expr, 0);
katex.render(algebra.toTex(quad), myEquation);

var answers = quad.solveFor("x");
katex.render("x = " + algebra.toTex(answers), mySolution);