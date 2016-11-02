import React from 'react'
import {Scene, Actions, ActionConst} from 'react-native-router-flux'

import { General } from '../styles'
import { BuildDetails, BuildsByPartId, BuildsBySpecId, BuildsByTag, BuildsByUserId } from '../build'
import { Parts, PartDetails, PartFilter, PartsByManufacturer } from '../part'
import { Makes, Models, Submodels, Specs } from '../picker'
import { Tuning, TuningBySpec, QRScreen } from '../tuning'
import { Comments, Login, Home, MyBuilds, MyPosts, NewPost, Notifications, Posts, PreviewBuild, PreviewPost, Saved, Settings } from '../user'

import { TabIcon } from '../components'
export default scenes = Actions.create (
  <Scene key="root">
    <Scene key="login" component={Login} title="Login" hideNavBar={true} />
    <Scene key="main" tabs={true} hideNavBar tabBarStyle={General.tabBarStyle}>
        <Scene title="Tuning" icon={TabIcon} key="tuning" component={Tuning} hideNavBar/>
        <Scene title="Home" icon={TabIcon} key="home" component={Home} hideNavBar/>
        <Scene title="Messages" icon={TabIcon} key="messages" component={Notifications} hideNavBar/>
    </Scene>
    <Scene key="QRScan" component={QRScreen} hideNavBar/>
    <Scene key="Saved" component={Saved} hideNavBar/>
    <Scene key="BuildDetails" component={BuildDetails} hideNavBar/>
    <Scene key="PartDetails" component={PartDetails} hideNavBar/>
    <Scene key="TuningBySpec" component={TuningBySpec} hideNavBar/>

    <Scene key="PartsByManufacturer" component={PartsByManufacturer} hideNavBar/>
    <Scene key="Makes" component={Makes} title="Makes" hideNavBar/>
    <Scene key="Models" component={Models} title="Models" hideNavBar/>
    <Scene key="Submodels" component={Submodels} title="Trims" hideNavBar/>
    <Scene key="Specs" component={Specs} title="Specs" hideNavBar/>

    <Scene key="NewPost" component={NewPost} hideNavBar/>
    <Scene key="PreviewBuild" component={PreviewBuild} hideNavBar/>
    <Scene key="PreviewPost" component={PreviewPost} hideNavBar/>
    
    <Scene key="BuildsByUserId" component={BuildsByUserId} hideNavBar/>
    <Scene key="BuildsByPartId" component={BuildsByPartId} hideNavBar/>
  </Scene>
)
