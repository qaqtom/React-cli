import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";


// 使用lazy函数实现路由组件的懒加载[按需加载]
const comp1 = lazy(() => import("pages/comp1"));
const comp2 = lazy(() => import("pages/comp2"));

// 封装一个Suspense加载组件的函数
function load(Com) {
    return (
        <Suspense fallback={<div>组件正在加载中....</div>}>
            <Com />
        </Suspense>
    )
}
const routes = [
    {
        path: '/comp1',
        element: load(comp1),
    },
    {
        path: '/comp2',
        element: load(comp2)
    },
    {
        path: '/',
        element: <Navigate to='/comp1' />
    }
]

export default routes;