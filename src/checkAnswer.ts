import { derivative, parse, simplify } from "mathjs";

export function checkDerivativeAnswer(
    expression: string,
    submittedAnswer: string
): boolean {
    if (!submittedAnswer.trim()) {
        return false;
    }

    try {
        const expected = derivative(expression, "x");
        const submitted = parse(submittedAnswer);

        const difference = simplify(
            `(${submitted.toString()}) - (${expected.toString()})`
        );

        return difference.toString() === "0";
    } catch {
        return false;
    }
}