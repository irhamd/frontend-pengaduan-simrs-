import { Image } from 'antd'
import React from 'react'
import _MainLayouts from '../layouts/_MainLayouts'
// import LayoutAnt from './Layout/LayoutAnt'
import bg from "./../assets/img/bg.png"

import logo from "./../assets/img/icons/logo1.png"

function Home() {
    return (
        <div>
            <_MainLayouts>
                <div className="">
                    <div className="">
                        {/* <Image src={logo}  style={{ heigh :"100vh%" }}/> */}

                    </div>
                    {/* <Image src={bg} preview={false} /> */}
                </div>
            </_MainLayouts>
        </div >
    )
}

export default Home
