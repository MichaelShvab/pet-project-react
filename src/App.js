import React, {useEffect} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import { Home, About, SinglePet, Cart, Checkout, Error, Pets, PrivateRoute, AuthWrapper  } from './pages'

function App() {

  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/about'>
            <About />
          </Route>
          <Route exact path='/pets'>
            <Pets />
          </Route>
          <Route exact path='/cart'>
            <Cart />
          </Route>
          <Route exact path='/pets/:id' children={<SinglePet />} />
          <PrivateRoute exact path='/checkout'>
            <Checkout />
          </PrivateRoute>
          <Route path='*'>
            <Error />
          </Route>
        </Switch>
        <Footer />
      </Router> 
    </AuthWrapper>
  )
}

export default App
