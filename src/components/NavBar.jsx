import { FaSearch } from "react-icons/fa"

export default function NavBar() {
    return (
        <div className="navbar-container">
            <div className="title">
                <h3>Welcome</h3>
                <span><h4>Smart Living</h4></span>
            </div>
            <div className="search">
                <form action="">
                    <input type="text" placeholder="Type here to serach" />
                    <FaSearch />
                </form>
            </div>
        </div>
    )
}