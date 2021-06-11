import React from "react"; // ES6 module exports
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import RestaurantDetailsPage from "./routes/RestaurantDetailsPage";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";

const App = () => {
    return (
        <RestaurantsContextProvider>
            <div className="container">
                <Router>
                    {/* What it does is, if we match a route tell react to stop looking down the list*/}
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/restaurants/:id/update" component={UpdatePage}/>
                        <Route exact path="/restaurants/:id" component={RestaurantDetailsPage}/>
                    </Switch>
                </Router>
            </div>
        </RestaurantsContextProvider>
    );
};

export default App;
