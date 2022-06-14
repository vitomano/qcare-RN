import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StackNav } from './src/navigation/StackNav';
import { AuthProvider } from './src/context/AuthContext';
import { ReportProvider } from './src/context/ReportContext';

export default function App() {
  return (
    <NavigationContainer>
      <AppState>
        <StackNav />
      </AppState>
    </NavigationContainer>
  );
}

const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      <ReportProvider>
        {children}
      </ReportProvider>
    </AuthProvider>
  );
}