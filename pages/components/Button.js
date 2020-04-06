export default function Button() {
    return (
        <div>
        <button type="button" className="button">Select</button>
        <style jsx>{`
        .button {
            color: white;
            background-color:#6880dd;
            width: 80%;
            display: block;
            margin: 0 auto;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
        }
          `}
        </style>

        </div>
    )
}