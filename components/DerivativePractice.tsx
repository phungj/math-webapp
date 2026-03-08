import {parse} from "mathjs";
import {MathJax} from "better-react-mathjax";

// TODO: Get daisy going
// TODO: Create an input and submission button for input
// TODO: Write a handler that gets the input and uses mathjs to parse it and determine if it's equivalent to mathjs' differentiation
// TODO: Update readme
// TODO: Delete extraneous files
export default function DerivativePractice() {
    return (
        <div>
            <h1 className="font-title text-heading text-5xl font-bold text-center mt-5 mb-5">Derivative Practice</h1>
            <h2 className="text-center text-4xl">What is the derivative of <MathJax inline={true}>{`\\(${generateRandomProblem()}\\)`}</MathJax>?</h2>
        </div>
    );

    // TODO: Generate more complex polynomials (coefficients, square roots, non-integer powers, factored or not, quotient rules)
    // TODO: Generate trig and exp/log problems
    function generateRandomProblem() {
        console.log(parse("3x^2 + 4x + 2").toTex({parentheses: "auto", implicit: "hide"}));

        return parse("3x^2 + 4x + 2").toTex().replaceAll(/~ ?/g, "");
        // TODO: Randomly pick a number between 1 and 5 coefficients
        // TODO: Generate random integers between -10 and 10 for these
    }
}