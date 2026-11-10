import { createContext, useContext } from 'react';
export const RouteActivity = createContext(true);
export const useRouteActive = () => useContext(RouteActivity);
