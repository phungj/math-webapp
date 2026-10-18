import { generatePolynomial } from "@/src/polynomial";

for (let i = 0; i < 10; i++) {
    const problem = generatePolynomial();

    console.log("Function:", problem.expression);
    console.log("Derivative:", problem.answer);
    console.log();
}