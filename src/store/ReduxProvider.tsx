'use client';
// Провайдер важный *элемент* который оборачивает приложение и даёт ему доступ к Хранилищу | работать ничего не будет
// Провайдер - это клиентский Компонент (к.к)
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { AppStore, makeStore } from './store';
// Для того что бы вкладывать в К.К серверные компоненты,нужно использовать -children

type ReduxProviderType = {
	children: React.ReactNode;
};

export default function ReduxProvider({ children }: ReduxProviderType) {
	// storeRef- нужен для сохранения переменной между Перерендринга (перерисовок)(что бы наше значение не сбрасывалось)
	const storeRef = useRef<AppStore>();
	if (!storeRef.current) {
		storeRef.current = makeStore();
	}
	// Provider -встроенный компонент(redux.react)в него передаем *Store*-в нём храним (storeRef.current) и children это будет наша страница
	return <Provider store={storeRef.current}>{children}</Provider>;
}
