import '../stylesheets/buttons.css';

const ButtonPrimary = ({ text, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={"btnBase btnPrimary"}
        >
            {text}
        </button>
    );
};

export default ButtonPrimary;