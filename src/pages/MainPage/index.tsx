import React from 'react';
const Title = React.lazy(() => import(/* webpackChunkName: 'Title' */'components/Title').then(module => ({ default: module.default })));

export default function MainPage() {
    return (
        <div>
            <h1>Main page</h1>
            <React.Suspense fallback={<div>Загрузка...</div>}>
                <Title/>
            </React.Suspense>
        </div>
    )
}