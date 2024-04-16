import { Link } from "react-router-dom";


export default function NotFound() {

    return <div className="flex flex-col gap-2">
        <span>
            Page not found 404
        </span>
        <Link className="text-blue-500" to="/">Back to Home</Link>
    </div>
}