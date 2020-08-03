import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import {Route, Link, Switch} from 'react-router-dom'

import Main from './Main'

class IndexPage extends Component{

    mainPage = () => {
        return(
            <div>
                <h1>
                    Easy Visualify
                </h1>
                <Link to='/main'> 
                    <Button> Click to Enter </Button>
                </Link>
            </div>
        )    
    }
    

    render(){
        return(
            <Route>
                <div>
                    <Switch>
                        <Route exact path='/' component={this.mainPage} />
                        <Route path='/main' component={Main} />
                    </Switch>
                </div>
            </Route>
        )

    }


}


export default IndexPage 