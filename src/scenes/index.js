import React from 'react'
import {Scene, Actions, ActionConst} from 'react-native-router-flux'

import { General } from '../styles'
import { BuildDetails, BuildsListByPartId, BuildsListBySpecId, BuildsListByUserId, BuildsListByManufacturerId} from '../build'
import { Parts, PartDetails, PartsByBuild, PartFilter, PartsByManufacturer, PartsByTag} from '../part'
import { 
    PostsByBuildId, 
    PostsByUserId,
    NewBuild,
    NewListing,
    NewPart, 
    NewPost,
    PreviewBuild, 
    PreviewPost, 
    VRPost,
} from '../post' 
import { Makes, Models, Submodels, Specs, Manufacturers, PartSelector } from '../picker'
import { Tuning, TuningBySpec, QRScreen, Manufacturer } from '../tuning'
import { 
    UserPage, 
    Comments, 
    Login, 
    Home, 
    MyBuilds, 
    Posts, 
    Saved, 
    Settings 
} from '../user'
import { TabIcon, EditSpecs, PhotoSwiper, SpecsByManufacturer} from '../components'
export default scenes = Actions.create (
  <Scene key="root">
    <Scene key="main" hideNavBar component={Tuning}/>
    <Scene key="Home" hideNavBar component={Home}/>
    <Scene key="QRScan" component={QRScreen} hideNavBar/>
    <Scene key="Saved" component={Saved} hideNavBar/>
    <Scene key="BuildDetails" component={BuildDetails} hideNavBar/>
    <Scene key="TuningBySpec" component={TuningBySpec} hideNavBar/>

    <Scene key="Parts" component={Parts} hideNavBar/>
    <Scene key="PartDetails" component={PartDetails} hideNavBar/>
    <Scene key="PartFilter" component={PartFilter} hideNavBar/>
    <Scene key="PartsByManufacturer" component={PartsByManufacturer} hideNavBar/>
    <Scene key="PartsByBuild" component={PartsByBuild} hideNavBar/>
    <Scene key="PartsByTag" component={PartsByTag} hideNavBar/>
    <Scene key="Makes" component={Makes} title="Makes" hideNavBar/>
    <Scene key="Models" component={Models} title="Models" hideNavBar/>
    <Scene key="Submodels" component={Submodels} title="Trims" hideNavBar/>
    <Scene key="Specs" type={ActionConst.REPLACE} component={Specs} title="Specs" hideNavBar/>


    <Scene key="BuildsByUserId" component={BuildsListByUserId} hideNavBar/>
    <Scene key="BuildsByManufacturerId" component={BuildsListByManufacturerId} hideNavBar/>
    <Scene key="BuildsByPartId" component={BuildsListByPartId} hideNavBar/>
    <Scene key="BuildsBySpecId" component={BuildsListBySpecId} hideNavBar/>

    <Scene key="PostsByBuildId" component={PostsByBuildId} hideNavBar/>
    <Scene key="PostsByUserId" component={PostsByUserId} hideNavBar/>

    <Scene key="UserPage" component={UserPage} hideNavBar/>
    <Scene key="Manufacturer"  component={Manufacturer} hideNavBar/>
    <Scene key="PhotoSwiper" component={PhotoSwiper} hideNavBar/>

    <Scene key="SpecsByManufacturer" component={SpecsByManufacturer} hideNavBar/>
    <Scene key="PartSelector" type={ActionConst.REPLACE} component={PartSelector} hideNavBar/>

    <Scene key="NewBuild" component={NewBuild} hideNavBar/>
    <Scene key="NewListing" component={NewListing} hideNavBar/>
    <Scene key="NewPart" component={NewPart} hideNavBar/>
    <Scene key="NewPost" component={NewPost} hideNavBar/>

    <Scene key="EditSpecs" component={EditSpecs} hideNavBar/>
    <Scene key="PreviewBuild" component={PreviewBuild} hideNavBar/>
    <Scene key="PreviewPost" component={PreviewPost} hideNavBar/>

    <Scene key="Manufacturers" component={Manufacturers} hideNavBar/>
  </Scene>
)


