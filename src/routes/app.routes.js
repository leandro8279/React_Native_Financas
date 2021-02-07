import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../pages/Home";
import Perfil from "../pages/Perfil";
import New from "../pages/New";
import CustomDrawer from '../components/CustomDrawer';
const AppDrawer = createDrawerNavigator();
function AppRoutes() {
    return (
        <AppDrawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            drawerStyle={{
                backgroundColor: '#171717'
            }}
            drawerContentOptions={{
                labelStyle: {
                    fontWeight: 'bold'
                },
                activeTintColor: '#FFF',
                activeTintColor: '#00b94a',
                inactiveBackgroundColor: '#000',
                inactiveTintColor: "#DDD",
                itemStyle: {
                    marginVertical: 5,
                }
            }}>
            <AppDrawer.Screen
                name='Home'
                component={Home} />
            <AppDrawer.Screen
                name='New'
                component={New} />
            <AppDrawer.Screen
                name='Perfil'
                component={Perfil} />
        </AppDrawer.Navigator>
    );
}
export default AppRoutes;