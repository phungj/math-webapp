import { derivative, parse } from "mathjs";

export type PolynomialProblem = {
    expression: string;
    answer: string;
    expressionTex: string;
    answerTex: string;
};

type Term = {
    coefficient: number;
    power: number;
};

const MIN_COEFFICIENT = -9;
const MAX_COEFFICIENT = 9;
const MAX_DEGREE = 5;

function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateCoefficient(): number {
    let coefficient = 0;

    while (coefficient === 0) {
        coefficient = randomInt(
            MIN_COEFFICIENT,
            MAX_COEFFICIENT
        );
    }

    return coefficient;
}

function generateTerms(): Term[] {
    const degree = randomInt(0, MAX_DEGREE);
    const terms: Term[] = [];

    for (let power = degree; power >= 0; power--) {
        const isLeadingTerm = power === degree;

        // Occasionally omit terms, but always include the leading term.
        if (!isLeadingTerm && Math.random() < 0.3) {
            continue;
        }

        terms.push({
            coefficient: generateCoefficient(),
            power,
        });
    }

    return terms;
}

// Creates conventional algebraic notation for display.
function formatPolynomial(terms: Term[]): string {
    const sortedTerms = [...terms].sort(
        (a, b) => b.power - a.power
    );

    if (sortedTerms.length === 0) {
        return "0";
    }

    return sortedTerms
        .map(({ coefficient, power }, index) => {
            const magnitude = Math.abs(coefficient);

            const variable =
                power === 0
                    ? ""
                    : power === 1
                        ? "x"
                        : `x^{${power}}`;

            const coefficientText =
                power > 0 && magnitude === 1
                    ? ""
                    : String(magnitude);

            const term = `${coefficientText}${variable}`;

            if (index === 0) {
                return coefficient < 0 ? `-${term}` : term;
            }

            return coefficient < 0
                ? ` - ${term}`
                : ` + ${term}`;
        })
        .join("");
}

// Creates an expression for Math.js to evaluate.
function termsToExpression(terms: Term[]): string {
    return terms
        .map(({ coefficient, power }) => {
            const variable =
                power === 0
                    ? ""
                    : power === 1
                        ? "x"
                        : `x^${power}`;

            const magnitude = Math.abs(coefficient);
            const coefficientText =
                power > 0 && magnitude === 1
                    ? ""
                    : String(magnitude);

            const term = `${coefficientText}${variable}`;

            return coefficient < 0 ? `-${term}` : `+${term}`;
        })
        .join("")
        .replace(/^\+/, "");
}

function differentiateTerms(terms: Term[]): Term[] {
    return terms
        .filter(({ power }) => power > 0)
        .map(({ coefficient, power }) => ({
            coefficient: coefficient * power,
            power: power - 1,
        }));
}

export function generatePolynomial(): PolynomialProblem {
    const terms = generateTerms();

    const expression = termsToExpression(terms);
    const answer = derivative(parse(expression), "x").toString();

    const expressionTex = formatPolynomial(terms);
    const answerTex = formatPolynomial(differentiateTerms(terms));

    return {
        expression,
        answer,
        expressionTex,
        answerTex,
    };
}