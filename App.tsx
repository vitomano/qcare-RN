import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StackNav } from './src/navigation/StackNav';
import { AuthProvider } from './src/context/AuthContext';
import { ReportProvider } from './src/context/ReportContext';
import { IntakeProvider } from './src/context/IntakeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MenuProvider } from 'react-native-popup-menu';

import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { check, text } from './src/theme/variables';
import { FilterProvider } from './src/context/FilterContext';
import { CreateProvider } from './src/context/CreateContext';


export default function App() {

  const queryClient = new QueryClient()

  const toastConfig = {

    success: (props: any) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: check }}
        text1Style={{ fontSize: 17, fontWeight: 'bold' }}
        text2Style={{ fontSize: 15, color: text }}
      />
    ),

    error: (props: any) => (
      <ErrorToast
        {...props}
        text1Style={{ fontSize: 17 }}
        text2Style={{ fontSize: 15, color: text }}
      />
    ),

  };

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>

        <MenuProvider>
          <AppState>
            <StackNav />
            <Toast config={toastConfig} />
          </AppState>
        </MenuProvider>

      </NavigationContainer>
    </QueryClientProvider>
  );
}

const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      <ReportProvider>
        <IntakeProvider>
          <FilterProvider>
          <CreateProvider>
            {children}
          </CreateProvider>
          </FilterProvider>
        </IntakeProvider>
      </ReportProvider>
    </AuthProvider>
  );
}