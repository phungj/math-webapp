import DerivativePractice from "@/components/DerivativePractice";
import {MathJaxContext} from "better-react-mathjax";

export default function App() {
    return (
        <MathJaxContext>
            <DerivativePractice/>
        </MathJaxContext>
    );
}