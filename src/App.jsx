import { useState, useCallback, useEffect } from "react";
import "./App.css";
import "./lines.css";

const operands = {
    "-": "-",
    "+": "+",
    "÷": "/",
    "×": "*",
};

function App() {
    const [operation, setOperation] = useState("");
    const [operand, setOperand] = useState("");

    const blink = useCallback(() => {
        const className = document.querySelector(".light");
        const blink = setInterval(() => className.classList.toggle("dim"), 200);
        setTimeout(() => {
            clearInterval(blink);
            className.classList.add("dim");
        }, 2000);
    }, []);
    useEffect(() => blink, [blink]);

    let calc = useCallback(() => {
        blink();
        if (!operand) return;
        let b1 = operation.split(operand)[0].split("").reverse(),
            b2 = operation.split(operand)[1].split("").reverse(),
            bf = "";
        b1.length == b2.length && b1.push("0");

        let d1 = 0,
            d2 = 0,
            size =
                b1.length * (b1.length > b2.length) +
                b2.length * (b2.length > b1.length);

        for (let i = 0; i < size; i++) {
            let truth = 2 ** i;
            d1 += (b1[i] | 0) * truth;
            d2 += (b2[i] | 0) * truth;
        }
        const df = eval(`${d1} ${operands[operand]} ${d2}`);

        const bin = (x) =>
            x <= 1 ? `${x}` : `${x % 2}${bin(Math.floor(x / 2))}`;
        bf = df >= 0 ? bin(df).split("").reverse().join("") : "error";

        setOperation(bf);
        setOperand("");
    }, [operand, operation, blink]);

    const clear = useCallback(
        () => setOperation("") && setOperand(""),
        [setOperation]
    );

    const change = useCallback(
        (e) => setOperation((x) => `${x}${e.target.value}`),
        [setOperation]
    );

    const change_ = useCallback(
        (e) => setOperand(`${e.target.value}`),
        [setOperand]
    );

    useEffect(() => {
        if (operation.match(/(\+|×|÷|-)/g)) {
            setOperation((x) => x.replace(/(\+|×|÷|-)/, operand));
        } else {
            setOperation((x) => `${x}${operand}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [operand]);

    return (
        <>
            <div className="lines">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
            <div className="calculator">
                <div className="light" />
                <div className="display">{operation}</div>
                <div className="btns">
                    <div className="row">
                        <button
                            value="0"
                            onClick={change}>
                            0
                        </button>
                        <button
                            value="1"
                            onClick={change}>
                            1
                        </button>
                        <button
                            onClick={clear}
                            className="special">
                            C
                        </button>
                        <button
                            className="special"
                            onClick={calc}>
                            &#61;
                        </button>
                    </div>
                    <div className="row">
                        <button
                            value="+"
                            onClick={change_}>
                            &#43;
                        </button>
                        <button
                            value="-"
                            onClick={change_}>
                            &#8722;
                        </button>
                        <button
                            value="×"
                            onClick={change_}>
                            &#215;
                        </button>
                        <button
                            value="÷"
                            onClick={change_}>
                            &#247;
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
