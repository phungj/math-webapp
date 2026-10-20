"use client";

import { useEffect, useState } from "react";
import { MathJax } from "better-react-mathjax";

import {
    generatePolynomial,
    type PolynomialProblem,
} from "@/src/polynomial";
import { checkDerivativeAnswer } from "@/src/checkAnswer";

export default function DerivativePractice() {
    const [problem, setProblem] = useState<PolynomialProblem | null>(null);

    useEffect(() => {
        setProblem(generatePolynomial());
    }, []);
    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState("");
    const [showAnswer, setShowAnswer] = useState(false);

    function nextProblem() {
        setProblem(generatePolynomial());
        setAnswer("");
        setFeedback("");
        setShowAnswer(false);
    }

    function submitAnswer(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!problem) {
            return;
        }

        if (!answer.trim()) {
            setFeedback("Please enter an answer first.");
            return;
        }

        const correct = checkDerivativeAnswer(
            problem.expression,
            answer
        );

        setFeedback(
            correct
                ? "Correct! Well done."
                : "Not quite. Check your work and try again."
        );
    }

    if (!problem) {
        return (
            <main className="mx-auto max-w-2xl p-6">
                <h1 className="mb-8 mt-5 text-center text-4xl font-bold">
                    Derivative Practice
                </h1>
                <p className="text-center">Generating problem...</p>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-2xl p-6">
            <h1 className="mb-8 mt-5 text-center text-4xl font-bold">
                Derivative Practice
            </h1>

            <section className="space-y-6">
                <div className="text-center">
                    <p className="mb-4 text-lg">
                        Find the derivative with respect to x:
                    </p>

                    <div className="text-3xl">
                        <MathJax inline dynamic>
                            {`\\(${problem.expression}\\)`}
                        </MathJax>
                    </div>
                </div>

                <form onSubmit={submitAnswer} className="space-y-3">
                    <label htmlFor="answer" className="block font-medium">
                        Your answer
                    </label>

                    <input
                        id="answer"
                        type="text"
                        value={answer}
                        onChange={(event) => {
                            setAnswer(event.target.value);
                            setFeedback("");
                        }}
                        placeholder="e.g. 6*x^2 + 4"
                        className="input input-bordered w-full"
                        autoComplete="off"
                    />

                    <button type="submit" className="btn btn-primary w-full">
                        Check Answer
                    </button>
                </form>

                {feedback && (
                    <p role="status" className="text-center font-medium">
                        {feedback}
                    </p>
                )}

                <div className="flex flex-wrap justify-center gap-3">
                    <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => setShowAnswer((shown) => !shown)}
                    >
                        {showAnswer ? "Hide Answer" : "Show Answer"}
                    </button>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={nextProblem}
                    >
                        Next Problem
                    </button>
                </div>

                {showAnswer && (
                    <div className="rounded-box bg-base-200 p-4 text-center">
                        <p className="mb-2 font-medium">Derivative</p>
                        <div className="text-xl">
                            <MathJax inline dynamic>
                                {`\\(${problem.answerTex}\\)`}
                            </MathJax>
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}