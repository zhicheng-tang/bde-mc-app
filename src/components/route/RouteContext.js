import React from 'react';
import { Switch, Route, useLocation, matchPath } from 'react-router-dom';

const defaultValues = { config: {} };

export const RouteContext = React.createContext({});

export function useRoute() {}
