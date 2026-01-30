import "../stylesheets/buttons.css";
const ButtonSecondary = ({ text, onClick }) => {
    return (
        <button onClick={onClick} className={"btnBase btnSecondary"}>
            {text}
        </button>
    );
};
export default ButtonSecondary;
