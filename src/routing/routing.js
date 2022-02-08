import React from 'react'
import { BrowserRouter, Router, Link, Route, Switch, useHistory, Redirect, HashRouter } from 'react-router-dom'
import AttemptAuth from '../auth/AttemptAuth';
// import _Login from '../auth/_Login';
import _MainLayouts from '../layouts/_MainLayouts';
import ProtectedRoute from '../services/Route/ProtectedRoute'
import { globalText, _Role } from '../services/Text/GlobalText';
 
import Pengaduan from '../pages/Pengaduan/Pengaduan';
import InputPengaduan from '../pages/Pengaduan/InputPengaduan';
import Dashboard from '../pages/Dashboard';

function Routing() {
    const c404 = () => {
        return (
            <Redirect to={{ pathname: '/home' }} />
        )
    }

 
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={AttemptAuth} />
                <ProtectedRoute path="/home"  component={Pengaduan} /> 
                <ProtectedRoute path="/dashboard"  component={Dashboard} /> 
                {/* <Route path="/Topic" component={Topic} /> */}
                {/* <Route path="/InputMatakuliah" component={InputMatakuliah} /> */}
                {/* <Route path="/KabupatenKota" component={KabupatenKota} /> */}
                <ProtectedRoute path="/Pengaduan" component={Pengaduan} />
                <ProtectedRoute path="/InputPengaduan" component={InputPengaduan} />
                {/* <Route path="/Kecamatan" component={Kecamatan} />
                <Route path="/Validasi-BahanPenting" component={ValidasiBahanPenting} />
                <Route path="/Validasi-BahanPokok" component={ValidasiBahanPokok} /> */}
                <Route path="*" exact component={() => c404()} />
            </Switch>
        </BrowserRouter>
    )


}

export default Routing
