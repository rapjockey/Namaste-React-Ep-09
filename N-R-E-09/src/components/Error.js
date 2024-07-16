import { useRouteError } from "react-router";
const Error = () => {
    const err = useRouteError();
    console.log(err)
    return (
        <div>
            <h1>Opps!!..</h1>
            <h3>Something wend wrong</h3>
            <p>{err.status} : {err.statusText}</p>
        </div>
    )
}
export default Error;